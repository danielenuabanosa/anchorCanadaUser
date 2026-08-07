import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      // Data-fetch / sync-on-prop patterns in this app intentionally set state in effects.
      // Keep other react-hooks rules; this one is overly noisy for hub loaders and modals.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
