<template>
  <div :class="['input-group', { 'has-error': inputError }]">
    <label v-if="label.length > 0" :for="inputName" class="input-label">
      {{ label }}
    </label>
    <input
      ref="inputElement"
      v-model.trim="inputText"
      :type="inputType"
      :autocomplete="autoComplete"
      :disabled="disabled"
      class="input-control"
      :minlength="minLength"
      :maxlength="maxLength"
      :name="inputName"
      :placeholder="placeholder"
      spellcheck="false"
      @blur="checkBlur"
      @input="validateText"
      @keypress="validateKeypress"
    />
    <div v-if="showError" class="relative">
      <div class="text-red-default absolute top-0.5 left-0 text-xs">
        {{ error.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PHONE_INPUTS } from './form.const';

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
  forceValidation: {
    type: Boolean,
    default: false,
  },
  inputName: {
    type: String,
    default: 'text',
  },
  inputType: {
    type: String,
    default: 'text',
  },
  inputValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  maxLength: {
    type: Number,
    default: 250,
  },
  minLength: {
    type: Number,
    default: 0,
  },
  placeholder: {
    type: String,
    default: 'Text Placeholder',
  },
  required: {
    type: Boolean,
    default: true,
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
  forceValidation,
  inputName,
  inputType,
  inputValue,
  label,
  maxLength,
  minLength,
  placeholder,
  required,
  showErrorMessage,
  touchValidation,
  validateOnBlur,
} = $(props);

const error = reactive({
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

onMounted(() => {
  if (inputValue !== inputText) {
    inputText = inputValue;
    validateText();
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
    validateText();
  }
});

watch($$(required), (newValue) => {
  if (newValue === false) {
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

const checkMinLength = () => {
  if (minLength > 0) {
    error.minLength = inputText.length < minLength;

    if (error.minLength) {
      error.text = `${label} must be at least ${minLength} characters.`;
    }
  }
};

const checkRequired = () => {
  error.required = required && inputText.length === 0;

  if (error.required) {
    error.text = `${label} is required.`;
  }
};

const checkValidation = () => {
  if (disabled && !forceValidation) {
    return;
  }

  checkMinLength();
  checkRequired();

  inputError = Object.values(error).includes(true);

  emit('valid', !inputError);
};

const validateKeypress = (event: KeyboardEvent) => {
  if (inputType !== 'tel') {
    return;
  }

  if (PHONE_INPUTS.includes(event.key)) {
    return true;
  }

  return event.preventDefault();
};

const validateText = () => {
  if (disabled && !forceValidation) {
    return;
  }

  if (touchValidation) {
    emit('reset-touch', false);
  }

  checkValidation();

  emit('output', inputText);
};
</script>
