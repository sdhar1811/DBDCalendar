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

ALTER TABLE ONLY public.event_categories DROP CONSTRAINT pk_event_id;
ALTER TABLE public.event_categories ALTER COLUMN event_id DROP DEFAULT;
DROP SEQUENCE public.event_categories_event_id_seq;
DROP TABLE public.event_categories;
SET default_tablespace = '';

SET default_table_access_method = heap;
CREATE TABLE public.event_categories (
    event_id bigint NOT NULL,
    event_desc text,
    start_date timestamp with time zone,
    period_type character varying,
    period_freq integer,
    end_date timestamp with time zone,
    notification_type character varying,
    event_category character varying
);
ALTER TABLE public.event_categories OWNER TO postgres;
COMMENT ON TABLE public.event_categories IS 'event_id (primary key)
event_description
start_date
period_type - days, weeks, months, years
period_freq - # of days, weeks, etc between events
end_date
notification_type 
event_category
... other attributes that can be modified';
CREATE SEQUENCE public.event_categories_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE public.event_categories_event_id_seq OWNER TO postgres;
ALTER SEQUENCE public.event_categories_event_id_seq OWNED BY public.event_categories.event_id;
ALTER TABLE ONLY public.event_categories ALTER COLUMN event_id SET DEFAULT nextval('public.event_categories_event_id_seq'::regclass);
ALTER TABLE ONLY public.event_categories
    ADD CONSTRAINT pk_event_id PRIMARY KEY (event_id);
