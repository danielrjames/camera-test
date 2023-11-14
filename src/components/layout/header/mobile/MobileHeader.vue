<template>
  <div class="border-gray-default bg-header relative z-50 h-16 border-b">
    <div
      class="container flex h-full items-center justify-between sm:justify-start"
    >
      <RouterLink :to="{ name: 'index' }" @click="closeMobileNav('index')">
        <HorizontalLogo />
      </RouterLink>
      <div class="mobile-menu-icon" @click="closeMobileNav('x')">
        <MenuCloseIcon />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const appStore = useAppStore();
const route = useRoute();

const closeMobileNav = (linkTo: string) => {
  if (linkTo === route.name || linkTo === 'x') {
    appStore.setMobileNav(false);
  }
};
</script>
