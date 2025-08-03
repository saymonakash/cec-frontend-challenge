<template>
  <section
    v-if="products"
    class="main-container py-12 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6"
  >
    <div class="space-y-4">
      <CategoriesSidebar
        :allProductLength="products.length"
        :categories="uniqueCategories"
        @categorySelected="activeCategory = $event"
        @searchQuery="searchQuery = $event"
      />
    </div>
    <div class="md:col-span-2 xl:col-span-3 space-y-6">
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"
          ></div>
          <p class="text-text">Loading products...</p>
        </div>
      </div>
      <template v-else>
        <div class="flex items-center justify-between gap-2">
          <p class="text-text text-sm md:text-base">
            Showing
            {{ productsLength ? productShowFrom + 1 : productsLength }}-{{
              productsLength > productShowTo ? productShowTo : productsLength
            }}
            of {{ productsLength }} products
          </p>
          <span class="text-xs text-gray-400">
            <a href="/" class="secondary-btn">
              <House class="size-4" /> Back to Home
            </a>
          </span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProductCard
            v-for="(product, index) in displayedProducts"
            :key="product.id || index"
            :product="product"
          />
        </div>
        <Pagination
          v-if="totalPages > 1"
          :totalPages="totalPages"
          @currentPage="currentPage = $event"
        />
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { House } from "lucide-vue-next";
import type { Product } from "@/types";
import CategoriesSidebar from "@/components/CategoriesSidebar.vue";
import ProductCard from "@/components/ProductCard.vue";
import Pagination from "@/components/Pagination.vue";

const products = ref<Product[]>([]);
const searchQuery = ref("");
const showPerPage = ref(9);
const currentPage = ref(1);
const productsLength = ref(0);
const productShowFrom = computed(
  () => (currentPage.value - 1) * showPerPage.value
);
const productShowTo = computed(() => productShowFrom.value + showPerPage.value);

const loading = ref(true);
const activeCategory = ref("All Products");

const displayedProducts = computed(() => {
  let filtered = products.value;
  filtered = products.value.filter((product) => {
    const matchesCategory =
      activeCategory.value === "All Products" ||
      product.category === activeCategory.value;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  productsLength.value = filtered.length;
  return filtered.slice(productShowFrom.value, productShowTo.value);
});

watch(activeCategory, () => {
  currentPage.value = 1;
});

const totalPages = computed(() => {
  return Math.ceil(productsLength.value / showPerPage.value);
});

const uniqueCategories = computed(() => {
  const categoriesSet = new Set(
    products.value.map((product) => product.category)
  );
  const categoriesArray = Array.from(categoriesSet).map((category) => ({
    name: category,
    productsLength: products.value.filter(
      (product) => product.category === category
    ).length,
  }));
  return [
    {
      name: "All Products",
      productsLength: products.value.length,
    },
    ...categoriesArray,
  ];
});

const fetchProducts = async () => {
  try {
    loading.value = true;
    const response = await fetch("https://fakestoreapi.com/products/");
    products.value = await response.json();
  } catch (err) {
    console.error("Error fetching products:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>
