<template>
  <form :class="{ slim: slim }" @submit.prevent="handleSubmit">
    <div
      v-if="error"
      :class="[
        'auth-frame-message',
        'text-red-default',
        { 'py-1 text-xs': slim },
      ]"
    >
      {{ errorText }}
    </div>
    <EmailInput
      :label="!slim ? 'Email' : ''"
      placeholder="Email Address"
      :show-error-message="false"
      :touch-validation="touchValidation"
      @reset-touch="touchValidation = $event"
      @output="login.email = $event"
      @valid="valid.email = $event"
    />
    <PasswordInput
      :label="!slim ? 'Password' : ''"
      placeholder="Password"
      :display-validations="false"
      :suppress-criteria="true"
      :touch-validation="touchValidation"
      @reset-touch="touchValidation = $event"
      @output="login.password = $event"
      @valid="valid.password = $event"
    />
    <Checkbox
      v-if="!slim"
      input-name="rememberMe"
      :required="false"
      :custom-link="!slim"
      :options="[{ name: 'Remember Me', value: 1 }]"
      :touch-validation="touchValidation"
      @output="login.rememberMe = $event as boolean"
    >
      <RouterLink v-if="!slim" to="password-reset">Forgot Password?</RouterLink>
    </Checkbox>
    <button
      :class="[
        'btn',
        'btn-primary',
        'btn-stretch',
        'mb-0',
        slim ? 'btn-sm' : 'btn-sm sm:btn-md',
        { 'btn-loading': spinner },
      ]"
      type="submit"
    >
      Sign In
    </button>
    <div class="text-center" :class="slim ? 'mt-3' : 'mt-3 sm:mt-4'">
      <RouterLink v-if="slim" class="text-xs" to="password-reset"
        >Forgot Password?</RouterLink
      >
      <RouterLink v-else class="text-xs sm:text-sm" to="register"
        >Not signed up yet?</RouterLink
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import { Checkbox, EmailInput, PasswordInput } from '../../form';
import { LoginUIModel } from '~/utils/auth';

const { spinner } = $(useAppStore());

const auth = useAuth();
const route = useRoute();

const props = defineProps({
  slim: {
    type: Boolean,
    default: false,
  },
});

const { slim } = $(props);

const login = reactive({
  email: '',
  password: '',
  rememberMe: false,
});

const valid = reactive({
  email: false,
  password: false,
});

let error = $ref<boolean>(false);
let errorText = $ref<string>('');
let touchValidation = $ref<boolean>(false);

watch(login, (newValue) => {
  if (newValue && error) {
    error = false;
  }
});

const handleSubmit = async () => {
  if (Object.values(valid).includes(false) || error) {
    return (touchValidation = true);
  }

  try {
    const model: LoginUIModel = {
      email: login.email,
      password: login.password,
      redirect: route.query.returnUrl ? route.query.returnUrl[0] : '',
      rememberMe: slim === true ? true : login.rememberMe,
    };
    await auth.login(model);
  } catch (err) {
    error = true;
    errorText = err.message;
  }
};
</script>
