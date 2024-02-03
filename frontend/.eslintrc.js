const prettierOptions = require('./.prettierrc');

module.exports = {
    extends: ['react-app', 'prettier', 'plugin:storybook/recommended'],
    plugins: ['@typescript-eslint', 'eslint-plugin-prettier'],
    rules: {
        'prettier/prettier': ['error', prettierOptions],
        'import/no-anonymous-default-export': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-empty-function': ['warn', { allow: ['constructors'] }],
        '@typescript-eslint/no-inferrable-types': 'off',
        'no-console': 'warn',
        'no-alert': 'warn',
        'no-debugger': 'warn',
    },
    overrides: [
        {
            files: ['**/*.ts?(x)'],
            rules: { 'prettier/prettier': ['warn', prettierOptions] },
        },
    ],
};
