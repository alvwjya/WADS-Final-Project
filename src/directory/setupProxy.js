const proxy = require("http-proxy-middleware");
const { API_URL } = require('../../keys')

module.exports = function(app) {
  app.use(
    proxy(["/api", , "/otherApi"], { target: API_URL })
  );
};
