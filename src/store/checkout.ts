"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./cart";

export type CheckoutContact = {
  email: string;
  phone: string;
};

export type ShippingAddress = {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

export type SavedCheckoutDraft = {
  contact: CheckoutContact;
  shippingAddress: ShippingAddress;
  shippingMethod: "standard" | "express";
};

export type LocalOrder = {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: "confirmed" | "processing" | "fulfilled";
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  contact: CheckoutContact;
  shippingAddress: ShippingAddress;
  payment: {
    method: "card";
    transactionId: string;
    last4: string;
  };
};

type CheckoutState = {
  draft: SavedCheckoutDraft;
  orders: LocalOrder[];
  setDraft: (updater: Partial<SavedCheckoutDraft>) => void;
  addOrder: (order: LocalOrder) => void;
  getOrderById: (orderId: string) => LocalOrder | undefined;
  resetDraft: () => void;
};

const defaultDraft: SavedCheckoutDraft = {
  contact: {
    email: "",
    phone: "",
  },
  shippingAddress: {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "United States",
  },
  shippingMethod: "standard",
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      draft: defaultDraft,
      orders: [],
      setDraft: (updater) =>
        set((state) => ({
          draft: {
            ...state.draft,
            ...updater,
            contact: {
              ...state.draft.contact,
              ...(updater.contact ?? {}),
            },
            shippingAddress: {
              ...state.draft.shippingAddress,
              ...(updater.shippingAddress ?? {}),
            },
          },
        })),
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      getOrderById: (orderId) => get().orders.find((order) => order.id === orderId),
      resetDraft: () => set({ draft: defaultDraft }),
    }),
    {
      name: "checkout-storage",
    }
  )
);
