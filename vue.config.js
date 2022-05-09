const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // below additionalData is important to load all global css variables into style without which shilp classes has no value
  css: {
    extract: true,
    loaderOptions: {
      sass: {
        additionalData: '@import "shilp/scss/_globals.scss"; ',
      },
    },
  },
  transpileDependencies: true,
});
