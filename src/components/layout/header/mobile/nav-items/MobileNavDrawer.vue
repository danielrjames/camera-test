<template>
  <div class="text-gray-light space-y-1 px-4 py-3">
    <div>
      <div class="mb-0.5 text-xs">Signed in as</div>
      <div class="text-gray-heading truncate text-sm font-semibold">
        {{ fullName }}
      </div>
    </div>
    <div class="flex items-end justify-between" v-if="darkModeEnabled">
      <div class="text-xs">Theme:</div>
      <DarkToggle />
    </div>
  </div>
</template>

<script setup lang="ts">
const appStore = useAppStore();
const userStore = useUserStore();

const { darkModeEnabled } = $(appStore);
const { firstName, lastName } = $(userStore);

const fullName = $computed(() => `${firstName} ${lastName}`);
</script>
