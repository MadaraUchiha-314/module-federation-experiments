import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import federation from '@originjs/vite-plugin-federation';
import copy from 'rollup-plugin-copy';
import pkgJson from './package.json' assert { type: "json" };

const outputDir = 'dist/rollup';

export default {
  input: {
    'index': './src/index.js',
    'something': './src/something.js'
  },
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
        // NOTE: rollup's federation is not allowing to do this. 
        // I think its beacuse of the order in which the federation plugin does things.
        // https://github.com/originjs/vite-plugin-federation/blob/main/packages/lib/src/index.ts#L56-L58
        // 'module-federation-experiments/something': {
        //   import: './src/something.js',
        //   version: pkgJson.version,
        // },
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
