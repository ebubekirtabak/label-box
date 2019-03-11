// vue.config.js
const path = require('path');

function addStyleResource (rule) {
  rule.use('sass-loader')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, '~@/renderer/assets/scss/*.scss'),
      ],
    });
}

module.exports = {
  chainWebpack: (api, config) => {
    function resolve (dir) {
      return path.join(__dirname, dir);
    }

    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)));

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => options);

    config.resolve.alias
      .set('@', resolve('src'));
  },
  lintOnSave: true,
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `
          @import "@/renderer/assets/scss/main.scss";
        `,
      },
    },
  },
  productionSourceMap: false,
};
