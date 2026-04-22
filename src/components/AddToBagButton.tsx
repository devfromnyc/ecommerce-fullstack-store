"use client";

import { useMemo } from "react";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useVariantStore } from "@/store/variant";

type VariantOption = {
  id: string;
  color?: string | null;
  size?: string | null;
  price: number;
  salePrice?: number | null;
};

type Props = {
  productId: string;
  productName: string;
  imageUrl?: string | null;
  variants: VariantOption[];
  className?: string;
};

export default function AddToBagButton({
  productId,
  productName,
  imageUrl,
  variants,
  className = "",
}: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const selected = useVariantStore((s) => s.getSelected(productId, 0));

  const selectedVariant = useMemo(
    () => variants[selected] ?? variants[0],
    [selected, variants]
  );

  const onAdd = () => {
    if (!selectedVariant) return;

    const price =
      selectedVariant.salePrice !== null && selectedVariant.salePrice !== undefined
        ? selectedVariant.salePrice
        : selectedVariant.price;

    const subtitleParts = [selectedVariant.color, selectedVariant.size].filter(Boolean);
    addItem({
      id: selectedVariant.id,
      name: productName,
      subtitle: subtitleParts.join(" / ") || "Default option",
      price,
      image: imageUrl ?? undefined,
    });
    openCart();
  };

  return (
    <button
      type="button"
      onClick={onAdd}
      disabled={!selectedVariant}
      className={`flex items-center justify-center gap-2 rounded-full bg-dark-900 px-6 py-4 text-body-medium text-light-100 transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500] disabled:cursor-not-allowed disabled:bg-light-300 disabled:text-dark-700 ${className}`}
    >
      <ShoppingBag className="h-5 w-5" />
      Add to Bag
    </button>
  );
}
