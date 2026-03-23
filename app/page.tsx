"use client";

import { useCartStore } from "@/store/cart";
import { useAuthStore } from "@/store/auth";

export default function Home() {
  const { items, total, getItemCount } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">E-Commerce App</h1>
          <p className="mb-8 text-lg text-gray-600">
            Built with Next.js, TypeScript, TailwindCSS, Better Auth, Neon PostgreSQL, Drizzle ORM, and Zustand
          </p>

          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-blue-50 p-4">
              <h2 className="mb-2 text-xl font-semibold text-blue-900">Setup Status</h2>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>✅ Next.js with TypeScript — Ready</li>
                <li>✅ TailwindCSS — Ready</li>
                <li>✅ ESLint — Ready</li>
                <li>✅ Zustand State Management — Ready</li>
                <li>⚠️ Better Auth — Needs .env setup</li>
                <li>⚠️ Neon PostgreSQL + Drizzle — Needs database setup</li>
              </ul>
            </div>

            <div className="rounded-lg bg-emerald-50 p-4">
              <h2 className="mb-2 text-xl font-semibold text-emerald-900">Store Preview</h2>
              <p className="text-sm text-emerald-800">Items in cart: {getItemCount()}</p>
              <p className="text-sm text-emerald-800">Cart total: ${total.toFixed(2)}</p>
              <p className="text-sm text-emerald-800">Auth state: {isAuthenticated ? "Logged in" : "Logged out"}</p>
              <p className="text-sm text-emerald-800">Current user: {user?.email || "None"}</p>
              <p className="text-sm text-emerald-800">Tracked products in store: {items.length}</p>
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 p-4">
            <h3 className="mb-2 text-lg font-semibold text-amber-900">Next Steps</h3>
            <ol className="list-inside list-decimal space-y-1 text-sm text-amber-800">
              <li>Set up your Neon PostgreSQL database</li>
              <li>Copy .env.example to .env and fill in your credentials</li>
              <li>Run npm run db:push to create tables</li>
              <li>Start building your e-commerce features</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
