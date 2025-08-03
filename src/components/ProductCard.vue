<template>
  <a
    v-if="product"
    class="rounded-xl border border-line shadow-sm group cursor-pointer hover:shadow-lg hover:-translate-y-1 duration-500 flex flex-col justify-between"
    :href="`/product/${product.id}`"
  >
    <div
      class="h-[192px] w-full bg-background/20 overflow-hidden p-4 md:p-6 relative"
    >
      <img
        :src="product.image"
        :alt="product.title"
        class="size-full object-contain group-hover:scale-105 duration-300"
        loading="lazy"
        width="400"
        height="192"
      />
      <span
        class="px-2.5 py-0.5 rounded-full bg-primary text-white text-xs font-medium absolute top-2.5 right-2.5"
      >
        {{ product.category }}
      </span>
    </div>
    <div
      class="p-4 flex flex-col gap-6 justify-between group-hover:bg-background/20 transition-colors duration-300"
    >
      <p class="text-sm font-semibold group-hover:text-secondary duration-300">
        {{ product.title }}
      </p>
      <div>
        <div class="flex items-center gap-2">
          <div class="flex items-center">
            <Star
              v-for="index in 5"
              :key="index"
              fill="currentColor"
              :stroke-width="0"
              :class="`size-4 ${
                product.rating?.rate ? 'text-secondary' : 'text-background'
              }`"
            />
          </div>
          <span class="text-xs text-text">({{ product.rating.count }})</span>
        </div>
        <Spacer class="h-1" />
        <div class="flex items-center gap-4 justify-between">
          <h4 class="text-xl md:text-2xl font-bold">${{ product.price }}</h4>
          <button class="primary-btn">
            <ShoppingCart class="size-4" /> View
          </button>
        </div>
      </div>
    </div>
  </a>
</template>

<script lang="ts" setup>
import { Star, ShoppingCart } from "lucide-vue-next";
import type { Product } from "@/types";
import Spacer from "@/components/Spacer.vue";

interface Props {
  product?: Product;
}

defineProps<Props>();
</script>
