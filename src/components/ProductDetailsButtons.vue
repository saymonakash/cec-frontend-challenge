<script setup lang="ts">
import type { Product } from "@/types";
import { Share, ShoppingCart } from "lucide-vue-next";
import { addCart } from "@/store/store";

type Props = {
  product: Product;
};
defineProps<Props>();

function handleShare() {
  const url = window.location.href;
  navigator
    .share({
      title: document.title,
      url: url,
    })
    .catch(() => {});
}
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <button @click="handleShare" class="secondary-btn md:py-4">
      <Share class="size-3 md:size-5 min-w-3" /> Share
    </button>
    <button
      @click="() => product && addCart(product)"
      class="primary-btn md:py-4 text-xl md:gap-4"
    >
      <ShoppingCart class="size-4 md:size-6" /> Add to Cart
    </button>
  </div>
</template>
