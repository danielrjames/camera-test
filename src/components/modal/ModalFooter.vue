<template>
  <div v-if="btnList" class="modal-footer">
    <button
      v-for="(btn, index) in btnList"
      :key="index"
      :class="[
        'btn',
        'btn-sm',
        btn.class,
        'm-0',
        mobile ? 'btn-stretch' : 'btn-w-auto',
        { 'btn-loading': btn.spinner && spinner },
      ]"
      @click="handleClick(btn.action)"
    >
      {{ btn.text }}
    </button>
  </div>
</template>

<script setup lang="ts">
const appStore = useAppStore();

const { mobile } = $(appStore);

const btnList = computed(() => appStore.modal.buttons);
const spinner = computed(() => appStore.modal.spinner);

const handleClick = (action: string) => {
  if (action === '' || action === null) {
    appStore.closeModal();
  } else {
    appStore.setModalAction(action);
  }
};
</script>
