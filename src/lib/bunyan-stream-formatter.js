'use strict';

const bunyan = require('bunyan');
// formatting logging stream to comply with elasticsearch minimum requirements
const formatStream = (jsonObject) => {

    // new logging elements
    jsonObject['@timestamp'] = jsonObject.time;
    jsonObject['log.level'] = bunyan.nameFromLevel[jsonObject.level];

    // removing logging elements not required
    delete jsonObject.level;
    delete jsonObject.v;

    return jsonObject;
}

module.exports = formatStream;