const path = require("path")

module.exports = {
  outputDir: path.resolve(__dirname, "../backend/dist"),
  assetsDir: "static",
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
