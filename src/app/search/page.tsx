import { db } from "@/db";
import { Product, productsTable } from "@/db/schema";
import { vectorize } from "@/lib/vectorize";
import { Index } from "@upstash/vector";
import { sql } from "drizzle-orm";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export type CoreProduct = Omit<Product, "createdAt" | "updatedAt">;

const index = new Index<CoreProduct>();

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const query = params.query;

  if (Array.isArray(query) || !query) {
    return redirect(`/`);
  }

  // full text search

  let products: CoreProduct[] = [];

  try {
    // full text search
    products = await db
      .select()
      .from(productsTable)
      .where(
        sql`to_tsvector('simple', lower(${productsTable.title} || ' ' || ${productsTable.description})) @@ to_tsquery('simple', lower(${query.trim().split(" ").join(" & ")}))`
      )
      .limit(3);
  } catch (error) {
    console.error("Error connecting to database:", error);
    return (
      <div className='text-center py-4 bg-white shadow-md rounded-b-md'>
        <X className='mx-auto h-8 w-8 text-gray-400' />
        <h3 className='mt-2 text-sm font-semibold text-gray-900'>Database Error</h3>
        <p className='mt-1 text-sm mx-auto max-w-prose text-gray-500'>
          Sorry, we unable to connect to the database. Please try again later.
        </p>
      </div>
    );
  }

  if (products.length < 3) {
    // Search for products that contain the query in the title or description
    const vector = await vectorize(query);

    const response = await index.query({
      topK: 5,
      vector,
      includeMetadata: true,
    });

    const vectorProducts = response
      .filter((existingProduct) => {
        if (
          products.some((product) => product.id === existingProduct.id) ||
          existingProduct.score < 0.9
        ) {
          return false;
        } else {
          return true;
        }
      })
      .map(({ metadata }) => metadata!);

    products.push(...vectorProducts);
  }

  if (products.length === 0) {
    return (
      <div className='text-center py-4 bg-white shadow-md rounded-b-md'>
        <X className='mx-auto h-8 w-8 text-gray-400' />
        <h3 className='mt-2 text-sm font-semibold text-gray-900'>No results</h3>
        <p className='mt-1 text-sm mx-auto max-w-prose text-gray-500'>
          Sorry, we could not find any matches for your:
          <span className='text-green-600 font-medium'>{query}</span>.
        </p>
      </div>
    )
  }

  return (
    <ul className="py-4 divide-y divide-zinc-100 bg-white shadow-md rounded-b-md">
      {products.slice(0, 3).map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <li className="mx-auto py-4 px-8 flex space-x-4">
            <div className="relative flex items-center bg-zinc-100 rounded-lg h-40 w-40">
              <Image
                loading="eager"
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                alt="product-image"
                src={`/${product.imageId}`}
              />
            </div>

            <div className="w-full flex-1 space-y-2 py-1">
              <h1 className="text-lg font-medium text-gray-900">
                {product.title}
              </h1>

              <p className="prose prose-sm text-gray-500 line-clamp-3">
                {product.description}
              </p>

              <p className="text-base font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Page;
