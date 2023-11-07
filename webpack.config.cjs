const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/webpack'),
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        customVendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: 0,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'module-federation-experiments',
      filename: 'remoteEntry.js',
      exposes: {
        './index': './src/index.js',
      },
      shared: {
      },
      /**
       * Additional stuff for webpack.
       */
      library: {
        type: 'module',
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: "public/index.html" },
      ],
    }),
  ],
};
