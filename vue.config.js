module.exports = {
  configureWebpack: {
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
