// vue.config.js
module.exports = {
  chainWebpack: (api, config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .alias
      .set('@', api.resolve('src'))
      .tap(options => options);

    config.resolve
      .set('symlinks', false)
      .extensions
      .merge(['.js', '.jsx', '.vue', '.json'])
      .end()
      .modules
      .add('node_modules')
      .add(api.resolve('node_modules'))
      .end()
      .alias
      .set('@', api.resolve('src'));
  },
};
