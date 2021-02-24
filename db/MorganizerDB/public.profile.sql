CREATE TABLE public.profile
(
    profileid integer NOT NULL,
    firstname character varying(50) COLLATE pg_catalog."default" NOT NULL,
    middlename character varying(50) COLLATE pg_catalog."default",
    lastname character varying(50) COLLATE pg_catalog."default",
    emailid character varying COLLATE pg_catalog."default" NOT NULL,
    gender character varying COLLATE pg_catalog."default",
    dob date NOT NULL,
    color character varying(10) COLLATE pg_catalog."default",
    CONSTRAINT profile_pkey PRIMARY KEY (profileid)
)

TABLESPACE pg_default;