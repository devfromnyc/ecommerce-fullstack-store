import Link from "next/link";
import Image from "next/image";

type CollectionTile = {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
};

const COLLECTION_TILES: CollectionTile[] = [
  {
    title: "Men",
    description: "Performance and lifestyle picks for training and everyday wear.",
    href: "/products?gender=men",
    imageSrc: "/shoes/shoe-1.jpg",
  },
  {
    title: "Women",
    description: "Built for comfort, movement, and all-day confidence.",
    href: "/products?gender=women",
    imageSrc: "/shoes/shoe-2.webp",
  },
  {
    title: "Kids",
    description: "Durable styles for school, sport, and play.",
    href: "/products?gender=unisex",
    imageSrc: "/shoes/shoe-3.webp",
  },
  {
    title: "Running",
    description: "Responsive cushioning and lightweight support for every run.",
    href: "/products?category=running-shoes",
    imageSrc: "/shoes/shoe-4.webp",
  },
  {
    title: "Lifestyle",
    description: "Street-ready silhouettes with premium comfort details.",
    href: "/products?category=lifestyle",
    imageSrc: "/shoes/shoe-5.avif",
  },
  {
    title: "New Arrivals",
    description: "Fresh drops and newly released fan favorites.",
    href: "/products?sort=newest",
    imageSrc: "/shoes/shoe-6.avif",
  },
];

export default function CollectionsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="text-caption uppercase tracking-wide text-dark-700">Shop By Collection</p>
        <h1 className="mt-2 text-heading-2 text-dark-900">Explore Nike Collections</h1>
        <p className="mt-3 max-w-2xl text-body text-dark-700">
          Browse curated collections built around how you move, train, and live.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTION_TILES.map((tile) => (
          <Link
            key={tile.title}
            href={tile.href}
            className="group overflow-hidden rounded-xl border border-light-300 bg-light-100 transition hover:border-dark-500"
          >
            <div className="relative aspect-16/10 w-full bg-light-200">
              <Image
                src={tile.imageSrc}
                alt={tile.title}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h2 className="text-heading-3 text-dark-900">{tile.title}</h2>
              <p className="mt-2 text-body text-dark-700">{tile.description}</p>
              <span className="mt-4 inline-block text-body-medium text-dark-900 underline underline-offset-4">
                Shop {tile.title}
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
