<template>
  <div :class="['input-group', { 'has-error': inputError }]">
    <label v-if="label.length > 0" :for="inputName" class="input-label">
      {{ label }}
    </label>
    <textarea
      ref="inputElement"
      v-model.trim="inputText"
      :name="inputName"
      class="input-control"
      :rows="rows"
      :maxlength="maxLength"
      :disabled="disabled"
      :autocomplete="autoComplete"
      @input="validateText"
      @blur="checkBlur"
    ></textarea>
    <div class="relative -mt-1">
      <div
        v-if="showError"
        class="text-red-default absolute top-0 left-0 text-xs"
      >
        {{ error.text }}
      </div>
      <div
        :class="[
          'absolute',
          'top-0',
          'right-0',
          'text-xs',
          { 'text-red-default': inputError },
        ]"
      >
        {{ inputText.length }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  autoComplete: {
    type: String,
    default: 'off',
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
    default: 'textarea',
  },
  inputValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Default Text Area',
  },
  maxLength: {
    type: Number,
    default: 300,
  },
  minLength: {
    type: Number,
    default: 0,
  },
  required: {
    type: Boolean,
    default: true,
  },
  rows: {
    type: Number,
    default: 3,
  },
  showErrorMessage: {
    type: Boolean,
    default: false,
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
  minLength,
  required,
  rows,
  showErrorMessage,
  touchValidation,
  validateOnBlur,
} = $(props);

const error = reactive({
  maxLength: false,
  minLength: false,
  required: false,
  text: '',
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

watch(
  $$(disabled),
  (newValue) => {
    if (newValue === true && inputError) {
      inputError = false;
    }
  },
  { immediate: true }
);

watch(
  $$(inputValue),
  (newValue) => {
    if (newValue !== inputText) {
      inputText = newValue;
      validateText();
    }
  },
  { immediate: true }
);

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

const checkMaxLength = () => {
  error.maxLength = inputText.length > maxLength;

  if (error.maxLength) {
    error.text = `${label} has a limit of ${maxLength} characters.`;
  }
};

const checkMinLength = () => {
  if (minLength > 0) {
    error.minLength = inputText.length < minLength;

    if (error.minLength) {
      error.text = `${label} must be at least ${minLength} characters.`;
    }
  }
};

const checkRequired = () => {
  error.required = required && !(inputText.length > 0);

  if (error.required) {
    error.text = `${label} is required.`;
  }
};

const checkValidation = () => {
  if (disabled) {
    return;
  }

  checkMaxLength();
  checkMinLength();
  checkRequired();

  inputError = Object.values(error).includes(true);

  emit('valid', !inputError);
};

const validateText = () => {
  if (disabled) {
    return;
  }

  if (touchValidation) {
    emit('reset-touch', false);
  }

  checkValidation();

  emit('output', inputText);
};
</script>
