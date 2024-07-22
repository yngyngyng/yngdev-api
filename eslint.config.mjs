import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    files: ['**/*.js'],
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'no-prototype-builtins': 'off',
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es6,
      },
    },
  },
]
