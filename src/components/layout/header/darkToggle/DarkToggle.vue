<template>
  <div
    class="nav-link m-0 cursor-default border-none p-0"
    :class="{ 'transition-none': mobile }"
    @click="toggleDarkMode"
    v-if="darkModeEnabled"
  >
    <div
      class="border-gray-default cursor-pointer rounded-full border bg-white p-0.5 dark:bg-gray-900 sm:p-1"
    >
      <MoonIcon v-if="darkMode" />
      <SunIcon v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
const appStore = useAppStore();

const { darkMode, darkModeEnabled, mobile } = $(appStore);

const toggleDarkMode = () => {
  appStore.setDarkMode(!darkMode);
};
</script>
