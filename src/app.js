'use strict';

const config = require('../config.js');
const log = require('./lib/logger');
const healthCheck = require('./middleware/health-check');
const v0Birth = require('./middleware/api/v0/events/birth');
const v0UserActivity = require('./middleware/api/v0/audit/user-activity');
const v1Birth = require('./middleware/v1/registration/birth');
const v1Death = require('./middleware/v1/registration/death');
const v1Marriage = require('./middleware/v1/registration/marriage');
const restify = require('restify');
const restifyBunyanLogger = require('restify-bunyan-logger');

process.title = config.name.replace(/[^\w]/gi, '').substr(0, 6);

const httpd = restify.createServer({
  log: log,
  name: config.name
});

httpd.use(restify.plugins.requestLogger({
  headers: [
    'x-auth-aud',
    'x-auth-username'
  ]
}));
httpd.use(restify.plugins.acceptParser(httpd.acceptable));
httpd.use(restify.plugins.queryParser({ mapParams: false }));
httpd.use(restify.plugins.fullResponse());
httpd.use((req, res, next) => {
  res.cache('no-cache; no-store');
  res.header('Pragma', 'no-cache');
  res.header('X-Frame-Options', 'DENY');
  next();
});
httpd.on('after', restifyBunyanLogger());

httpd.get('/healthz', healthCheck.liveness);
httpd.get('/readiness', healthCheck.readiness);
httpd.get('/api/v0/events/birth/:id', v0Birth.read);
httpd.get('/api/v0/events/birth', v0Birth.search);
httpd.get('/api/v0/audit/user-activity', v0UserActivity.search);
httpd.get('/v1/registration/birth/:id', v1Birth.read);
httpd.get('/v1/registration/birth', v1Birth.search);
httpd.get('/v1/registration/death/:id', v1Death.read);
httpd.get('/v1/registration/death', v1Death.search);
httpd.get('/v1/registration/marriage/:id', v1Marriage.read);
httpd.get('/v1/registration/marriage', v1Marriage.search);

httpd.listen(config.httpd.port, config.httpd.host, () => {
  log.info('%s listening at %s', httpd.name, httpd.url);
});
