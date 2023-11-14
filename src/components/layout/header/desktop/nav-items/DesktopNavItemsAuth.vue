<template>
  <div class="flex h-full w-full items-center justify-between">
    <div class="nav-group ml-6 md:ml-8">
      <RouterLink class="nav-link" :to="{ name: 'index' }" exact
        >Home</RouterLink
      >
    </div>

    <div class="nav-group space-x-5">
      <DarkToggle />
      <div ref="target" class="relative select-none">
        <div class="nav-link cursor-pointer" @click="toggleDropdown">
          Account

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ml-1 h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <AuthDropdown v-if="navDropdown" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const appStore = useAppStore();

const { navDropdown } = $(appStore);
const target = ref<any>(null);

onClickOutside(target, () => closeDropdown());

const closeDropdown = () => {
  appStore.setNavDropdown(false);
};

const toggleDropdown = () => {
  appStore.setNavDropdown(!navDropdown);
};
</script>
