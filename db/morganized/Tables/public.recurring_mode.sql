CREATE TABLE public.recurring_mode
(
    mode_id serial NOT NULL,
    mode character varying NOT NULL,
    CONSTRAINT pk_mode_id PRIMARY KEY (mode_id)
);

INSERT INTO public.recurring_mode(mode_id, mode) 
VALUES (1,'none');
INSERT INTO public.recurring_mode(mode_id, mode) 
VALUES (2,'daily');
INSERT INTO public.recurring_mode(mode_id, mode) 
VALUES (3,'weekly');
INSERT INTO public.recurring_mode(mode_id, mode) 
VALUES (4,'biweekly');
INSERT INTO public.recurring_mode(mode_id, mode) 
VALUES (5,'montly');
INSERT INTO public.recurring_mode(mode_id, mode) 
VALUES (6,'yearly');
