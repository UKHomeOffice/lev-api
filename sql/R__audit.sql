-- The API's audit table

CREATE TABLE IF NOT EXISTS lev_audit (
  id SERIAL PRIMARY KEY,
  date_time TIMESTAMP NOT NULL,
  username TEXT NOT NULL,
  client TEXT NOT NULL,
  uri TEXT NOT NULL
);

GRANT SELECT, INSERT ON lev_audit TO "${app_user}";
GRANT USAGE ON lev_audit_id_seq TO "${app_user}";
