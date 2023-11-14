<template>
  <div class="divide-gray-default divide-y">
    <MobileNavDrawer />
    <div class="space-y-1 py-2">
      <div class="px-2" @click="closeMobileNav('index')">
        <RouterLink class="mobile-nav-link" :to="{ name: 'index' }" exact
          >Home</RouterLink
        >
      </div>
    </div>
    <div class="space-y-1 py-2">
      <div class="px-2" @click="logout">
        <div class="mobile-nav-link cursor-pointer">Sign Out</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const appStore = useAppStore();

// const auth = useAuth();
const route = useRoute();

const closeMobileNav = (linkTo: string) => {
  if (linkTo === route.name || linkTo === 'x') {
    appStore.setMobileNav(false);
  }
};

const logout = async () => {
  // await auth.logout();
};
</script>
