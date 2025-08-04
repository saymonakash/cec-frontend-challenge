<template>
  <div class="relative">
    <button
      class="size-9 rounded-xl bg-primary/5 grid place-items-center hover:text-secondary duration-300 cursor-pointer"
    >
      <ShoppingCart class="size-5" />
    </button>
    <span
      v-if="cartItemCount > 0"
      class="absolute -top-1 -right-2 bg-secondary text-white text-xs font-semibold rounded-full px-1"
    >
      {{ cartItemCount }}
    </span>
  </div>
  <div
    class="fixed top-0 right-0 z-50 bg-white shadow-lg px-4 md:px-6 h-screen max-w-[390px] w-full"
  >
    <div class="relative h-full flex flex-col justify-between">
      <div class="flex-1 h-full flex flex-col">
        <div
          class="flex items-center justify-between py-5 border-b border-line"
        >
          <h2 class="text-lg font-bold flex items-center gap-2 text-primary">
            <ShoppingCart class="size-5" />
            Shopping Cart
            <span v-if="cartItemCount > 0" class="text-secondary font-semibold">
              ({{ cartItemCount }})
            </span>
          </h2>
          <button class="hover:text-red-500 cursor-pointer duration-300">
            <X class="size-5" />
          </button>
        </div>
        <div
          class="flex flex-col items-center justify-center h-full text-gray-400 animate-fade-in"
        >
          <ShoppingCart class="size-14 text-secondary/70 drop-shadow-lg" />
          <p class="text-lg font-semibold text-primary my-2">
            Your cart is empty
          </p>
          <p class="text-xs text-gray-500">
            Browse products and add them to your cart!
          </p>
        </div>
        <div class="flex flex-col gap-2 py-6">
          <div
            class="border border-line shadow-sm p-1 rounded-xl flex items-center justify-between gap-4"
          >
            <div class="flex items-center gap-2">
              <div class="size-16 bg-background rounded-xl"></div>
              <div>
                <h4 class="font-semibold text-sm">test</h4>
                <p class="text-[10px] mb-1">category</p>
                <h3 class="font-bold text-sm md:text-base">$300</h3>
              </div>
            </div>
            <div
              class="bg-background p-2 flex flex-col gap-2 h-full rounded-xl text-center"
            >
              <button class="hover:text-secondary duration-300 cursor-pointer">
                <Plus class="size-3" />
              </button>
              <p class="text-xs font-bold text-secondary">0</p>
              <button class="hover:text-secondary duration-300 cursor-pointer">
                <Minus class="size-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="border-t border-line py-5 space-y-6 bg-white rounded-b-xl px-2"
      >
        <div class="flex items-center justify-between gap-2 md:text-lg">
          <p class="font-medium text-gray-700">Total</p>
          <strong class="text-xl text-primary">
            ${{
              cartItems
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)
            }}
          </strong>
        </div>
        <button
          :class="[
            'primary-btn w-full py-4 font-bold md:text-lg rounded-lg shadow hover:bg-secondary/90 transition',
            cartItemCount === 0
              ? 'opacity-50 cursor-not-allowed pointer-events-none'
              : '',
          ]"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  ShoppingCart,
  ShoppingBag,
  X,
  Star,
  Plus,
  Minus,
} from "lucide-vue-next";
import { $cartItems } from "@/store/store";
import { useStore } from "@nanostores/vue";

const cartItems = useStore($cartItems);

const cartItemCount = computed(() =>
  cartItems.value.reduce(
    (sum: number, item: { quantity: number }) => sum + item.quantity,
    0
  )
);
</script>
