module.exports = {
  root: true,
  extends: ["@react-native-community", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "prettier/prettier": "error",
  },
};
