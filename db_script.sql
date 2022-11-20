-- Database: kbgame

-- DROP DATABASE IF EXISTS kbgame;

CREATE DATABASE kbgame
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Kazakhstan.1251'
    LC_CTYPE = 'Russian_Kazakhstan.1251'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    token VARCHAR(255),
    password VARCHAR(255)
)

CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    expansion VARCHAR(255),
    MIME_TYPE VARCHAR(255),
    size VARCHAR (50),
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
)
