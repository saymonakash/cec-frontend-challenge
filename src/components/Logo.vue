<template>
  <a
    href="/"
    :class="[
      'flex items-center gap-2 hover:scale-105 duration-300 font-bold max-w-max',
      varient === 'dark' ? 'text-primary' : 'text-white',
      size === 'medium' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl',
    ]"
  >
    <div
      :class="[
        'rounded-xl text-white grid place-items-center',
        varient === 'dark' ? 'bg-primary' : 'bg-white/20',
        size === 'medium' ? 'size-9' : 'size-11',
      ]"
    >
      <Store :class="size === 'medium' ? 'size-5' : 'size-7'" />
    </div>
    StoreHub
  </a>
</template>

<script setup lang="ts">
import { Store } from "lucide-vue-next";

type Props = {
  varient: "dark" | "light";
  size: "medium" | "large";
};

withDefaults(defineProps<Props>(), {
  varient: "dark",
  size: "medium",
});
</script>
