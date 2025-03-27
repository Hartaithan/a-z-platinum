import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import { dirname } from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    ignores: [".next/**", "node_modules/**", "dist/**"],
    rules: {
      "no-console": ["error", { allow: ["info", "error", "warn"] }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "import/no-unresolved": [
        "error",
        {
          ignore: ["^@/"],
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: ["./*", "../*"],
        },
      ],
    },
  },
];

export default eslintConfig;
