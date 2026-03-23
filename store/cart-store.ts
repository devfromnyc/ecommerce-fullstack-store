"use client";

import { create } from "zustand";

type CartState = {
  count: number;
  increment: () => void;
  reset: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));
