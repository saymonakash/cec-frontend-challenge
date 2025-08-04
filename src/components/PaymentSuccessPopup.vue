<script setup lang="ts">
import { CircleCheckBig } from "lucide-vue-next";
import { ref, watchEffect } from "vue";

type Props = {
  isPyamentSuccess: boolean;
};
const props = defineProps<Props>();
const emit = defineEmits(["isPopupOpen"]);
const isPopupOpen = ref(false);
watchEffect(() => {
  if (props.isPyamentSuccess) {
    isPopupOpen.value = true;
  }
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isPopupOpen"
      class="fixed inset-0 z-[9999] backdrop-blur-sm"
    ></div>
    <Transition
      enter-active-class="animate-bounce-in"
      leave-active-class="animate-bounce-out"
    >
      <div
        v-if="isPopupOpen"
        class="bg-white rounded-3xl px-8 pt-10 pb-7 shadow-2xl flex flex-col items-center max-w-[320px] w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000]"
      >
        <div
          class="bg-gradient-to-br from-green-400 to-green-500 rounded-full p-5 mb-5 shadow-lg flex items-center justify-center"
        >
          <CircleCheckBig class="size-12 text-white" />
        </div>
        <div class="text-xl font-semibold text-primary mb-2 text-center">
          Payment Successful
        </div>
        <div class="text-base text-text mb-6 text-center">
          Your payment was completed successfully.<br />
          Thank you for your purchase!
        </div>
        <button
          class="bg-green-500 hover:bg-green-600 text-white rounded-xl px-8 py-2 font-medium shadow transition-colors cursor-pointer"
          @click="
            isPopupOpen = false;
            emit('isPopupOpen', isPopupOpen);
          "
        >
          OK
        </button>
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped>
@keyframes bounceInSmooth {
  0% {
    opacity: 0;
    transform: scale(0.85);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.03);
  }
  75% {
    opacity: 1;
    transform: scale(0.97);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceOutSmooth {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  30% {
    opacity: 0.8;
    transform: scale(1.04);
  }
  100% {
    opacity: 0;
    transform: scale(0.85);
  }
}

.animate-bounce-in {
  animation: bounceInSmooth 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.animate-bounce-out {
  animation: bounceOutSmooth 0.5s cubic-bezier(0.55, 0, 0.55, 0.2);
}
</style>
