const sass = require('@stencil/sass');

exports.config = {
  bundles: [
    { components: ['cloudinary-video'] }
  ],
  collections: [
    { name: '@stencil/router' }
  ],
  plugins: [
    sass()
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
