"use client";

import { useCartStore } from "@/store/cart-store";

export function CartCounter() {
  const count = useCartStore((state) => state.count);
  const increment = useCartStore((state) => state.increment);
  const reset = useCartStore((state) => state.reset);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={increment}
        className="rounded-md bg-zinc-900 px-3 py-1 text-sm text-white"
      >
        Add to cart
      </button>
      <button
        type="button"
        onClick={reset}
        className="rounded-md border border-zinc-300 px-3 py-1 text-sm"
      >
        Reset
      </button>
      <span className="text-sm text-zinc-600">Cart items: {count}</span>
    </div>
  );
}
