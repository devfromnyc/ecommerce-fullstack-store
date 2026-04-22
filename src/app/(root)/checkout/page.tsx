"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-heading-2 text-dark-900">Checkout</h1>
      <p className="mt-2 text-body text-dark-700">
        This is a local cart preview while payment integration is in progress.
      </p>

      {items.length === 0 ? (
        <div className="mt-6 rounded-xl border border-light-300 bg-light-100 p-6">
          <p className="text-body text-dark-700">Your cart is empty.</p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-full bg-dark-900 px-5 py-2 text-body-medium text-light-100"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-light-300 bg-light-100 p-6">
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between text-body">
                <span className="text-dark-900">
                  {item.name} x {item.quantity}
                </span>
                <span className="text-dark-900">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-light-300 pt-4">
            <div className="flex items-center justify-between text-body-medium text-dark-900">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
