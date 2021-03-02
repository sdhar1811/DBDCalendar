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

ALTER TABLE ONLY public.event_exceptions DROP CONSTRAINT fk_event_id;
ALTER TABLE ONLY public.event_exceptions DROP CONSTRAINT pk_event_instance_ids;
ALTER TABLE public.event_exceptions ALTER COLUMN instance_id DROP DEFAULT;
DROP SEQUENCE public.event_exceptions_instance_id_seq;
DROP TABLE public.event_exceptions;
SET default_tablespace = '';

SET default_table_access_method = heap;
CREATE TABLE public.event_exceptions (
    event_id bigint NOT NULL,
    instance_id bigint NOT NULL,
    instance_date timestamp with time zone,
    is_cancelled boolean
);
ALTER TABLE public.event_exceptions OWNER TO postgres;
COMMENT ON TABLE public.event_exceptions IS 'event_id (foreign key)
instance_id (key)
instance_date - the modified date of the exception 
is_cancelled - a flag to skip this date when traversing the series
... other attributes that can be modified';
CREATE SEQUENCE public.event_exceptions_instance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE public.event_exceptions_instance_id_seq OWNER TO postgres;
ALTER SEQUENCE public.event_exceptions_instance_id_seq OWNED BY public.event_exceptions.instance_id;
ALTER TABLE ONLY public.event_exceptions ALTER COLUMN instance_id SET DEFAULT nextval('public.event_exceptions_instance_id_seq'::regclass);
ALTER TABLE ONLY public.event_exceptions
    ADD CONSTRAINT pk_event_instance_ids PRIMARY KEY (event_id) INCLUDE (event_id, instance_id);
ALTER TABLE ONLY public.event_exceptions
    ADD CONSTRAINT fk_event_id FOREIGN KEY (event_id) REFERENCES public.event_categories(event_id);
