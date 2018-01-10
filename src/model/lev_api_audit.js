'use strict';

const db = require('../lib/db.js');

const dateFormat = 'YYYY-MM-DD';

const reduce2Object = (acc, e) => {
    acc[e.username] = acc[e.username] || {};
    acc[e.username][e.date] = e.count;
    return acc;
};

module.exports = {
    createRead: (username, client, url, systemNumber) =>
        db.none('INSERT INTO lev_api_audit (date_time, username, machine_username, urn, s_sys_num) VALUES (current_timestamp, $1, $2, $3, $4)', [username, client, url, systemNumber]),
    createSearch: (username, client, url, dob, surname, forename1, forename2, forename3, forename4) =>
        db.none('INSERT INTO lev_api_audit (date_time, username, machine_username, urn, s_dob, s_surname, s_forename1, s_forename2, s_forename3, s_forename4) VALUES (current_timestamp, $1, $2, $3, $4, $5, $6, $7, $8, $9)', [username, client, url, dob, surname, forename1, forename2, forename3, forename4]),
    search: (start, finish, username) => {
        const usernameFragment = username ? ' AND username LIKE \'%$3#%\''
                                          : '';
        return db.any('SELECT username, date_time::date AS date, count(*) AS count FROM lev_api_audit WHERE date_time >= $1 AND date_time <= $2' + usernameFragment + ' GROUP BY username, date', [start.format(dateFormat), finish.format(dateFormat), username])
            .then(r => r.reduce(reduce2Object, {}));
    }
};
