import { createRouter, createWebHistory } from 'vue-router';
import { waitUntil } from './../utils/app/appService';
import routes from 'virtual:generated-pages';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

router.beforeEach(async (to) => {
  const appStore = useAppStore();
  const authStore = useAuthStore();

  const { authInit, isAuth } = $(authStore);

  if (!authInit) {
    await waitUntil(() => authInit === true);
  }

  appStore.closeModal();
  appStore.setMobileNav(false);
  appStore.setNavDropdown(false);

  if (to.meta.auth && !isAuth) {
    const path = {
      path: '/sign-in',
      query: { returnUrl: to.fullPath },
    };

    return path;
  } else if (to.meta.public && isAuth) {
    return { path: '/' };
  }
});

router.beforeEach(async (to, from, next) => {
  const { base } = $(useAppStore());
  const { authInit, isAuth } = $(useAuthStore());

  if (!authInit) {
    await waitUntil(() => authInit === true);
  }

  let title: any = to.meta.title ?? '...';
  let template: any = base.title;

  if (to.meta.index && !isAuth) {
    title = base.title;
    template = base.template;
  }

  usePageTitle(title, template);

  next();
});

export default router;
