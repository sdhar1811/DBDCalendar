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

ALTER TABLE ONLY public.roles DROP CONSTRAINT pk_role_id;
ALTER TABLE public.roles ALTER COLUMN roleid DROP DEFAULT;
DROP SEQUENCE public.roles_roleid_seq;
DROP TABLE public.roles;
SET default_tablespace = '';

SET default_table_access_method = heap;
CREATE TABLE public.roles (
    roleid smallint NOT NULL,
    roletype character varying(50) NOT NULL
);
ALTER TABLE public.roles OWNER TO postgres;
CREATE SEQUENCE public.roles_roleid_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE public.roles_roleid_seq OWNER TO postgres;
ALTER SEQUENCE public.roles_roleid_seq OWNED BY public.roles.roleid;
ALTER TABLE ONLY public.roles ALTER COLUMN roleid SET DEFAULT nextval('public.roles_roleid_seq'::regclass);
ALTER TABLE ONLY public.roles
    ADD CONSTRAINT pk_role_id PRIMARY KEY (roleid);
