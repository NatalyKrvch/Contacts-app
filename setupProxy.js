const { createProxyMiddleware } = require('http-proxy-middleware')
const { CORS_PROXY_URL, API_URL } = require('./src/constants/globalConstants')

module.exports = function (app) {
  app.use(
    '/api/v1',
    createProxyMiddleware({
      target: `${CORS_PROXY_URL}${API_URL}`,
      changeOrigin: true,
    })
  )
}
