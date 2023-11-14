<template>
  <div
    class="ring-gray-default bg-app divide-gray-default text-gray-light absolute top-9 -right-2 z-50 w-52 divide-y overflow-hidden rounded text-xs shadow ring-1 dark:shadow-md dark:shadow-gray-900"
  >
    <div class="p-3">
      <div class="mb-0.5">Signed in as</div>
      <div class="text-gray-heading truncate text-sm font-semibold">
        {{ fullName }}
      </div>
    </div>
    <div class="space-y-3 p-3 text-sm font-medium">
      <!-- <div>
        <RouterLink
          class="group flex items-center text-gray-500 transition hover:text-gray-dark"
          :to="{ name: 'settings-account' }"
          @click="closeDropdown('settings-account')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-3 w-4 h-4 text-gray-400 transition group-hover:text-gray-dark"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          Account Settings</RouterLink
        >
      </div> -->
      <div>
        <div
          class="hover:text-gray-dark text-gray-light group flex cursor-pointer items-center"
          @click="logout"
        >
          <SignOutIcon :class="'group-hover:text-gray-dark h-4 w-4'" />
          <span class="ml-2">Sign Out</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const auth = useAuth();

const { firstName, lastName } = $(userStore);
const { logout } = auth;

const fullName = $computed(() => `${firstName} ${lastName}`);
</script>
