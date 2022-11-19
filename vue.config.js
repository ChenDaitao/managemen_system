const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "https://lianghj.top:8888",
        // pathRewrite: { "^/api/private/v1": "" },
        changeOrigin: true,
      },
    },
  },
});
