import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import federation from '@originjs/vite-plugin-federation';
import copy from 'rollup-plugin-copy';

const outputDir = 'dist/rollup';

export default {
  input: './src/index.js',
  output: {
    dir: outputDir,
    format: 'es',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    federation({
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
        'react-dom': {
          shareScope: 'custom1'
        },
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
