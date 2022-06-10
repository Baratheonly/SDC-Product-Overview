DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

\c products;

CREATE TABLE IF NOT EXISTS public.products
(
    id integer NOT NULL DEFAULT nextval('"Products_id_seq"'::regclass),
    name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    slogan character varying(200) COLLATE pg_catalog."default" NOT NULL,
    description character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    category character varying(60) COLLATE pg_catalog."default" NOT NULL,
    default_price numeric NOT NULL,
    CONSTRAINT "Products_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;



CREATE TABLE IF NOT EXISTS public.styles
(
    id integer NOT NULL DEFAULT nextval('styles_id_seq'::regclass),
    "productId" integer NOT NULL,
    name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    default_style boolean NOT NULL,
    original_price character varying(10) COLLATE pg_catalog."default" NOT NULL,
    sale_price character varying(10) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    CONSTRAINT styles_pkey PRIMARY KEY (id),
    CONSTRAINT "productId" FOREIGN KEY ("productId")
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.styles
    OWNER to postgres;
-- Index: fki_productId

-- DROP INDEX IF EXISTS public."fki_productId";





CREATE INDEX IF NOT EXISTS "fki_productId"
    ON public.styles USING btree
    ("productId" ASC NULLS LAST)
    TABLESPACE pg_default;


CREATE TABLE IF NOT EXISTS public.skus
(
    id integer NOT NULL,
    "styleId" integer NOT NULL,
    size character varying(8) COLLATE pg_catalog."default" NOT NULL,
    quantity integer NOT NULL,
    CONSTRAINT skus_pkey PRIMARY KEY (id),
    CONSTRAINT "styleId" FOREIGN KEY ("styleId")
        REFERENCES public.styles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.skus
    OWNER to postgres;





CREATE TABLE IF NOT EXISTS public.photos
(
    id integer NOT NULL,
    "styleId" integer NOT NULL,
    url text COLLATE pg_catalog."default" NOT NULL,
    thumbnail_url text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT photos_pkey PRIMARY KEY (id),
    CONSTRAINT "styleId" FOREIGN KEY ("styleId")
        REFERENCES public.styles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.photos
    OWNER to postgres;




CREATE TABLE IF NOT EXISTS public.features
(
    id integer NOT NULL,
    product_id integer NOT NULL,
    feature character varying(30) COLLATE pg_catalog."default" NOT NULL,
    value character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT features_pkey PRIMARY KEY (id),
    CONSTRAINT product_id FOREIGN KEY (product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.features
    OWNER to postgres;




CREATE TABLE IF NOT EXISTS public.related
(
    id integer NOT NULL,
    current_product_id integer NOT NULL,
    related_product_id integer NOT NULL,
    CONSTRAINT related_pkey PRIMARY KEY (id),
    CONSTRAINT current_product_id FOREIGN KEY (current_product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.related
    OWNER to postgres;
