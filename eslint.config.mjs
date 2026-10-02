import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Next.js generated files
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    // iOS generated files
    "ios/App/App/public/_next/**",

    // Android generated files
    "android/app/src/main/assets/public/_next/**",
    "android/app/build/**",
  ]),
]);

export default eslintConfig;