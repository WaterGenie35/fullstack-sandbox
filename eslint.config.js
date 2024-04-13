import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: [ "**/*.js" ],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      jsdoc
    },

    /**
     * TODO: go through https://eslint.style/rules
     * - re-categorise
     * - make current defaults explicit (protect against changing defaults when updating)
     */
    rules: {
      // Code quality
      "no-unused-vars": [ "error", { "argsIgnorePattern": "next" } ],
      "no-undef": "error",

      // Misc.
      "comma-dangle": "error",
      "comma-style": "error",
      "dot-location": [ "error", "property" ],
      "jsx-quotes": "off", // in favour of not changing quotes based on content (least escape rule)
      "linebreak-style": "error",
      "max-statements-per-line": "error",
      "new-parens": "error",
      "no-confusing-arrow": "error",
      "no-extra-parens": "error",
      "no-extra-semi": "error",
      "no-floating-decimal": "error",
      "no-mixed-operators": "error",
      "no-mixed-spaces-and-tabs": "error",
      "quotes": "off", // in favour of single quote iff syntax-sensitive string
      "semi": "error",
      "wrap-iife": "error",
      "wrap-regex": "error",

      // Spacing
      "array-bracket-spacing": [ "error", "always" ],
      "arrow-spacing": "error",
      "block-spacing": "error",
      "comma-spacing": "error",
      "computed-property-spacing": "error",
      "eol-last": "error",
      "func-call-spacing": "error",
      "generator-star-spacing": "error",
      "implicit-arrow-linebreak": "error",
      "indent": [ "error", 2 ],
      "key-spacing": "error",
      "keyword-spacing": "error",
      "lines-around-comment": [ "error", { "beforeBlockComment": true, "allowBlockStart": true } ],
      "lines-between-class-members": [ "error", { enforce: [
        { blankLine: "always", prev: "field", next: "method" }
      ] } ],
      "max-len": [ "error", {
        "code": 120,
        "tabWidth": 2,
        "ignoreComments": true,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true
      } ],
      "no-multi-spaces": "error",
      "no-multiple-empty-lines": [ "error", { "max": 5, "maxEOF": 0, "maxBOF": 0 } ], // results in exactly 1 empty line EOF with eol-last rule
      "no-trailing-spaces": "error",
      "no-whitespace-before-property": "error",
      "object-curly-spacing": [ "error", "always" ],
      "operator-linebreak": "error",
      "rest-spread-spacing": "error",
      "space-before-blocks": "error",
      "space-before-function-paren": "error",
      "space-infix-ops": "error",
      "space-unary-ops": "error",
      "spaced-comment": "error",
      "switch-colon-spacing": "error",
      "template-curly-spacing": "error",
      "template-tag-spacing": "error",
      "yield-star-spacing": "error",

      // jsdoc
      "jsdoc/no-undefined-types": "error"
    }
  }
];
