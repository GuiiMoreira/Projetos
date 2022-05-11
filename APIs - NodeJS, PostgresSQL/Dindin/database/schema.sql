CREATE DATABASE apiDindin

DROP TABLE if exists transactions;
DROP TABLE if exists users;

CREATE TABLE users (
id serial primary key,
  name text,
  email text UNIQUE,
  password text NOT null
);


CREATE TABLE transactions (
  id serial primary key,
  user_id integer,
  date date,
  week_day text,
  value integer,
  category text,
  description text,
  type text,
  foreign key (user_id) references users(id)
);








