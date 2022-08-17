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

  // CSS Modules

  // First we prevent webpack from using Storybook CSS rules to process CSS modules
  config.module.rules.find(
    (rule) => rule.test.toString() === "/\\.css$/"
  ).exclude = /\.module\.css$/;

  // Then we tell webpack what to do with CSS modules
  config.module.rules.push({
    test: /\.module\.css$/,
    include: [
      path.resolve(__dirname, "..", "src"),
    ],
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
          modules: true,
        },
      },
    ],
  });

  return config;
};
