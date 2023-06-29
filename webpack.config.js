const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'production',
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
    new ModuleFederationPlugin({
      name: 'my-random-package',
      filename: 'my-remote-entry.js',
      exposes: {
        './index': './src/index.js',
        './react': 'react',
      },
      shared: {
        react: {},
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
  ],
};
