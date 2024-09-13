module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "codeclimbers"],
  settings: {
    "import/resolver": {
      "typescript": {},
      "node": {
        "extensions": [".js", ".ts"],
        "paths": ["public"]
      },
      "alias": {
        "map": [
          ["@app", "./packages/app/src"]
        ]
      }
    }
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: [".eslintrc.js", "migrations", "dist"],
  rules: {
    "prettier/prettier": ["error", { semi: false, singleQuote: true, endOfLine: "auto" }],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "codeclimbers/use-code-climbers-button": "error",
  },
};