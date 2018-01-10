\set app_user `echo "${APP_USER}"`

CREATE TABLE birth_registration_v0 (
  id INTEGER PRIMARY KEY,
  data JSON NOT NULL,
  forenames TEXT NOT NULL,
  surname TEXT NOT NULL,
  date_of_birth DATE NOT NULL
);

CREATE TABLE birth_registration_v1 (
  id INTEGER PRIMARY KEY,
  data JSON NOT NULL,
  forenames TEXT NOT NULL,
  surname TEXT NOT NULL,
  date_of_birth DATE NOT NULL
);

CREATE TABLE death_registration_v1 (
  id INTEGER PRIMARY KEY,
  data JSON,
  forenames TEXT NOT NULL,
  surname TEXT NOT NULL,
  date_of_birth DATE,
  date_of_death DATE NOT NULL
);

CREATE TABLE marriage_registration_v1 (
  id INTEGER PRIMARY KEY,
  data JSON NOT NULL,
  bride_forenames TEXT NOT NULL,
  bride_surname TEXT NOT NULL,
  bride_date_of_birth DATE,
  groom_forenames TEXT NOT NULL,
  groom_surname TEXT NOT NULL,
  groom_date_of_birth DATE
);

GRANT SELECT ON TABLE birth_registration_v0 TO :"app_user";
GRANT SELECT ON TABLE birth_registration_v1 TO :"app_user";
GRANT SELECT ON TABLE death_registration_v1 TO :"app_user";
GRANT SELECT ON TABLE marriage_registration_v1 TO :"app_user";
