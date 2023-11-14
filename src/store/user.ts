import { acceptHMRUpdate, defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    email: null,
    emailConfirmed: false,
    firstName: '',
    lastName: '',
  }),
  getters: {},
  actions: {
    resetUser() {
      this.email = null;
      this.emailConfirmed = false;
      this.firstName = '';
      this.lastName = '';
    },
    updateUser(payload: any) {
      this.email = payload.email;
      this.emailConfirmed = !!payload.email_confirmed;
      this.firstName = payload.first_name;
      this.lastName = payload.last_name;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
