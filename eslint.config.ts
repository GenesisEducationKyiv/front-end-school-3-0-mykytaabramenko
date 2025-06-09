import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
// @ts-expect-error: no type definitions for eslint-plugin-import
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/extensions": [
        "warn",
        "never",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
);
