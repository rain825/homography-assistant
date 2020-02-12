module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "prettier"],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        semi: false,
        trailingComma: "es5",
      },
    ],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "warn",
  },
  parserOptions: {
    parser: "babel-eslint",
  },
}
