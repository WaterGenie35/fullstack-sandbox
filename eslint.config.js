import js from '@eslint/js';
import globals from 'globals';

export default [
    js.configs.recommended,
   {
        languageOptions: {
                sourceType: 'module',
                globals: {
                    ...globals.browser
                }
        },
       rules: {
           'no-unused-vars': 'warn',
           'no-undef': 'warn'
       }
   }
];
