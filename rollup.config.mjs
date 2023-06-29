import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import federation from '@originjs/vite-plugin-federation';

export default {
  output: {
    dir: 'dist/rollup',
    format: 'es',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    federation({
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
    }),
  ],
};
