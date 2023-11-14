<template>
  <div :class="['input-group', { 'has-error': inputError }]">
    <label v-if="label.length > 0" :for="inputName" class="input-label">
      {{ label }}
    </label>
    <input
      ref="inputElement"
      v-model.trim="inputText"
      type="email"
      :name="inputName"
      class="input-control"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :disabled="disabled"
      :autocomplete="autoComplete"
      spellcheck="false"
      @input="validateEmail"
      @blur="checkBlur"
    />
    <div v-if="showError" class="relative">
      <div class="text-red-default absolute top-0.5 left-0 text-xs">
        {{ error.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EMAIL_ERROR_MESSAGE } from './form.const';

const props = defineProps({
  autoComplete: {
    type: String,
    default: 'on',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  focus: {
    type: Boolean,
    default: false,
  },
  inputName: {
    type: String,
    default: 'email',
  },
  inputValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Email',
  },
  maxLength: {
    type: Number,
    default: 250,
  },
  notAvailable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'Email Address',
  },
  required: {
    type: Boolean,
    default: true,
  },
  showErrorMessage: {
    type: Boolean,
    default: true,
  },
  touchValidation: {
    type: Boolean,
    default: false,
  },
  validateOnBlur: {
    type: Boolean,
    default: false,
  },
});

const {
  autoComplete,
  disabled,
  focus,
  inputName,
  inputValue,
  label,
  maxLength,
  notAvailable,
  placeholder,
  required,
  showErrorMessage,
  touchValidation,
  validateOnBlur,
} = $(props);

const error = reactive({
  maxLength: false,
  notAvailable: false,
  required: false,
  text: '',
  valid: false,
});
let inputError = $ref<boolean>(false);
let inputText = $ref<string>('');

const inputElement = $ref<HTMLElement>(null);

const showError = computed(
  () =>
    showErrorMessage && inputError && label.length > 0 && error.text.length > 0
);

const emit = defineEmits<{
  (e: 'output', value: string): void;
  (e: 'reset-touch', value: boolean): void;
  (e: 'valid', value: boolean): void;
}>();

onMounted(() => {
  if (inputValue !== inputText) {
    inputText = inputValue;
    validateEmail();
  }
});

watch(
  $$(disabled),
  (newValue) => {
    if (newValue === true && inputError) {
      inputError = false;
    }
  },
  { immediate: true }
);

watch($$(inputValue), (newValue) => {
  if (newValue !== inputText) {
    inputText = newValue;
    validateEmail();
  }
});

watch($$(notAvailable), (newValue) => {
  if (newValue === true) {
    error.notAvailable = true;
    checkValidation();
  }
});

watch($$(touchValidation), (newValue) => {
  if (newValue === true) {
    checkValidation();
  }
});

watchEffect(() => {
  if (focus && inputElement) {
    inputElement.focus();
  }
});

const checkBlur = () => {
  if (validateOnBlur) {
    checkValidation();
  }
};

const checkRequired = () => {
  error.required = required && inputText.length === 0;

  if (error.required) {
    error.text = `${label} is required.`;
  }
};

const checkValid = () => {
  if (inputText.length === 0) {
    return;
  }

  const emailRegex =
    /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

  error.valid = !emailRegex.test(inputText);

  if (error.valid) {
    error.text = EMAIL_ERROR_MESSAGE;
  }
};

const checkValidation = () => {
  if (disabled) {
    return;
  }

  checkRequired();

  checkValid();

  inputError = Object.values(error).includes(true);

  emit('valid', !inputError);
};

const validateEmail = () => {
  if (touchValidation) {
    emit('reset-touch', false);
  }

  checkValidation();

  emit('output', inputText);
};
</script>
