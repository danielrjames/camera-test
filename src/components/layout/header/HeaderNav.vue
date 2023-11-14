<template>
  <nav
    class="container flex h-full items-center justify-between sm:justify-start"
  >
    <RouterLink class="whitespace-nowrap" to="/">
      <HorizontalLogo />
    </RouterLink>
    <MobileNav v-if="mobile" />
    <DesktopNav v-else />
  </nav>
</template>

<script setup lang="ts">
const appStore = useAppStore();

const { mobile } = $(appStore);
</script>
