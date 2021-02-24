CREATE TABLE public.user_profile_map
(
    userid integer NOT NULL,
    profileid integer NOT NULL,
    CONSTRAINT profileid FOREIGN KEY (profileid)
        REFERENCES public.profile (profileid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT userid FOREIGN KEY (userid)
        REFERENCES public.users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.user_profile_map
    OWNER to postgres;