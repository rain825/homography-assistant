const path = require("path")

module.exports = {
  outputDir: path.resolve(__dirname, "../backend/dist"),
  indexPath: path.resolve(__dirname, "./src/index.html"),
  assetsDir: "static",
  chainWebpack: config => {
    const svgRule = config.module.rule("svg")

    svgRule.uses.clear()

    svgRule.use("vue-svg-loader").loader("vue-svg-loader")
  },
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "homography-assistant",
    },
  },
  devServer: {
    port: 8080,
    proxy: {
      "/api*": {
        target: "http://localhost:5000",
      },
      "/test*": {
        target: "http://localhost:5000",
      },
    },
  },
}
