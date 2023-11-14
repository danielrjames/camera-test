import { BROWSER, DARK_MODE } from './../utils/app/const';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    base: {
      title: '',
      template: '',
    },
    browser: '',
    darkMode: false,
    darkModeEnabled: false,
    fullscreen: false,
    hideNav: false,
    loading: false,
    mobile: false,
    mobileNav: false,
    modal: {
      action: '',
      body: null,
      buttons: null,
      component: null,
      header: null,
      open: false,
      required: false,
      spinner: false,
      width: '',
    },
    navDropdown: false,
    os: '',
    spinner: false,
    pageData: {
      title: '',
      template: '',
      description: '',
    },
  }),
  getters: {},
  actions: {
    closeModal() {
      if (this.modal.spinner) {
        this.modal.spinner = false;
      }

      if (this.modal.open) {
        this.modal.open = false;
      }

      if (this.modal.action !== '') {
        this.modal.action = '';
      }
    },
    openModal(config = null) {
      if (config !== null) {
        this.modal = config;
      }
    },
    setBaseTitle(title: string, template: string) {
      this.base.title = title;
      this.base.template = template;
    },
    setDarkMode(status: boolean, enabled = null) {
      if (this.darkMode !== status) {
        this.darkMode = status;

        localStorage.setItem(DARK_MODE, status.toString());
      }

      if (enabled !== null) {
        this.darkModeEnabled = enabled;
      }
    },
    setDevice(browser: string, os: string) {
      const wb = browser.toLowerCase();

      this.browser = wb === BROWSER.MOBILE_SAFARI ? BROWSER.SAFARI : wb;
      this.os = os.toLowerCase();
    },
    setFullscreen(status: boolean) {
      if (this.fullscreen !== status) {
        this.fullscreen = status;
      }
    },
    setHideNav(status: boolean) {
      if (this.hideNav !== status) {
        this.hideNav = status;
      }
    },
    setLoading(status: boolean) {
      if (this.loading !== status) {
        this.loading = status;

        const authStore = useAuthStore();

        if (status === false && authStore.authSubmit === false) {
          this.spinner = status;
        }
      }
    },
    setMobile(status: boolean) {
      if (this.mobile !== status) {
        this.mobile = status;
      }

      if (status === false) {
        this.setMobileNav(status);
        this.setNavDropdown(status);
      }
    },
    setMobileNav(status: boolean) {
      if (this.mobileNav !== status) {
        this.mobileNav = status;
      }
    },
    setModalAction(action?: string) {
      if (action && this.modal.action !== action) {
        this.modal.action = action;
      } else {
        this.modal.action = '';
      }
    },
    setModalSpinner(status: boolean) {
      if (this.modal.spinner !== status) {
        this.modal.spinner = status;
      }
    },
    setNavDropdown(status: boolean) {
      if (this.navDropdown !== status) {
        this.navDropdown = status;
      }
    },
    setPageData(title: string, template: string, description?: string) {
      this.pageData.title = title;
      this.pageData.template = template;
      this.pageData.description = description ?? '';
    },
    setSpinner(status: boolean) {
      if (this.spinner !== status) {
        this.spinner = status;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
