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

ALTER TABLE ONLY public.reset_questions DROP CONSTRAINT pk_question_id;
ALTER TABLE public.reset_questions ALTER COLUMN questionid DROP DEFAULT;
DROP SEQUENCE public.reset_questions_questionid_seq;
DROP TABLE public.reset_questions;
SET default_tablespace = '';

SET default_table_access_method = heap;
CREATE TABLE public.reset_questions (
    questionid smallint NOT NULL,
    questiontext character varying(255) DEFAULT NULL::character varying
);
ALTER TABLE public.reset_questions OWNER TO postgres;
CREATE SEQUENCE public.reset_questions_questionid_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE public.reset_questions_questionid_seq OWNER TO postgres;
ALTER SEQUENCE public.reset_questions_questionid_seq OWNED BY public.reset_questions.questionid;
ALTER TABLE ONLY public.reset_questions ALTER COLUMN questionid SET DEFAULT nextval('public.reset_questions_questionid_seq'::regclass);
ALTER TABLE ONLY public.reset_questions
    ADD CONSTRAINT pk_question_id PRIMARY KEY (questionid);
