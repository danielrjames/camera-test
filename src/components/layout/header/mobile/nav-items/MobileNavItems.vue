<template>
  <div class="divide-y divide-gray-100">
    <div class="space-y-1 py-2">
      <div class="px-2" @click="closeMobileNav('index')">
        <RouterLink class="mobile-nav-link" :to="{ name: 'index' }" exact
          >Home</RouterLink
        >
      </div>
      <div class="px-2" @click="closeMobileNav('about')">
        <RouterLink class="mobile-nav-link" :to="{ name: 'about' }"
          >About</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const appStore = useAppStore();
const route = useRoute();

const closeMobileNav = (linkTo) => {
  if (linkTo === route.name || linkTo === 'x') {
    appStore.setMobileNav(false);
  }
};
</script>
