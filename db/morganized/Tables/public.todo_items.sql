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

ALTER TABLE ONLY public.todo_items DROP CONSTRAINT fk_items_category_id;
ALTER TABLE ONLY public.todo_items DROP CONSTRAINT pk_item_id;
ALTER TABLE public.todo_items ALTER COLUMN item_id DROP DEFAULT;
DROP SEQUENCE public.todo_items_item_id_seq;
DROP TABLE public.todo_items;
SET default_tablespace = '';

SET default_table_access_method = heap;
CREATE TABLE public.todo_items (
    item_id bigint NOT NULL,
    category_id bigint,
    item_desc text,
    due_date timestamp with time zone,
    url text,
    repeat_type character varying(100),
    complete boolean
);
ALTER TABLE public.todo_items OWNER TO postgres;
CREATE SEQUENCE public.todo_items_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE public.todo_items_item_id_seq OWNER TO postgres;
ALTER SEQUENCE public.todo_items_item_id_seq OWNED BY public.todo_items.item_id;
ALTER TABLE ONLY public.todo_items ALTER COLUMN item_id SET DEFAULT nextval('public.todo_items_item_id_seq'::regclass);
ALTER TABLE ONLY public.todo_items
    ADD CONSTRAINT pk_item_id PRIMARY KEY (item_id);
ALTER TABLE ONLY public.todo_items
    ADD CONSTRAINT fk_items_category_id FOREIGN KEY (category_id) REFERENCES public.todo_category(category_id);
