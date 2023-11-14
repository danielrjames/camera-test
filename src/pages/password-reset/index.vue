<template>
  <div class="center-contents">
    <div class="auth-frame">
      <div class="auth-frame-heading">Password Reset</div>
      <PasswordResetForm :slim="false" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<route lang="yaml">
meta:
  title: 'Password Reset'
  public: true
</route>
