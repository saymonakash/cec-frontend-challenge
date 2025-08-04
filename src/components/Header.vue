<template>
  <header class="sticky top-0 z-50 bg-white shadow-md">
    <div class="main-container flex items-center justify-between bg-white py-3">
      <Logo varient="dark" size="medium" />
      <nav class="flex items-center gap-4">
        <ul class="flex items-center gap-4">
          <li v-for="item in navItems" :key="item.name">
            <a
              :href="item.href"
              :class="[
                'text-sm md:text-base font-semibold hover:text-secondary duration-300',
                item.href === pathName ? 'text-secondary' : '',
              ]"
            >
              {{ item.name }}
            </a>
          </li>
        </ul>
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
      </nav>
    </div>
  </header>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { ShoppingCart } from "lucide-vue-next";
import Logo from "@/components/Logo.vue";
import { $cartItems } from "@/store/store";
import { useStore } from "@nanostores/vue";

const cartItems = useStore($cartItems);

const cartItemCount = computed(() =>
  cartItems.value.reduce(
    (sum: number, item: { quantity: number }) => sum + item.quantity,
    0
  )
);

const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
];

const pathName = window.location.pathname;
</script>
