<template>
  <div :class="['input-group', { 'has-error': inputError || criteriaError }]">
    <label v-if="label.length > 0" :for="inputName" class="input-label">{{
      label
    }}</label>
    <input
      ref="inputElement"
      v-model.trim="inputText"
      type="password"
      :name="inputName"
      class="input-control"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :disabled="disabled"
      :autocomplete="autoComplete"
      @input="validateText"
      @blur="checkBlur"
    />
    <div class="relative">
      <div
        v-if="showErrorMessage && inputError"
        class="text-red-default absolute top-0.5 left-0 text-xs"
      >
        {{ error.text }}
      </div>
      <div
        v-else-if="displayValidations && !suppressCriteria"
        class="mt-3 box-border grid grid-cols-2 gap-x-1 rounded border border-gray-200 bg-white p-1.5 text-xs text-gray-500 transition-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:gap-x-4 sm:px-3 sm:pt-2"
      >
        <div
          v-for="(value, index) in password"
          :key="index"
          class="truncate sm:mb-0.5"
          :class="{ 'text-gray-300 line-through': value.valid }"
        >
          {{ value.criteria }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  autoComplete: {
    type: String,
    default: 'on',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  displayValidations: {
    type: Boolean,
    default: true,
  },
  existingPassword: {
    type: String,
    default: '',
  },
  focus: {
    type: Boolean,
    default: false,
  },
  inputName: {
    type: String,
    default: 'password',
  },
  inputValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Password',
  },
  maxLength: {
    type: Number,
    default: 128,
  },
  minLength: {
    type: Number,
    default: 8,
  },
  placeholder: {
    type: String,
    default: 'Password',
  },
  required: {
    type: Boolean,
    default: true,
  },
  showErrorMessage: {
    type: Boolean,
    default: false,
  },
  suppressCriteria: {
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
  displayValidations,
  existingPassword,
  focus,
  inputName,
  inputValue,
  label,
  maxLength,
  minLength,
  placeholder,
  required,
  showErrorMessage,
  suppressCriteria,
  touchValidation,
  validateOnBlur,
} = $(props);

let criteriaError = $ref<boolean>(false);

const error = reactive({
  match: false,
  maxLength: false,
  minLength: false,
  required: false,
  text: '',
});

let inputError = $ref<boolean>(false);
let inputText = $ref<string>('');

const inputElement = $ref<HTMLElement>(null);

const password = reactive({
  lowercase: {
    criteria: 'One lowercase letter',
    valid: false,
  },
  min: {
    criteria: `At least ${minLength} characters`,
    valid: false,
  },
  number: {
    criteria: 'One number',
    valid: false,
  },
  special: {
    criteria: 'One special character',
    valid: false,
  },
  uppercase: {
    criteria: 'One uppercase letter',
    valid: false,
  },
});

const emit = defineEmits<{
  (e: 'output', value: string): void;
  (e: 'reset-touch', value: boolean): void;
  (e: 'valid', value: boolean): void;
}>();

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

const checkCriteria = () => {
  password.lowercase.valid = inputText.search(/[a-z]/) !== -1;

  password.min.valid = inputText.length >= minLength;

  password.number.valid = inputText.search(/\d/) !== -1;

  password.special.valid = inputText.search(/\W+/) !== -1;

  password.uppercase.valid = inputText.search(/[A-Z]/) !== -1;
};

const checkMatch = () => {
  if (existingPassword.length > 0) {
    error.match = inputText === existingPassword;

    if (error.match) {
      error.text = 'Passwords are the same.';
    }
  }
};

const checkMaxLength = () => {
  error.maxLength = inputText.length > maxLength;

  if (error.maxLength) {
    error.text = `${label} has a limit of ${maxLength} characters.`;
  }
};

const checkRequired = () => {
  error.required = required && inputText.length === 0;

  if (error.required) {
    error.text = `${label} is required.`;
  }
};

const checkValidation = () => {
  if (disabled) {
    return;
  }

  checkMaxLength();
  checkMatch();
  checkRequired();
  checkCriteria();

  inputError = Object.values(error).includes(true);

  const invalidCriteria = setCriteriaError();

  if (criteriaError && !invalidCriteria) {
    criteriaError = false;
  }

  emit('valid', !invalidCriteria && !inputError);
};

const setCriteriaError = () => {
  return suppressCriteria === true
    ? false
    : Object.values(password).some((c) => c.valid === false);
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
