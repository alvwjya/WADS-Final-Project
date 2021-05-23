const { createProxyMiddleware } = require('http-proxy-middleware');
const { API_URL } = require('./keys')

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
    })
  );
};


