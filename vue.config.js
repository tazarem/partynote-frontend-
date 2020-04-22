module.exports = {
  lintOnSave: false,
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: 'http://localhost:9000',
    port: 4040
  }
}
