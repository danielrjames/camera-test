export interface NameValueOption {
  name: string;
  value: number | string;
}

export interface CheckboxProps {
  customLink?: boolean;
  customText?: boolean;
  disabled?: boolean;
  initFilter?: boolean;
  inputName?: string;
  inputValue?: boolean | number[];
  label?: string;
  options?: NameValueOption[];
  required?: boolean;
  resetChecked?: boolean;
  showLabel?: boolean;
  touchValidation?: boolean;
}

export interface DropdownProps {
  bypassDisabled?: boolean;
  disabled?: boolean;
  emptyOption?: NameValueOption;
  focus?: boolean;
  inputName?: string;
  inputValue?: number;
  label?: string;
  options?: NameValueOption[];
  required?: boolean;
  resetSelection?: boolean;
  showErrorMessage?: boolean;
  showLabel?: boolean;
  touchValidation?: boolean;
}

export interface TextInputProps {
  autoComplete?: string;
  disabled?: boolean;
  focus?: boolean;
  forceValidation?: boolean;
  inputName?: string;
  inputType?: string;
  inputValue?: string;
  label?: string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  required?: boolean;
  showErrorMessage?: boolean;
  spellcheck?: boolean;
  touchValidation?: boolean;
  validateOnBlur?: boolean;
}
