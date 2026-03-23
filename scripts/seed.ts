import "dotenv/config";
import { sql } from "drizzle-orm";
import { db } from "../db";
import { products } from "../db/schema";

const nikeProducts = [
  {
    name: "Nike Air Force 1 '07",
    description: "Classic everyday sneaker with clean leather finish.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    category: "Sneakers",
    stock: 100,
    isActive: true,
    price: "120.00",
  },
  {
    name: "Nike Air Max 90",
    description: "Iconic cushioning and timeless style for daily wear.",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80",
    category: "Running",
    stock: 80,
    isActive: true,
    price: "140.00",
  },
  {
    name: "Nike Dri-FIT Miler Tee",
    description: "Lightweight performance shirt built for training sessions.",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
    category: "Apparel",
    stock: 120,
    isActive: true,
    price: "35.00",
  },
  {
    name: "Nike Sportswear Club Fleece",
    description: "Soft brushed fleece hoodie for warm daily comfort.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    category: "Hoodies",
    stock: 75,
    isActive: true,
    price: "65.00",
  },
];

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to run seed.");
  }

  await db.execute(sql`
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS products (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name varchar(255) NOT NULL,
      description text,
      image text,
      category text,
      stock integer NOT NULL DEFAULT 0,
      is_active boolean NOT NULL DEFAULT true,
      price numeric(10, 2) NOT NULL,
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NOT NULL DEFAULT now()
    );
  `);

  await db.delete(products);
  await db.insert(products).values(nikeProducts);

  console.log("Seed complete: Nike products inserted.");
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
