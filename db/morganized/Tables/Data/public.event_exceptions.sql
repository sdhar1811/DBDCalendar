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
COPY public.event_exceptions (event_id, instance_id, instance_date, is_cancelled) FROM stdin;
\.
SELECT pg_catalog.setval('public.event_exceptions_instance_id_seq', 1, false);
