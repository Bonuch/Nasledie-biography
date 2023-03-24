const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: '/wp-content/plugins/nasledie-biography/frontend/dist',
    devServer: {
        port: 8080
    },
    transpileDependencies: true,
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/assets/style.scss";`,
            }
        }
    }
})
