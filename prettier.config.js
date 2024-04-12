import Config from "prettier";

/** @type {Config} */
const config = {
  semi: true,
  trailingComma: "none",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: ["<BUILT_IN_MODULES>", "", "<THIRD_PARTY_MODULES>", "", "^[.]"]
};

export default config;
