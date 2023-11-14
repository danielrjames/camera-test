<template>
  <div
    aria-controls="mobile-menu"
    aria-expanded="false"
    class="mobile-menu-icon"
    @click="showMobileNav"
  >
    <MenuOpenIcon />
  </div>
</template>

<script setup lang="ts">
const appStore = useAppStore();

const showMobileNav = () => {
  appStore.setMobileNav(true);
};
</script>
