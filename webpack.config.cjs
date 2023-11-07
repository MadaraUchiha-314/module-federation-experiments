const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

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
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new ModuleFederationPlugin({
      name: 'module-federation-experiments',
      filename: 'remoteEntry.js',
      exposes: {
        './index': './src/index.js',
        './react': 'react',
      },
      shared: {
        react: {
          eager: true,
        },
        'react-dom': {},
        uuid: {
          import: false,
        },
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
