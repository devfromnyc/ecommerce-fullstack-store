"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCartStore } from "@/store/cart";

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function CartDrawer() {
  const open = useCartStore((s) => s.isCartOpen);
  const openCart = useCartStore((s) => s.openCart);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const itemCount = useCartStore((s) => s.getItemCount());

  const empty = items.length === 0;
  const summary = useMemo(() => formatPrice(total), [total]);

  return (
    <>
      <button
        type="button"
        onClick={openCart}
        className="inline-flex items-center gap-2 text-body font-medium text-dark-900 transition-colors hover:text-dark-700"
        aria-label={`Open cart with ${itemCount} item${itemCount === 1 ? "" : "s"}`}
      >
        <ShoppingBag className="h-5 w-5" />
        <span>My Cart ({itemCount})</span>
      </button>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-200 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/40"
          onClick={closeCart}
          aria-label="Close cart overlay"
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-light-100 shadow-xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-light-300 px-5 py-4">
            <h2 className="text-heading-3 text-dark-900">Your Bag ({itemCount})</h2>
            <button
              type="button"
              className="rounded-md p-1 text-dark-700 hover:bg-light-200"
              onClick={closeCart}
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {empty ? (
              <div className="rounded-lg border border-light-300 bg-light-200 p-6 text-center">
                <p className="text-body text-dark-700">Your cart is empty.</p>
                <p className="mt-1 text-caption text-dark-700">
                  Add a product to get started.
                </p>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="rounded-lg border border-light-300 p-3">
                    <div className="flex gap-3">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-light-200">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : null}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-body-medium text-dark-900">{item.name}</p>
                        {item.subtitle ? (
                          <p className="mt-0.5 text-caption text-dark-700">{item.subtitle}</p>
                        ) : null}
                        <p className="mt-1 text-body text-dark-900">
                          {formatPrice(item.price)}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-md border border-light-300">
                            <button
                              type="button"
                              className="p-1.5 text-dark-900 hover:bg-light-200"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-8 text-center text-caption text-dark-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="p-1.5 text-dark-900 hover:bg-light-200"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            type="button"
                            className="inline-flex items-center gap-1 text-caption text-dark-700 hover:text-dark-900"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-light-300 px-5 py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-body text-dark-700">Subtotal</span>
              <span className="text-body-medium text-dark-900">{summary}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className={`block w-full rounded-full px-6 py-3 text-center text-body-medium ${
                empty
                  ? "pointer-events-none bg-light-300 text-dark-700"
                  : "bg-dark-900 text-light-100 hover:bg-dark-700"
              }`}
            >
              Checkout
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
