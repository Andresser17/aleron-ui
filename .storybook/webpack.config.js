const path = require("path");

module.exports = ({ config }) => {
  config.resolve.modules = [
    path.resolve(__dirname, "..", "src"),
    "node_modules",
  ];

  // Disable the Storybook internal-`.svg`-rule for components loaded from our app.
  const fileLoaderRule = config.module.rules.find(
    (rule) => rule.test && rule.test.test(".svg")
  );
  fileLoaderRule.exclude = /\.svg$/;
  config.module.rules.push({
    test: /\.svg$/,
    use: ["@svgr/webpack", "url-loader"],
  });

  return config;
};
