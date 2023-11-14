<template>
  <h2>Dashboard</h2>
  <div class="mt-5 space-x-10">
    <button class="btn btn-sm btn-primary" @click="openModal">
      Open Modal
    </button>
  </div>
</template>

<script setup lang="ts">
import { getModalConfig } from '../../utils/app/appService';

const appStore = useAppStore();

const openModal = () => {
  const config = getModalConfig();

  appStore.openModal(config);
};
</script>
