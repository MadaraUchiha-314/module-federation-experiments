const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
  {
    mode: "development",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist/webpack/one"),
      filename: "index.js",
      library: {
        type: "module",
      },
    },
    experiments: {
      outputModule: true,
    },
    devtool: "eval-source-map",
    plugins: [
      new ModuleFederationPlugin({
        shareScope: "containerOne",
        name: "module-federation-experiments-one",
        filename: "remoteEntry.js",
        exposes: {
          "./index": "./src/index.js",
          "./react": "react",
        },
        shared: {
          react: {
            // eager: true,
          },
          "react-dom": {},
          uuid: {
            import: false,
            // shareScope: "moduleScope",
          },
          lodash: {
            shareScope: "moduleContainer",
          },
        },
        /**
         * Additional stuff for webpack.
         */
        library: {
          type: "module",
        },
      }),
      new CopyPlugin({
        patterns: [{ from: "public/index.html" }],
      }),
    ],
  },
  {
    mode: "development",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist/webpack/two"),
      filename: "index.js",
      library: {
        type: "module",
      },
    },
    devtool: "eval-source-map",
    experiments: {
      outputModule: true,
    },
    plugins: [
      new ModuleFederationPlugin({
        shareScope: "containerTwo",
        name: "module-federation-experiments-two",
        filename: "remoteEntry.js",
        exposes: {
          "./index": "./src/index.js",
          "./react": "react",
        },
        shared: {
          react: {
            // eager: true,
          },
          "react-dom": {},
          uuid: {
            import: false,
            // shareScope: "moduleScope",
          },
          lodash: {
            shareScope: "moduleContainer",
          },
        },
        /**
         * Additional stuff for webpack.
         */
        library: {
          type: "module",
        },
      }),
      new CopyPlugin({
        patterns: [{ from: "public/index.html" }],
      }),
    ],
  },
];
