<template>
  <Transition name="fade">
    <div
      v-if="modal.open"
      class="modal-bg fixed top-0 left-0 z-50 flex h-full min-w-full items-center justify-center overflow-hidden px-4"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <Component
        ref="target"
        :class="'modal-frame'"
        :is="modal.component"
        v-if="modal.component !== null"
      />
      <div ref="target" v-else class="modal-frame" :class="modal.width">
        <ModalHeader />
        <div class="modal-body">
          <div v-if="hasHtml" v-html="text"></div>
          <div v-else>
            {{ text }}
          </div>
        </div>
        <ModalFooter />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const appStore = useAppStore();

const { modal } = $(appStore);
const target = ref<any>(null);

const hasHtml = computed(() => modal.body.html);
const text = computed(() => modal.body.text);

onClickOutside(target, () => {
  if (!modal.required) {
    appStore.closeModal();
  }
});
</script>
