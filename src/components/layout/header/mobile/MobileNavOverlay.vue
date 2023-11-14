<template>
  <Transition name="fadeFast">
    <div v-if="mobileNav" class="bg-app fixed top-0 left-0 z-50 h-full w-full">
      <MobileHeader />
      <MobileNavItemsAuth v-if="isAuth" />
      <MobileNavItems v-else />
    </div>
  </Transition>
</template>

<script setup lang="ts">
const appStore = useAppStore();
const authStore = useAuthStore();

const { mobileNav } = $(appStore);
const { isAuth } = $(authStore);
</script>
