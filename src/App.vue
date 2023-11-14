<template>
  <template v-if="authInit">
    <AppHeader />
    <main
      class="container"
      :class="{ 'footer-offscreen': !isAuth, 'no-footer': isAuth }"
    >
      <RouterView />
    </main>
    <AppModal />
    <AppFooter v-if="!isAuth" />
  </template>
</template>

<script setup lang="ts">
import {
  DARK_MODE,
  MOBILE_OS,
  STRING,
  addBodyClass,
  addDocumentClass,
  removeBodyClass,
  removeDocumentClass,
} from './utils/app';
import UAParser from 'ua-parser-js';

const appStore = useAppStore();
const authStore = useAuthStore();
const auth = useAuth();

const { darkMode, mobile, mobileNav, modal, os, pageData } = $(appStore);
const { authInit, isAuth } = $(authStore);
const { width } = $(useWindowSize());

const isMobile = $computed(() => width < 640 || MOBILE_OS.includes(os));
const overlay = $computed(() => mobileNav || modal.open);

const baseTitle = import.meta.env.VITE_APP_TITLE;
const baseTemplate = import.meta.env.VITE_APP_TEMPLATE;
const enableDarkMode =
  import.meta.env.VITE_APP_ENABLE_DARK_MODE === STRING.TRUE;

useHead({
  title: computed(() =>
    pageData.title.length > 0
      ? `${pageData.title} | ${pageData.template}`
      : `${baseTitle} | ${baseTemplate}`
  ),
  meta: [
    {
      name: 'description',
      content: computed(() => pageData.description),
    },
  ],
});

onBeforeMount(async () => {
  initDarkMode();

  const parser = new UAParser();

  appStore.setDevice(parser.getBrowser().name, parser.getOS().name);

  appStore.setBaseTitle(baseTitle, baseTemplate);

  await auth.checkTokens();
});

watch($$(darkMode), (newValue) => {
  if (newValue === true) {
    addDocumentClass(['dark']);
  } else {
    removeDocumentClass(['dark']);
  }
});

watch($$(overlay), (newValue) => {
  if (newValue === true) {
    addBodyClass(['overflow-hidden']);
    addDocumentClass(['fixed', 'w-full']);
  } else {
    removeBodyClass(['overflow-hidden']);
    removeDocumentClass(['fixed', 'w-full']);
  }
});

watchEffect(() => {
  if (mobile !== isMobile) {
    appStore.setMobile(isMobile);
  }
});

const initDarkMode = () => {
  let isDarkMode = false;

  if (enableDarkMode) {
    const storageVal = localStorage.getItem(DARK_MODE);

    isDarkMode =
      storageVal === STRING.TRUE ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  appStore.setDarkMode(isDarkMode, enableDarkMode);
};
</script>
