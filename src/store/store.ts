import type { Product } from "@/types";
import { atom } from "nanostores";

export const $products = atom<Product[]>([]);

export async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    $products.set(products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export type CartItem = Product & { quantity: number };

const CART_ITEMS_KEY = "cartItems";

function loadCartItems(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const data = localStorage.getItem(CART_ITEMS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export const $cartItems = atom<CartItem[]>(loadCartItems());

$cartItems.subscribe((items) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
  } catch {}
});

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
