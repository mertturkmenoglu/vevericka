const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@socheatsok78/storybook-addon-vuetify'
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.ts$/,
      loader: "ts-loader",
      options: { appendTsSuffixTo: [/\.vue$/] },
    });

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(new TsconfigPathsPlugin({}));
    return config;
  },
  "paths": {
    "@/*": [
      "src/*"
    ]
  },
}
