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

ALTER TABLE ONLY public.todo_category DROP CONSTRAINT fk_todocat_username;
ALTER TABLE ONLY public.todo_category DROP CONSTRAINT pk_category_id;
ALTER TABLE public.todo_category ALTER COLUMN category_id DROP DEFAULT;
DROP SEQUENCE public.todo_category_category_id_seq;
DROP TABLE public.todo_category;
SET default_tablespace = '';

SET default_table_access_method = heap;
CREATE TABLE public.todo_category (
    category_id bigint NOT NULL,
    username character varying(50),
    category_desc character varying(200)
);
ALTER TABLE public.todo_category OWNER TO postgres;
CREATE SEQUENCE public.todo_category_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE public.todo_category_category_id_seq OWNER TO postgres;
ALTER SEQUENCE public.todo_category_category_id_seq OWNED BY public.todo_category.category_id;
ALTER TABLE ONLY public.todo_category ALTER COLUMN category_id SET DEFAULT nextval('public.todo_category_category_id_seq'::regclass);
ALTER TABLE ONLY public.todo_category
    ADD CONSTRAINT pk_category_id PRIMARY KEY (category_id);
ALTER TABLE ONLY public.todo_category
    ADD CONSTRAINT fk_todocat_username FOREIGN KEY (username) REFERENCES public.users(username);
