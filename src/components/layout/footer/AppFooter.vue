<template>
  <div v-if="!isAuth" class="text-gray-light">
    <div class="container">
      <FooterNav v-if="route.meta.nav !== false" />
      <FooterInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
const { isAuth } = $(useAuthStore());
const route = useRoute();
</script>
