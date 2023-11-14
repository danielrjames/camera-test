<template>
  <form
    class="grid grid-cols-2 gap-x-4 sm:gap-x-5"
    @submit.prevent="handleSubmit"
  >
    <div v-if="error" class="auth-frame-message text-red-default col-span-2">
      {{ errorText }}
    </div>
    <TextInput
      :class="['col-span-1']"
      :show-label="!slim"
      label="First Name"
      placeholder="First Name"
      input-name="firstName"
      :touch-validation="touchValidation"
      @output="register.firstName = $event"
      @reset-touch="touchValidation = $event"
      @valid="valid.firstName = $event"
    />
    <TextInput
      :class="['col-span-1']"
      :show-label="!slim"
      label="Last Name"
      placeholder="Last Name"
      input-name="lastName"
      :touch-validation="touchValidation"
      @output="register.lastName = $event"
      @reset-touch="touchValidation = $event"
      @valid="valid.lastName = $event"
    />
    <EmailInput
      :class="'col-span-2'"
      :show-label="!slim"
      label="Email"
      placeholder="Email Address"
      :show-error-message="false"
      :touch-validation="touchValidation"
      @reset-touch="touchValidation = $event"
      @output="register.email = $event"
      @valid="valid.email = $event"
    />
    <PasswordInput
      :class="'col-span-2'"
      :show-label="!slim"
      label="Password"
      placeholder="Password"
      :touch-validation="touchValidation"
      @reset-touch="touchValidation = $event"
      @output="register.password = $event"
      @valid="valid.password = $event"
    />
    <Checkbox
      :class="'col-span-2'"
      :show-label="false"
      input-name="consent"
      :required="true"
      :custom-text="true"
      :options="[{ name: 'consent', value: 1 }]"
      :touch-validation="touchValidation"
      @output="register.consent = $event as boolean"
      @valid="valid.consent = $event"
    >
      <span>I agree to the </span>
      <RouterLink :to="{ name: 'terms-of-use' }">Terms</RouterLink>
      <span> and </span>
      <RouterLink :to="{ name: 'privacy' }">Privacy Policy</RouterLink>
    </Checkbox>

    <div class="col-span-2">
      <button
        :class="[
          'btn',
          'btn-primary',
          'btn-stretch',
          'mb-0',
          'btn-sm sm:btn-md',
          { 'btn-loading': spinner && !navDropdown },
        ]"
        type="submit"
      >
        Register
      </button>
    </div>
    <div class="col-span-2 mt-3 text-center sm:mt-4">
      <RouterLink class="text-xs sm:text-sm" to="sign-in"
        >Already have an account?</RouterLink
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import { RegisterUIModel } from '~/utils/auth';

const { navDropdown, spinner } = $(useAppStore());

const auth = useAuth();
const route = useRoute();

const props = defineProps({
  slim: {
    type: Boolean,
    default: false,
  },
});

const { slim } = $(props);

const register = reactive({
  consent: false,
  email: '',
  firstName: '',
  lastName: '',
  password: '',
});

const valid = reactive({
  consent: false,
  email: false,
  firstName: false,
  lastName: false,
  password: false,
});

let error = $ref<boolean>(false);
let errorText = $ref<string>('');
let touchValidation = $ref<boolean>(false);

watch(
  register,
  (newValue) => {
    if (newValue && error) {
      error = false;
    }
  },
  { deep: true }
);

const handleSubmit = async () => {
  if (Object.values(valid).includes(false) || error) {
    return (touchValidation = true);
  }

  try {
    const model: RegisterUIModel = {
      email: register.email,
      firstName: register.firstName,
      lastName: register.lastName,
      password: register.password,
      redirect: route.query.returnUrl ? route.query.returnUrl[0] : '',
    };

    await auth.register(model);
  } catch (err) {
    error = true;
    errorText = err.message;
  }
};
</script>
