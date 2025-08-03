<template>
  <div class="flex items-center justify-center gap-2 *:w-12 *:h-8 *:p-0 py-6">
    <button
      :class="currentPage === 1 ? disableClasses : ''"
      class="secondary-btn"
      @click="setPreviousPage"
    >
      <ChevronLeft class="w-10" />
    </button>
    <button
      v-for="item in totalPages"
      @click="setCurrentPage(item)"
      class="secondary-btn"
      :class="
        currentPage === item ? 'bg-dark text-white pointer-events-none' : ''
      "
    >
      {{ item }}
    </button>
    <button
      :class="totalPages === currentPage ? disableClasses : ''"
      class="secondary-btn"
      @click="setNextPage"
    >
      <ChevronRight class="w-10" />
    </button>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

type Props = {
  totalPages: number;
};
const props = defineProps<Props>();
const emit = defineEmits(["currentPage"]);
const disableClasses = ref("opacity-50 cursor-not-allowed pointer-events-none");
const currentPage = ref(1);

watch(
  () => currentPage.value,
  (newVal) => {
    emit("currentPage", newVal);
  },
  { immediate: true }
);

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page");
  if (page) {
    currentPage.value = parseInt(page, 10);
  }
});

function setPreviousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function setCurrentPage(page: number) {
  currentPage.value = page;
}

function setNextPage() {
  if (currentPage.value < props.totalPages) {
    currentPage.value++;
  }
}
</script>
