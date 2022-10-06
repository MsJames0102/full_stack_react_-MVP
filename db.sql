DROP TABLE IF EXISTS todos;

CREATE TABLE todos (
id SERIAL PRIMARY KEY,
task TEXT
);

INSERT INTO todos (task) VALUES ('Say hello');
INSERT INTO todos (task) VALUES ('Say goodbye');

-- psql tododb -f db.sql