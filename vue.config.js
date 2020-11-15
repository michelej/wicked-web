const webpack = require('webpack')
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        jQuery: 'jquery'
      })
    ],
    devtool: "source-map",
    output: {
      publicPath: "/"
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/globals.scss";`
      }
    }
  }
};
