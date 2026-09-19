// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      // Vue
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],

      // General JS/TS
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off', // handled by @typescript-eslint if TS is used
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],

      // Import ordering (optional, comment out if not needed)
      'sort-imports': ['warn', { ignoreDeclarationSort: true }]
    }
  },
  {
    // Ignore build artifacts and generated files
    ignores: ['.nuxt/**', '.output/**', 'dist/**', 'node_modules/**']
  }
)