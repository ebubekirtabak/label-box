// vue.config.js
module.exports = {
  chainWebpack: (api, config) => {
    const path = require('path');
    function resolve (dir) {
      return path.join(__dirname, dir);
    }

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => options);

    config.resolve.alias
      .set('@', resolve('src'));
  },
  configureWebpack: (api, config) => {
    const path = require('path');
    function resolve (dir) {
      return path.join(__dirname, dir);
    }

    config.resolve
      .alias
      .set('@', resolve('src'));
  },
};
