<template>
  <div
    v-if="product"
    class="rounded-xl border border-line shadow-sm cursor-pointer hover:shadow-lg hover:-translate-y-1 duration-500 h-full flex flex-col"
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
      class="p-4 flex-1 flex flex-col h-full gap-6 justify-between group-hover:bg-background/20 transition-colors duration-300"
    >
      <a
        :href="`/product/${formatSlug(product.title)}`"
        class="text-sm font-semibold hover:text-secondary duration-300 line-clamp-2"
      >
        {{ product.title }}
      </a>
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
        <Spacer class="h-2" />
        <div class="flex flex-wrap items-center gap-4 justify-between">
          <h4 class="text-xl md:text-2xl font-bold">${{ product.price }}</h4>
          <button
            @click="() => product && addCart(product)"
            class="primary-btn relative group"
          >
            <ShoppingCart class="size-4" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Star, ShoppingCart } from "lucide-vue-next";
import type { Product } from "@/types";
import Spacer from "@/components/Spacer.vue";
import formatSlug from "@/utils/formateSlug";
import { addCart } from "@/store/store";

interface Props {
  product?: Product;
}

defineProps<Props>();
</script>
