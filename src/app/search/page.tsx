import { db } from "@/db";
import { productsTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const Page = async ({ searchParams }: PageProps) => {
  const query = await searchParams.query;

  if (Array.isArray(query) || !query) {
    return redirect(`/`);
  }

  // full text search
  let products = await db
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

  console.log("Getting all users from the database: ", products);

  return (
    <pre>
      {JSON.stringify(products)}
    </pre>
  );
};

export default Page;
