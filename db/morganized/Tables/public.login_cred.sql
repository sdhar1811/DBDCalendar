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

ALTER TABLE ONLY public.login_cred DROP CONSTRAINT fk_username;
ALTER TABLE ONLY public.login_cred DROP CONSTRAINT fk_questionid;
ALTER TABLE ONLY public.login_cred DROP CONSTRAINT fk_email;
ALTER TABLE ONLY public.login_cred DROP CONSTRAINT pk_login_cred_id;
DROP TABLE public.login_cred;
SET default_tablespace = '';

SET default_table_access_method = heap;
CREATE TABLE public.login_cred (
    logincredid smallint NOT NULL,
    username character varying(50) NOT NULL,
    email public.citext NOT NULL,
    salt text NOT NULL,
    passhash text NOT NULL,
    questionid integer,
    answer text
);
ALTER TABLE public.login_cred OWNER TO postgres;
ALTER TABLE ONLY public.login_cred
    ADD CONSTRAINT pk_login_cred_id PRIMARY KEY (logincredid);
ALTER TABLE ONLY public.login_cred
    ADD CONSTRAINT fk_email FOREIGN KEY (email) REFERENCES public.users(email) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.login_cred
    ADD CONSTRAINT fk_questionid FOREIGN KEY (questionid) REFERENCES public.reset_questions(questionid) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.login_cred
    ADD CONSTRAINT fk_username FOREIGN KEY (username) REFERENCES public.users(username) ON UPDATE CASCADE ON DELETE CASCADE;
