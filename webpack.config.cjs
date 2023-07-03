const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/webpack'),
    filename: 'index.js',
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'module-federation-experiments',
      filename: 'remoteEntry.js',
      exposes: {
        './index': './src/index.js',
        './react': 'react',
        './expose-shared-eager': './src/expose-shared-eager.js'
      },
      shared: {
        react: {},
        'react-dom': {},
        uuid: {
          import: false,
        },
        'exposed-shared-eager': {
          import: './src/expose-shared-eager.js',
          eager: true
        }
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
