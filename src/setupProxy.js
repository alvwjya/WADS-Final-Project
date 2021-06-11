const { createProxyMiddleware } = require('http-proxy-middleware');
const { API_URL } = require('./keys')

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
    })
  );
};
