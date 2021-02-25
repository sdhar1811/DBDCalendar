CREATE TABLE public.event_assignee_map
(
    eventid integer NOT NULL,
    assigneeid integer,
    CONSTRAINT assigneeid FOREIGN KEY (assigneeid)
        REFERENCES public.assignee (assigneeid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT eventid FOREIGN KEY (eventid)
        REFERENCES public.event (eventid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.event_assignee_map
    OWNER to postgres;