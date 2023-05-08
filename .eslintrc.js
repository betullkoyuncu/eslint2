module.exports = {
  settings: {
    node: {
      allowModules: ["electron"],
      resolvePaths: [__dirname],
      tryExtensions: [".js", ".json", ".node"],
    },
    extends: ["eslint:recommended"],
    parser: "@babel/eslint-parser",
    plugins: ["@typescript-eslint"],
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module",

      rules: {
        quotes: ["error", "single"],
        "no-console": "off",
        semi: "off",
        "node/no-missing-import": "error",
      },
    },
  },
};



