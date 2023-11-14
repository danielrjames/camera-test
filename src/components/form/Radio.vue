<template>
  <div :class="['input-group', { 'has-error': inputError }]">
    <label v-if="showLabel" class="input-label">{{ label }}</label>
    <div :class="{ 'flex items-center space-x-4': inline }">
      <div
        v-for="(item, index) in options"
        :key="index"
        :class="[
          'items-center',
          {
            'inline-flex': inline,
            flex: !inline,
            'mb-1.5': !inline && index + 1 < options.length,
          },
        ]"
      >
        <input
          :id="`${inputName}_${index}`"
          v-model="selected"
          class="radio"
          :class="{ selected: isSelected(item) }"
          type="radio"
          :name="`rd_${inputName}_${index}`"
          :value="item.value"
          :disabled="disabled"
          @change="validateSelect"
        />
        <label
          :class="['radio-label', { 'font-semibold': isSelected(item) }]"
          :for="`${inputName}_${index}`"
          >{{ item.name }}</label
        >
      </div>
      <div v-if="showError" class="relative">
        <div class="text-red-default absolute top-0.5 left-0 text-xs">
          {{ error.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NameValueOption } from './form.types';
import { PropType } from 'vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  inputName: {
    type: String,
    default: 'defaultRadio',
  },
  inputValue: {
    type: Number,
    default: null,
  },
  label: {
    type: String,
    default: 'Default Radio',
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
  disabled,
  inline,
  inputName,
  inputValue,
  label,
  options,
  required,
  showErrorMessage,
  touchValidation,
} = $(props);

const error = reactive({
  required: false,
  text: '',
});
let inputError = $ref<boolean>(false);
let selected = $ref<number | string>(null);

const showError = computed(
  () =>
    showErrorMessage && inputError && label.length > 0 && error.text.length > 0
);

const emit = defineEmits<{
  (e: 'output', value: number | string): void;
  (e: 'reset-touch', value: boolean): void;
  (e: 'valid', value: boolean): void;
}>();

watch(
  $$(inputValue),
  (newValue) => {
    if (newValue !== selected && options.length > 0) {
      const foundOption = options.find((option) => option.value === newValue);

      if (foundOption) {
        selected = foundOption.value;
        checkValidation();
      }
    }
  },
  { immediate: true }
);

watch($$(touchValidation), (newValue) => {
  if (newValue === true) {
    checkValidation();
  }
});

const checkRequired = () => {
  error.required = required && selected === null;

  if (error.required) {
    error.text = `${label} is required.`;
  }
};

const checkValidation = () => {
  if (disabled) {
    return;
  }

  checkRequired();

  inputError = Object.values(error).includes(true);

  emit('valid', !inputError);
};

const isSelected = (item: NameValueOption) => {
  return item.value === selected;
};

const validateSelect = () => {
  if (disabled) {
    return;
  }

  checkValidation();

  if (selected !== null) {
    emit('output', selected);
  }
};
</script>
