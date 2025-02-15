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
  { ignores: [".next/**", "node_modules/**", "dist/**"] },
];

export default eslintConfig;
