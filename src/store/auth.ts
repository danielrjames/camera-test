import { acceptHMRUpdate, defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    authInit: false,
    authSubmit: false,
    authenticated: false,
    tokens: {
      access: null,
      refresh: null,
    },
  }),
  getters: {
    isAuth: (state) => state.authenticated && !state.authSubmit,
  },
  actions: {
    authenticate(accessToken: string, refreshToken: string) {
      this.authenticated = true;
      this.tokens.access = accessToken;
      this.tokens.refresh = refreshToken;

      this.setAuthSubmit(false);
    },
    resetAuth() {
      this.authenticated = false;
      this.timer = 0;
      this.tokens.access = null;
      this.tokens.refresh = null;

      this.setAuthSubmit(false);

      const appStore = useAppStore();
      const userStore = useUserStore();

      appStore.setNavDropdown(false);
      appStore.setMobileNav(false);
      userStore.resetUser();
    },
    setAuthInit(status: boolean) {
      if (this.authInit !== status) {
        this.authInit = status;
      }
    },
    setAuthSubmit(status: boolean) {
      if (this.authSubmit !== status) {
        this.authSubmit = status;

        const appStore = useAppStore();

        appStore.setSpinner(status);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
