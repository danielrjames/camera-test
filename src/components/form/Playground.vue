<template>
  <div>
    <h1>This is a heading 1.</h1>
    <h2>This is a heading 2.</h2>
    <h3>This is a heading 3.</h3>
    <h4>This is a heading 4.</h4>
    <h5>This is a heading 5.</h5>
    <p>This is some paragraph text.</p>
    <h1 class="flex w-full justify-center">This is also a heading 1.</h1>
    <div class="max-w-md">
      <AppTextInput
        auto-complete="off"
        label="Custom Text"
        placeholder="Enter some custom text"
        input-name="customText"
        :input-value="customText"
        :max-length="250"
        :required="true"
        :touch-validation="touchValidation"
        @output="customText = $event"
        @reset-touch="touchValidation = $event"
        @valid="valid = $event"
      />
      <AppTextInput
        label="Custom Text 2"
        placeholder="Enter some custom text AGAIN"
        input-name="customText2"
        :input-value="customText2"
        :max-length="250"
        :required="true"
        :validate-on-blur="true"
        :touch-validation="touchValidation"
        @output="customText2 = $event"
        @reset-touch="touchValidation = $event"
        @valid="valid = $event"
      />
      <AppPasswordInput
        label="Password"
        placeholder="Password"
        :input-value="password"
        :display-validations="true"
        :suppress-errors="false"
        :touch-validation="touchValidation"
        @reset-touch="touchValidation = $event"
        @output="password = $event"
        @valid="validPass = $event"
      />
      <AppDropdown
        label="Select Operater"
        input-name="operator"
        :input-value="operator"
        :options="operatorList"
        :disabled="operatorList.length < 1"
        :show-error-message="true"
        :touch-validation="touchValidation"
        @output="operator = $event"
        @valid="opValid = $event"
      />
      <AppTextArea
        label="Notes"
        input-name="notes"
        :input-value="notes"
        :required="true"
        :max-length="250"
        :show-error-message="true"
        :touch-validation="touchValidation"
        @reset-touch="touchValidation = $event"
        @output="notes = $event"
      />
      <div>
        {{ notes }}
      </div>
    </div>
    <div class="mt-10">
      <button
        class="btn btn-primary"
        @click="touchValidation = !touchValidation"
      >
        Button
      </button>
    </div>
    <div>
      <button class="btn btn-md btn-secondary">Button</button>
    </div>
    <div><button class="btn btn-sm btn-white">Button</button></div>
    <div><button class="btn btn-xs btn-red">Button</button></div>
    <div>
      <AppCheckbox
        :show-label="true"
        label="What do you think"
        input-name="terms"
        :input-value="terms"
        :options="[
          { name: 'I agree', value: 1 },
          { name: 'I dont', value: 2 },
        ]"
        :disabled="false"
        :touch-validation="touchValidation"
        @output="terms = $event"
      />
    </div>
    <div>
      <AppRadio
        :show-label="true"
        label="Question Type"
        input-name="qType"
        :input-value="type"
        :inline="false"
        :options="typeList"
        :disabled="typeList.length < 1"
        :show-error-message="true"
        :touch-validation="touchValidation"
        @output="type = $event"
        @valid="typeValid = $event"
      />
    </div>
  </div>
</template>

<script>
import Checkbox from './Checkbox.vue';
import Dropdown from './Dropdown.vue';
import PasswordInput from './PasswordInput.vue';
import Radio from './Radio.vue';
import TextArea from './TextArea.vue';
import TextInput from './TextInput.vue';

export default {
  components: {
    appCheckbox: Checkbox,
    appDropdown: Dropdown,
    appPasswordInput: PasswordInput,
    appRadio: Radio,
    appTextArea: TextArea,
    appTextInput: TextInput,
  },
  data() {
    return {
      customText: '',
      customText2: '',
      key: true,
      notes: '',
      opValid: false,
      operator: null,
      operatorList: [
        { name: '>', value: '1' },
        { name: '<', value: '<' },
        { name: '=', value: '3' },
        { name: '>=', value: '>=' },
        { name: '<=', value: '<=' },
      ],
      password: '',
      terms: false,
      touchValidation: false,
      type: null,
      typeList: [
        { name: 'Dropdown Select', value: '1' },
        { name: 'Radio Select', value: '2' },
      ],
      typeValid: false,
      valid: false,
      validPass: false,
    };
  },

  mounted() {
    this.key = false;
  },

  methods: {
    ahoy() {
      return true;
    },

    hello() {
      this.key = true;
    },
  },
};
</script>
