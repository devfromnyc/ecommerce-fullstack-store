import { asc } from "drizzle-orm";
import { CartCounter } from "@/components/cart-counter";
import { db } from "@/db";
import { products } from "@/db/schema";

async function getProducts() {
  if (!process.env.DATABASE_URL) return [];

  try {
    return await db.select().from(products).orderBy(asc(products.name));
  } catch {
    return [];
  }
}

export default async function Home() {
  const items = await getProducts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nike Products</h1>
          <p className="text-sm text-zinc-600">
            Rendered from Neon Postgres with Drizzle ORM
          </p>
        </div>
        <CartCounter />
      </header>

      {items.length === 0 ? (
        <p className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-700">
          No products found. Run <code>npm run db:seed</code> after setting{" "}
          <code>DATABASE_URL</code>.
        </p>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image || "https://placehold.co/800x600?text=Nike"}
                alt={item.name}
                className="h-48 w-full object-cover"
              />
              <div className="space-y-2 p-4">
                <p className="text-xs font-medium uppercase text-zinc-500">
                  Nike • {item.category || "General"}
                </p>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-zinc-600">{item.description}</p>
                <p className="text-base font-bold">
                  ${Number(item.price).toFixed(2)}
                </p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
