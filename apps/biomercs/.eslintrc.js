const { tsRules } = require('../../eslint-rules');

module.exports = {
  extends: ['../../.eslintrc.js'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts'],
      extends: ['plugin:@nrwl/nx/angular', 'plugin:@angular-eslint/template/process-inline-templates'],
      parserOptions: { project: ['apps/biomercs/tsconfig.*?.json'] },
      rules: {
        ...tsRules,
        '@angular-eslint/component-selector': ['off'],
        '@angular-eslint/directive-selector': ['off'],
        '@angular-eslint/directive-class-suffix': ['off'],
        '@angular-eslint/no-host-metadata-property': ['off'],
        '@angular-eslint/no-input-rename': ['off'],
        '@angular-eslint/no-inputs-metadata-property': ['off'],
        '@angular-eslint/component-max-inline-declarations': [
          'error',
          {
            animations: 20,
            styles: 8,
            template: 5,
          },
        ],
        '@angular-eslint/component-class-suffix': ['off'],
        '@angular-eslint/prefer-on-push-component-change-detection': ['warn'],
        '@angular-eslint/use-lifecycle-interface': ['warn'],
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@nrwl/nx/angular-template'],
      rules: {
        '@angular-eslint/template/no-negated-async': ['error'],
        '@angular-eslint/template/no-call-expression': ['error'],
        '@angular-eslint/template/use-track-by-function': ['error'],
      },
    },
    {
      files: ['*.spec.ts'],
      rules: {
        '@angular-eslint/component-max-inline-declarations': ['off'],
      },
    },
  ],
};
