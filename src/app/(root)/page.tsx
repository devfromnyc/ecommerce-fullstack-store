import React from "react";
import { Card } from "@/components";
import { getAllProducts } from "@/lib/actions/product";
import { parseFilterParams } from "@/lib/utils/query";

const fallbackProducts = [
  {
    id: "fallback-1",
    title: "Air Max Pulse",
    subtitle: "Men's Shoes",
    meta: "6 Colour",
    price: 149.99,
    imageSrc: "/shoes/shoe-1.jpg",
    badge: { label: "New", tone: "orange" as const },
  },
  {
    id: "fallback-2",
    title: "Air Zoom Pegasus",
    subtitle: "Men's Shoes",
    meta: "4 Colour",
    price: 129.99,
    imageSrc: "/shoes/shoe-2.webp",
    badge: { label: "Hot", tone: "red" as const },
  },
  {
    id: "fallback-3",
    title: "InfinityRN 4",
    subtitle: "Men's Shoes",
    meta: "6 Colour",
    price: 159.99,
    imageSrc: "/shoes/shoe-3.webp",
    badge: { label: "Trending", tone: "green" as const },
  },
  {
    id: "fallback-4",
    title: "Metcon 9",
    subtitle: "Men's Shoes",
    meta: "3 Colour",
    price: 139.99,
    imageSrc: "/shoes/shoe-4.webp",
  },
];

const Home = async () => {
  const filters = parseFilterParams({ limit: "4", page: "1", sort: "newest" });
  const { products } = await getAllProducts(filters);
  const latestProducts = products.slice(0, 4).map((p) => {
    const displayPrice =
      p.minPrice !== null && p.maxPrice !== null && p.minPrice !== p.maxPrice
        ? `$${p.minPrice.toFixed(2)} - $${p.maxPrice.toFixed(2)}`
        : p.minPrice !== null
        ? p.minPrice
        : undefined;

    return {
      id: p.id,
      title: p.name,
      subtitle: p.subtitle ?? "Nike Shoes",
      meta: undefined as string | undefined,
      price: displayPrice,
      imageSrc: p.imageUrl ?? "/shoes/shoe-1.jpg",
      href: `/products/${p.id}`,
    };
  });
  const cards = latestProducts.length > 0 ? latestProducts : fallbackProducts;

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <section aria-labelledby="latest" className="pb-12">
        <h2 id="latest" className="mb-6 text-heading-3 text-dark-900">
          Latest shoes
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((p) => (
            <Card
              key={p.id}
              title={p.title}
              subtitle={p.subtitle}
              meta={p.meta}
              imageSrc={p.imageSrc}
              price={p.price}
              badge={"badge" in p ? p.badge : undefined}
              href={"href" in p ? p.href : "/products"}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
