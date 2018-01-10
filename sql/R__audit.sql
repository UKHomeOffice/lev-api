-- Stuff needed for the v0 API. This file can be deleted once it is
-- decommissioned.

-- v0 Audit
CREATE TABLE IF NOT EXISTS lev_api_audit
(
id               SERIAL      PRIMARY KEY,
date_time        TIMESTAMP   NOT NULL,
username         VARCHAR(64) NOT NULL,
machine_username VARCHAR(64) NOT NULL,
s_sys_num        INTEGER,
s_surname        VARCHAR(128),
s_forename1      VARCHAR(128),
s_forename2      VARCHAR(128),
s_forename3      VARCHAR(128),
s_forename4      VARCHAR(128),
s_dob            TIMESTAMP,
s_gender         VARCHAR(13), -- FIXME: Change type to enum 'sex'
urn              VARCHAR(256) NOT NULL
);

GRANT SELECT, INSERT ON lev_api_audit TO "${app_user}";
GRANT USAGE ON lev_api_audit_id_seq TO "${app_user}";

-- v1 Audit?
CREATE TABLE IF NOT EXISTS lev_audit (
id SERIAL PRIMARY KEY,
date_time TIMESTAMP NOT NULL,
username TEXT NOT NULL,
client TEXT NOT NULL,
uri TEXT NOT NULL
);

GRANT SELECT, INSERT ON lev_audit TO "${app_user}";
GRANT USAGE ON lev_audit_id_seq TO "${app_user}";
