import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import jsdoc from "eslint-plugin-jsdoc";

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      jsdoc
    },
    rules: {
      // eslint
      "no-unused-vars": "warn",
      "no-undef": "warn",

      // jsdoc
      "jsdoc/no-undefined-types": "warn"
    }
  }
];
