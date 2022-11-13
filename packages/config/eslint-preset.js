module.exports = {
  extends: ["next"],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "react/jsx-key": "off",
  },
};
