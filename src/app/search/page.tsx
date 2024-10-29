import { db } from "@/db";
import { Product, productsTable } from "@/db/schema";
import { vectorize } from "@/lib/vectorize";
import { Index } from "@upstash/vector";
import { sql } from "drizzle-orm";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export type CoreProduct = Omit<Product, 'createdAt' | 'updatedAt'>;

const index = new Index<CoreProduct>();

const Page = async ({ searchParams }: PageProps) => {
  const query = await searchParams.query;

  if (Array.isArray(query) || !query) {
    return redirect(`/`);
  }

  // full text search
  let products: CoreProduct[] = await db
    .select()
    .from(productsTable)
    .where(
      sql`to_tsvector('simple', lower(${productsTable.title} || ' ' || ${
        productsTable.description
      })) @@ to_tsquery('simple', lower(${query
        .trim()
        .split(" ")
        .join(" & ")}))`
    ).limit(3)

  if(products.length < 3) {
    // Search for products that contain the query in the title or description
    const vector = await vectorize(query)

    const response = await index.query({
      topK: 5,
      vector,
      includeMetadata: true,
    })

    const vectorProducts = response.filter((existingProduct) => {
      if(products.some((product) => product.id === existingProduct.id) || existingProduct.score < 0.9) {
        return false;
      }else{
        return true;
      }
    }).map(({metadata}) => metadata!)
    
    products.push(...vectorProducts)
  }

  return (
    <pre>
      {JSON.stringify(products)}
    </pre>
  );
};

export default Page;
