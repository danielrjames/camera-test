<template>
  <div :class="['input-group', { 'has-error': inputError }]">
    <label v-if="showLabel" :for="inputName" class="input-label">
      {{ label }}
    </label>
    <select
      ref="inputElement"
      v-model="selectedItem"
      class="input-control"
      :name="inputName"
      :disabled="disabled"
      @change="validateSelect"
    >
      <option class="hidden" disabled selected value></option>
      <option v-if="emptyOption !== null" :value="emptyOption.value">
        {{ emptyOption.name }}
      </option>
      <option v-for="(item, index) in options" :key="index" :value="item.value">
        {{ item.name }}
      </option>
    </select>
    <div v-if="showErrorMessage && inputError" class="relative">
      <div class="text-red-default absolute top-0.5 left-0 text-xs">
        {{ errorText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NameValueOption } from './form.types';
import { PropType } from 'vue';

const props = defineProps({
  bypassDisabled: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  emptyOption: {
    type: Object as PropType<NameValueOption>,
    default: () => null,
  },
  focus: {
    type: Boolean,
    default: false,
  },
  inputName: {
    type: String,
    default: 'defaultDropdown',
  },
  inputValue: {
    type: [Number, String],
    default: null,
  },
  label: {
    type: String,
    default: 'Default Dropdown',
  },
  options: {
    type: Array as PropType<NameValueOption[]>,
    default: () => [
      { name: 'Default Selection 1', value: 1 },
      { name: 'Default Selection 2', value: 2 },
    ],
  },
  required: {
    type: Boolean,
    default: true,
  },
  resetSelection: {
    type: Boolean,
    default: false,
  },
  showErrorMessage: {
    type: Boolean,
    default: true,
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  touchValidation: {
    type: Boolean,
    default: false,
  },
});

const {
  bypassDisabled,
  disabled,
  emptyOption,
  focus,
  inputName,
  inputValue,
  label,
  options,
  required,
  resetSelection,
  showErrorMessage,
  showLabel,
  touchValidation,
} = $(props);

const error = reactive({
  required: false,
});
let errorText = $ref<string>('');
let inputError = $ref<boolean>(false);
let selectedItem = $ref<number | string>(null);
const inputElement = $ref<HTMLElement>(null);

const emit = defineEmits<{
  (e: 'output', value: any): void;
  (e: 'reset-touch', value: boolean): void;
  (e: 'valid', value: boolean): void;
}>();

onMounted(() => {
  if (inputValue !== selectedItem && options.length > 0) {
    const foundOption = options.find((option) => option.value === inputValue);

    if (foundOption) {
      selectedItem = foundOption.value;
      validateSelect();
    }
  }
});

watch($$(inputValue), (newValue) => {
  if (newValue !== selectedItem && options.length > 0) {
    const foundOption = options.find((option) => option.value === newValue);

    if (foundOption) {
      selectedItem = foundOption.value;
      validateSelect();
    }
  }
});

watch($$(required), (newValue) => {
  if (newValue === false && error.required === true) {
    error.required = false;
    inputError = Object.values(error).includes(true);
  }
});

watch($$(resetSelection), (newValue) => {
  if (newValue === true) {
    selectedItem = null;
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

const checkRequired = () => {
  error.required = required && selectedItem === null;

  if (error.required) {
    errorText = `${label} is required.`;
  }
};

const checkValidation = () => {
  if (disabled && !bypassDisabled) {
    return;
  }

  checkRequired();

  inputError = Object.values(error).includes(true);

  emit('valid', !inputError);
};

const validateSelect = () => {
  if (disabled) {
    return;
  }

  if (touchValidation) {
    emit('reset-touch', false);
  }

  checkValidation();

  const outputValue = !inputError ? selectedItem : null;

  emit('output', outputValue);
};
</script>
