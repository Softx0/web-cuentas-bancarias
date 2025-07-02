module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    "./configs/eslint/recommended.cjs",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "jsx-a11y", "prettier", "no-only-tests"],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", {argsIgnorePattern: "^_"}],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn"
  },
  overrides: [
    {
      files: ["**/*.test.{ts,tsx,js,jsx}", "**/*.spec.{ts,tsx,js,jsx}"],
      env: {
        jest: true
      },
      rules: {
        "max-lines-per-function": "off",
        "max-statements": "off"
      }
    }
  ],
  ignorePatterns: ["dist/", "node_modules/", "build/", "*.config.js", "*.config.ts", "vite.config.ts", "tailwind.config.js", "postcss.config.js"]
};
