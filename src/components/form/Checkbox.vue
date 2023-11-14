<template>
  <div :class="['input-group', { 'has-error': inputError }]">
    <label v-if="showLabel" class="input-label">{{ label }}</label>
    <div
      v-for="(item, index) in options"
      :key="index"
      :class="[
        'flex',
        'items-center',
        'select-none',
        {
          'mb-1.5': index + 1 < options.length,
        },
      ]"
    >
      <input
        :id="`${inputName}_${index}`"
        v-model="checked"
        class="checkbox"
        :class="{ checked: isChecked(item) }"
        type="checkbox"
        :name="`ck_${inputName}_${index}`"
        :value="item.value"
        :disabled="disabled"
        @change="validateSelect"
      />

      <label
        :class="['checkbox-label', { 'font-semibold': isChecked(item) }]"
        :for="`${inputName}_${index}`"
      >
        <span v-if="customText">
          <slot></slot>
        </span>
        <span v-else>{{ item.name }}</span>
      </label>
      <div v-if="customLink" class="ml-auto text-xs sm:text-sm">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NameValueOption } from './form.types';
import { PropType } from 'vue';

const props = defineProps({
  customLink: {
    type: Boolean,
    default: false,
  },
  customText: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  inputName: {
    type: String,
    default: 'defaultCheckbox',
  },
  inputValue: {
    type: [Boolean, Array],
    default: null,
  },
  label: {
    type: String,
    default: '',
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
    default: false,
  },
  resetChecked: {
    type: Boolean,
    default: false,
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
  customLink,
  customText,
  disabled,
  inputName,
  inputValue,
  label,
  options,
  required,
  resetChecked,
  showLabel,
  touchValidation,
} = $(props);

const emit = defineEmits<{
  (e: 'output', value: any): void;
  (e: 'valid', value: boolean): void;
}>();

let checked = $ref<any[] | boolean>(null);
let inputError = $ref<boolean>(false);

onMounted(() => {
  init();

  if (inputValue !== null) {
    populateChecked(inputValue);
  }
});

watch($$(inputValue), (newValue) => {
  if (newValue) {
    populateChecked(newValue);
  }
});

watch($$(resetChecked), (newValue) => {
  if (newValue === true) {
    init();
  }
});

watch($$(touchValidation), (newValue) => {
  if (newValue === true) {
    checkValidation();
  }
});

const init = () => {
  checked = options.length > 1 ? [] : false;
};

const populateChecked = (inputVal: boolean | any[]) => {
  if (checked === inputVal) {
    return;
  }

  init();

  if (options.length === 1) {
    checked = !!inputVal;
  } else if (options.length > 1 && inputVal instanceof Array) {
    checked = options
      .filter((option) => inputVal.includes(option.value))
      .map((option) => option.value);
  }

  checkValidation();
};

const checkRequired = () => {
  if (!required || disabled) {
    return false;
  }

  if (checked instanceof Array) {
    return checked.length < 1;
  } else {
    return checked === false;
  }
};

const checkValidation = () => {
  inputError = checkRequired();

  emit('valid', !inputError);
};

const isChecked = (item: NameValueOption) => {
  if (checked instanceof Array) {
    return checked.findIndex((x: string | number) => x === item.value) !== -1;
  } else {
    return checked;
  }
};

const validateSelect = () => {
  if (!disabled) {
    emit('output', checked);

    checkValidation();
  }
};
</script>
