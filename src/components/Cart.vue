<template>
  <div class="relative">
    <button
      @click="isCartOpen = !isCartOpen"
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
  <Transition
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div
      v-if="isCartOpen"
      class="fixed top-0 right-0 z-50 bg-white shadow-lg px-4 md:px-6 h-svh max-w-[390px] w-full transition-all duration-500 ease-in-out"
    >
      <div class="relative h-full flex flex-col justify-between">
        <div class="flex-1 h-full flex flex-col">
          <div
            class="flex items-center justify-between py-5 border-b border-line"
          >
            <h2 class="text-lg font-bold flex items-center gap-2 text-primary">
              <ShoppingCart class="size-5" />
              Shopping Cart
              <span
                v-if="cartItemCount > 0"
                class="text-secondary font-semibold"
              >
                ({{ cartItemCount }})
              </span>
            </h2>
            <button
              @click="isCartOpen = false"
              class="hover:text-red-500 cursor-pointer duration-300"
            >
              <X class="size-5" />
            </button>
          </div>
          <div
            v-if="cartItems.length === 0"
            class="flex flex-col items-center justify-center h-full text-gray-400 text-center"
          >
            <ShoppingCart class="size-14 text-secondary/70 drop-shadow-lg" />
            <p class="text-lg font-semibold text-primary my-2">
              Your cart is empty
            </p>
            <p class="text-xs text-gray-500 max-w-50">
              Browse products and add them to your cart!
            </p>
          </div>
          <div
            v-else
            class="flex flex-col gap-2 my-6 max-h-[calc(100svh-300px)] overflow-y-auto"
          >
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="border border-line shadow-sm p-1 px-2 rounded-xl flex items-center justify-between gap-4 group"
            >
              <div class="flex items-center gap-3">
                <div
                  class="size-16 min-w-16 p-1 rounded-xl bg-background/20 border border-line/80 shadow-sm overflow-hidden"
                >
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="object-contain size-full group-hover:scale-105 duration-300"
                  />
                </div>

                <div>
                  <h4 class="font-semibold text-xs text-primary line-clamp-1">
                    {{ item.title }}
                  </h4>
                  <p
                    class="text-[10px] text-gray-400 mb-1 capitalize tracking-wide"
                  >
                    {{ item.category }}
                  </p>
                  <h3 class="font-bold text-base text-secondary">
                    ${{ item.price }}
                  </h3>
                </div>
              </div>
              <div
                class="bg-background/50 p-2 flex flex-col gap-2 h-full rounded-xl text-center"
              >
                <button
                  @click="() => item && addCart(item)"
                  class="hover:text-secondary duration-300 cursor-pointer"
                >
                  <Plus class="size-3" />
                </button>
                <p class="text-xs font-bold text-secondary">
                  {{ currentProductInCart(item.id) }}
                </p>
                <button
                  @click="() => item && removeFromCart(item.id)"
                  class="hover:text-secondary duration-300 cursor-pointer"
                >
                  <Minus class="size-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="border-t border-line pb-5 pt-3 space-y-6 bg-white rounded-b-xl sticky bottom-0"
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
            @click="checkout"
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
  </Transition>

  <div
    v-if="isCartOpen"
    @click="isCartOpen = false"
    class="fixed inset-0 bg-primary/10 backdrop-blur"
  ></div>
  <PaymentSuccessPopup
    :is-pyament-success="isPyamentSuccess"
    @isPopupOpen="isPyamentSuccess = $event"
  />
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { ShoppingCart, X, Plus, Minus } from "lucide-vue-next";
import { $cartItems, addCart, removeFromCart, clearCart } from "@/store/store";
import { useStore } from "@nanostores/vue";
import PaymentSuccessPopup from "@/components/PaymentSuccessPopup.vue";
const isCartOpen = ref(false);

const cartItems = useStore($cartItems);

const cartItemCount = computed(() =>
  cartItems.value.reduce(
    (sum: number, item: { quantity: number }) => sum + item.quantity,
    0
  )
);

function currentProductInCart(productId: number) {
  return cartItems.value.find((item) => item.id === productId)?.quantity || 0;
}

watchEffect(() => {
  if (isCartOpen.value) {
    document.documentElement.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "";
  }
});

const isPyamentSuccess = ref(false);
function checkout() {
  if (cartItemCount.value > 0) {
    clearCart();
    isPyamentSuccess.value = true;
  }
}
watchEffect(() => {
  if (!isPyamentSuccess.value) {
    isCartOpen.value = false;
  }
});
</script>
