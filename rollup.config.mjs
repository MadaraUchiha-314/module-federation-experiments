import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import federation from '@originjs/vite-plugin-federation';
import copy from 'rollup-plugin-copy';

const outputDir = 'dist/rollup';

export default {
  output: {
    dir: outputDir,
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
    copy({
      targets: [
        {
          src: './public/index.html',
          dest: outputDir,
        }
      ]
    })
  ],
};
