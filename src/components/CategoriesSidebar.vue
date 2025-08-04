<template>
  <div class="md:sticky top-20">
    <div class="relative w-full">
      <input
        type="text"
        placeholder="Search for products..."
        class="w-full px-8 py-2 rounded-lg border border-line shadow-sm bg-white focus:border-primary outline-none peer transition-colors"
        v-model="searchQuery"
      />
      <Search
        class="size-4 text-text absolute inset-y-0 my-auto left-3 peer-focus:text-primary transition-colors pointer-events-none"
      />
      <XCircle
        v-if="searchQuery"
        class="size-4 text-text absolute inset-y-0 my-auto right-3 peer-focus:text-primary transition-colors hover:text-secondary cursor-pointer duration-300"
        @click="searchQuery = ''"
      />
    </div>
    <Spacer class="h-4 md:h-6" />
    <div
      class="rounded-xl overflow-hidden border border-line shadow-sm p-4 lg:p-6 max-h-max"
    >
      <div class="flex items-center gap-2.5">
        <Tag class="size-5" />
        <h3 class="font-medium text-dark text-lg lg:text-xl">Categories</h3>
      </div>
      <Spacer class="h-4" />
      <ul class="space-y-1 lg:space-y-2">
        <li v-for="category in categories" :key="category.name">
          <button
            type="button"
            @click="
              (activeCategory = category.name),
                $emit('categorySelected', category.name)
            "
            class="flex items-center justify-between gap-2 hover:bg-background transition-colors duration-300 px-3 lg:px-4 py-2 rounded-lg group w-full cursor-pointer"
            :class="{
              '!bg-primary text-white': activeCategory === category.name,
            }"
          >
            <h4
              class="flex items-center gap-1 text-xs lg:text-sm font-medium truncate capitalize"
            >
              {{ category.name }}
            </h4>
            <span
              class="px-3 py-1 text-center bg-secondary text-white rounded-full text-xs font-semibold min-w-10"
            >
              {{ category.productsLength }}
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Tag, Search, XCircle } from "lucide-vue-next";
import { ref, watch } from "vue";
import Spacer from "@/components/Spacer.vue";

interface Props {
  allProductsLength?: number;
  categories?: { name: string; productsLength: number }[];
}

defineProps<Props>();

const activeCategory = ref("All Products");

const emit = defineEmits(["searchQuery", "categorySelected"]);
const searchQuery = ref("");

watch(
  () => searchQuery.value,
  (newVal) => {
    emit("searchQuery", newVal);
  },
  { immediate: true }
);
</script>
