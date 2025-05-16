import vue from 'eslint-plugin-vue'
import parser from 'vue-eslint-parser'
import * as espree from 'espree'

export default [
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: {
          js: espree
        }
      }
    },
    plugins: { vue },
    rules: {
      ...vue.configs['vue3-recommended'].rules
    }
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  }
]