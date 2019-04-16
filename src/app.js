'use strict';

const config = require('../config.js');
const httpd = require('./lib/httpd');
const readiness = require('./middleware/readiness');
const v0Birth = require('./middleware/api/v0/events/birth');
const v0UserActivity = require('./middleware/api/v0/audit/user-activity');
const v1Birth = require('./middleware/v1/registration/birth');
const v1Death = require('./middleware/v1/registration/death');
const v1Marriage = require('./middleware/v1/registration/marriage');
const v1Partnership = require('./middleware/v1/registration/partnership');

process.title = config.name.replace(/[^\w]/gi, '').substr(0, 6);

httpd.get('/readiness', readiness);
httpd.get('/api/v0/events/birth/:id', v0Birth.read);
httpd.get('/api/v0/events/birth', v0Birth.search);
httpd.get('/api/v0/audit/user-activity', v0UserActivity.search);
httpd.get('/v1/registration/birth/:id', v1Birth.read);
httpd.get('/v1/registration/birth', v1Birth.search);
httpd.get('/v1/registration/death/:id', v1Death.read);
httpd.get('/v1/registration/death', v1Death.search);
httpd.get('/v1/registration/marriage/:id', v1Marriage.read);
httpd.get('/v1/registration/marriage', v1Marriage.search);
httpd.get('/v1/registration/partnership/:id', v1Partnership.read);
httpd.get('/v1/registration/partnership', v1Partnership.search);

httpd.listen(config.httpd.port, config.httpd.host, () => {
  httpd.log.info('%s listening at %s', httpd.name, httpd.url);
});
