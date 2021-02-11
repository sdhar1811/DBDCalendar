SET schema 'public';
 
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.users DROP CONSTRAINT fk_role_id;
DROP INDEX public.uq_idx_username;
DROP INDEX public.uq_idx_email;
ALTER TABLE ONLY public.users DROP CONSTRAINT uq_username;
ALTER TABLE ONLY public.users DROP CONSTRAINT uq_email;
ALTER TABLE ONLY public.users DROP CONSTRAINT pk_userid;
ALTER TABLE public.users ALTER COLUMN userid DROP DEFAULT;
DROP SEQUENCE public.users_userid_seq;
DROP TABLE public.users;
SET default_tablespace = '';

SET default_table_access_method = heap;
CREATE TABLE public.users (
    userid integer NOT NULL,
    firstname character varying(50) NOT NULL,
    middlename character varying(50) DEFAULT NULL::character varying,
    lastname character varying(50) DEFAULT NULL::character varying,
    username character varying(50) NOT NULL,
    mobile character varying(15) DEFAULT NULL::character varying,
    email public.citext NOT NULL,
    lastlogin timestamp with time zone,
    additionalinfo text,
    roleid smallint DEFAULT 1 NOT NULL
);
ALTER TABLE public.users OWNER TO postgres;
CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE public.users_userid_seq OWNER TO postgres;
ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;
ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_userid PRIMARY KEY (userid);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT uq_email UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT uq_username UNIQUE (username);
CREATE UNIQUE INDEX uq_idx_email ON public.users USING btree (email public.citext_pattern_ops);
CREATE UNIQUE INDEX uq_idx_username ON public.users USING btree (username varchar_ops);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_role_id FOREIGN KEY (roleid) REFERENCES public.roles(roleid) NOT VALID;
