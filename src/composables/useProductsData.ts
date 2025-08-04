import type { Product } from "@/types/";

export async function useProductsData(): Promise<Product[]> {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products: Product[] = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
