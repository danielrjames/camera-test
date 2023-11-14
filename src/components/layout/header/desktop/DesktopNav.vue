<template>
  <div
    v-if="route.meta.nav !== false"
    class="hidden h-full w-full text-sm sm:block"
  >
    <DesktopNavItemsAuth v-if="isAuth" />
    <DesktopNavItems v-else />
  </div>
</template>

<script setup lang="ts">
const { isAuth } = $(useAuthStore());

const route = useRoute();
</script>
