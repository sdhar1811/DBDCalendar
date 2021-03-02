CREATE TABLE public.events
(
    event_id bigserial NOT NULL,
    user_id integer NOT NULL,
    event_title character varying NOT NULL,
    event_description text,
    event_start_time timestamp with time zone,
    event_end_time timestamp with time zone,
    event_recurring_mode integer DEFAULT 1,
    event_location character varying,
    event_participant character varying[],
    CONSTRAINT pk_event_id PRIMARY KEY (event_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_recurring_mode FOREIGN KEY (event_recurring_mode)
        REFERENCES public.recurring_mode (mode_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
