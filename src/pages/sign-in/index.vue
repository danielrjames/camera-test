<template>
  <div class="center-contents">
    <div class="auth-frame">
      <div class="auth-frame-heading">Sign In</div>
      <LoginForm :slim="false" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  title: 'Sign In'
  public: true
</route>
