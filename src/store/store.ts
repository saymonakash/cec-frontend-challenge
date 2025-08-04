import type { Product } from "@/types";
import { atom } from "nanostores";

export const $products = atom<Product[]>(
  await fetch("https://fakestoreapi.com/products").then((res) => res.json())
);

export type CartItem = Product & { quantity: number };

export const $cartItems = atom<CartItem[]>([]);

export function addCart(newItem: Product) {
  $cartItems.set(
    $cartItems.get().some((item) => item.id === newItem.id)
      ? $cartItems
          .get()
          .map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
      : [...$cartItems.get(), { ...newItem, quantity: 1 }]
  );
  console.log(
    "Cart items updated:",
    $cartItems.get().reduce((sum, item) => sum + item.quantity, 0)
  );
}

export function removeFromCart(itemId: number) {
  const currentItems = $cartItems.get();
  const updatedItems = currentItems
    .map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
    )
    .filter((item) => item.quantity > 0);
  $cartItems.set(updatedItems);
}

export function clearCart() {
  $cartItems.set([]);
}
