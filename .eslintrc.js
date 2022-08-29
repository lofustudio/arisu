module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `@arisu/eslint`
  extends: ["custom"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
