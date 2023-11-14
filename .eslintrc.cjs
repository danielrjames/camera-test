/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  globals: {
    $ref: 'readonly',
    $computed: 'readonly',
    $shallowRef: 'readonly',
    $customRef: 'readonly',
    $toRef: 'readonly',
    $: 'readonly',
    $$: 'readonly',
  },
  overrides: [
    {
      files: ['cypress/integration/**.spec.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
    {
      files: ['*.html'],
      rules: {
        'vue/comment-directive': 0,
      },
    },
    {
      files: ['*.vue'],
      rules: {
        'no-const-assign': 0,
        'no-undef': 0,
        'no-unused-vars': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        semi: 0,
        'prettier/prettier': 0,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['vue', '@typescript-eslint', 'sort-imports-es6-autofix'],
  rules: {
    'import/order': 0,
    'newline-before-return': 'error',
    'no-console': 'warn',
    'no-multi-spaces': ['error'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: '*',
        prev: 'block-like',
      },
      {
        blankLine: 'always',
        next: 'block-like',
        prev: '*',
      },
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'sort-imports-es6-autofix/sort-imports-es6': [
      2,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-explicit-any': 0,
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
        ignores: [],
      },
    ],
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'route', 'style'],
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'any',
          component: 'always',
        },
      },
    ],
    'vue/multi-word-component-names': 0,
    'vue/no-multiple-template-root': 0,
    'vue/no-setup-props-destructure': 'off',
    'vue/no-v-html': 0,
    'vue/padding-line-between-blocks': ['error', 'always'],
  },
};
