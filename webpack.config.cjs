const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const CopyPlugin = require("copy-webpack-plugin");
const pkgJson = require('./package.json');

module.exports = {
  mode: 'development',
  entry: {
    'index': path.resolve(__dirname, 'src/index.js'),
    'something': path.resolve(__dirname, 'src/something.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist/webpack'),
    filename: '[name].js',
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
        './something': './src/something.js'
      },
      shared: {
        react: {
          eager: true,
        },
        'react-dom': {},
        uuid: {
          import: false,
        },
        'module-federation-experiments/something': {
          import: './src/something.js',
          version: pkgJson.version,
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
