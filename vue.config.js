const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '',
  devServer: {
    //allowedHosts: ['https://ftmbe.herokuapp.com']
    //proxy: 'https://ftmbe.herokuapp.com/public/login',
    proxy: {
      '/public': {
        target: 'https://ftmbe.herokuapp.com/public'//,
        //pathRewrite: { '^/public': '' },
      }
    },
  }
})
