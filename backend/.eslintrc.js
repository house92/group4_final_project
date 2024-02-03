const prettierOptions = require('./.prettierrc.js');

module.exports = {
    extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    rules: {
        'no-alert': 'warn',
        'no-debugger': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-empty-function': ['warn', { allow: ['constructors'] }],
        '@typescript-eslint/no-inferrable-types': 'off',
        'prettier/prettier': ['warn', prettierOptions],
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'eslint-plugin-prettier'],
    ignorePatterns: ['dist/**'],
};
