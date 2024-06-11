const { NxWebpackPlugin } = require('@nx/webpack');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/api')
  },
  plugins: [
    new NxWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      transformers: [
        {
          name: '@nestjs/swagger/plugin',
          options: {
            dtoFileNameSuffix: ['.dto.ts'],
            controllerFileNameSuffix: '.controller.ts',
            classValidatorShim: true,
            dtoKeyOfComment: 'description',
            controllerKeyOfComment: 'summary',
            introspectComments: true
          }
        }
      ]
    })
  ]
};
