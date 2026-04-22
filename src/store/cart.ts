import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  subtitle?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  isCartOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getItemCount: () => number;
}

const calculateTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      isCartOpen: false,
      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          const nextItems = items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
          set({ items: nextItems, total: calculateTotal(nextItems) });
        } else {
          const nextItems = [...items, { ...item, quantity: 1 }];
          set({ items: nextItems, total: calculateTotal(nextItems) });
        }
      },
      removeItem: (id) => {
        const nextItems = get().items.filter((item) => item.id !== id);
        set({ items: nextItems, total: calculateTotal(nextItems) });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        const nextItems = get().items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        set({ items: nextItems, total: calculateTotal(nextItems) });
      },
      clearCart: () => set({ items: [], total: 0 }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
        total: state.total,
      }),
    }
  )
);
