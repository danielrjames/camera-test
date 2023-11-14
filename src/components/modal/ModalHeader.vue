<template>
  <div class="modal-header">
    <div
      class="text-gray-heading font-semibold"
      :class="{ 'w-full text-center': header.center }"
    >
      {{ header.title }}
    </div>
    <button
      v-if="header.close"
      type="button"
      class="bg-app -mt-2 -mr-1 rounded-md text-gray-400 transition hover:text-gray-500 focus:outline-none dark:hover:text-gray-200"
      @click="closeModal"
    >
      <span class="sr-only">Close</span>
      <ModalCloseIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
const appStore = useAppStore();

const { modal } = $(appStore);

const header = computed(() => modal.header);

const closeModal = () => {
  appStore.closeModal();
};
</script>
