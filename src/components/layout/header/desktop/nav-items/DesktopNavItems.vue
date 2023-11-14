<template>
  <div class="flex h-full w-full items-center justify-between">
    <div class="nav-group ml-6 md:ml-8">
      <RouterLink class="nav-link" to="/">Home</RouterLink>
      <RouterLink class="nav-link" to="/about">About</RouterLink>
    </div>
    <div class="nav-group">
      <div class="flex h-full items-center space-x-3 md:space-x-5">
        <DarkToggle />
        <RouterLink class="nav-link" to="/sign-in">Sign In</RouterLink>
      </div>

      <RouterLink
        class="btn btn-sm btn-primary mb-0"
        :to="{ name: 'register' }"
        exact
        >Create Account</RouterLink
      >
    </div>
  </div>
</template>
