<template>
  <form @submit.prevent="handleSubmit">
    <div
      v-if="showMessage"
      :class="[
        'auth-frame-message',
        {
          'text-green-default': result.success,
          'text-red-default': result.error,
        },
      ]"
    >
      {{ messageText }}
    </div>
    <EmailInput
      :show-label="!slim"
      label="Email"
      placeholder="Email Address"
      :show-error-message="false"
      :touch-validation="touchValidation"
      @reset-touch="touchValidation = $event"
      @output="reset.email = $event"
      @valid="valid.email = $event"
    />

    <button
      :class="[
        'btn',
        'btn-primary',
        'btn-stretch',
        'mb-0',
        'btn-sm sm:btn-md',
        { 'btn-loading': spinner },
      ]"
      type="submit"
    >
      Reset Password
    </button>
    <div class="mt-3 text-center sm:mt-4">
      <RouterLink class="text-xs sm:text-sm" to="sign-in"
        >Back to Sign In</RouterLink
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import { EmailInput } from '../../form';
import { PasswordResetUIModel } from '~/utils/auth';

const { spinner } = $(useAppStore());

const auth = useAuth();

const props = defineProps({
  slim: {
    type: Boolean,
    default: false,
  },
});

const { slim } = $(props);
let messageText = $ref<string>('');

const reset = reactive({ email: '' });
const valid = reactive({
  email: false,
});
const result = reactive({
  error: false,
  success: false,
});
let touchValidation = $ref<boolean>(false);

const showMessage = $computed(() => Object.values(result).includes(true));

watch(reset, (newValue) => {
  if (newValue && showMessage) {
    updateResult();
  }
});

const handleSubmit = async () => {
  if (
    Object.values(valid).includes(false) ||
    Object.values(result).includes(true)
  ) {
    return (touchValidation = true);
  }

  try {
    const model: PasswordResetUIModel = {
      email: reset.email,
    };

    await auth.passwordReset(model);

    const msg = 'Reset instructions have been emailed.';

    updateResult('success', true, msg);
  } catch (err) {
    updateResult('error', true, err.message);
  }
};

const updateResult = (setKey = null, result = false, message = '') => {
  Object.keys(result).forEach(
    (key) => (result[key] = key === setKey ? result : false)
  );

  messageText = message;
};
</script>
