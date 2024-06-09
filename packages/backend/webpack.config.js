const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const glob = require('glob');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/packages/backend'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      // additionalEntryPoints: ['./src/app/data-source.ts']
    }),
  ],
  entry: {
    'data-source': {
      import: 'packages/backend/src/app/data-source.ts',
      library: {
        type: 'commonjs2',
      },
    },
    ...Object.fromEntries(
      glob.sync('packages/backend/src/app/migrations/*.ts').map((v) => [
        v.split('packages/backend/src/')[1],
        {
          import: v,
          library: {
            type: 'commonjs2',
          },
        },
      ])
    ),
  }
};
