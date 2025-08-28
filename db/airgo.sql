--
-- PostgreSQL database dump
--

\restrict 4S6tNuVoxEUhR6yNeVKIPgSboknduHsuiahVBpjl4V9PgSKoV6dk7ue9kHt515u

-- Dumped from database version 16.10 (Debian 16.10-1.pgdg13+1)
-- Dumped by pg_dump version 16.10 (Debian 16.10-1.pgdg13+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Aerei; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Aerei" (
    "IdAereo" integer NOT NULL,
    "CompagniaAerea" integer NOT NULL,
    "Modello" integer NOT NULL,
    "AnnoCostruzione" integer NOT NULL,
    "IsActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Aerei" OWNER TO admin;

--
-- Name: Aerei_IdAereo_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."Aerei" ALTER COLUMN "IdAereo" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Aerei_IdAereo_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Aeroporti; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Aeroporti" (
    "IdAeroporto" integer NOT NULL,
    "CittÔö£├í" text NOT NULL,
    "Nazione" text NOT NULL,
    "Nome" text NOT NULL,
    "CodiceIdentificativo" text NOT NULL,
    "IsActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Aeroporti" OWNER TO admin;

--
-- Name: Aereoporti_IdAeroporto_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."Aeroporti" ALTER COLUMN "IdAeroporto" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Aereoporti_IdAeroporto_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Biglietti; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Biglietti" (
    "IdVolo" integer NOT NULL,
    "Utente" integer NOT NULL,
    "Posto" integer,
    "Volo" integer NOT NULL,
    "Nome" text NOT NULL,
    "Cognome" text NOT NULL,
    "DoB" date NOT NULL,
    "Classe" text NOT NULL,
    "NBagagliExtra" integer NOT NULL,
    "IsActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Biglietti" OWNER TO admin;

--
-- Name: Biglietti_IdVolo_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."Biglietti" ALTER COLUMN "IdVolo" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Biglietti_IdVolo_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: CompagnieAeree; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."CompagnieAeree" (
    "IdCompagniaAerea" integer NOT NULL,
    "Nome" text NOT NULL,
    "CodiceIdentificativo" text NOT NULL,
    "Email" text NOT NULL,
    "Password" text NOT NULL,
    "IsActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."CompagnieAeree" OWNER TO admin;

--
-- Name: CompagnieAeree_IdCompagniaAerea_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."CompagnieAeree" ALTER COLUMN "IdCompagniaAerea" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."CompagnieAeree_IdCompagniaAerea_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Modelli; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Modelli" (
    "IdModello" integer NOT NULL,
    "Nome" text NOT NULL,
    "PostiPc" integer NOT NULL,
    "RigheB" integer NOT NULL,
    "ColonneB" integer NOT NULL,
    "RigheE" integer NOT NULL,
    "ColonneE" integer NOT NULL,
    "IsActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Modelli" OWNER TO admin;

--
-- Name: Modelli_IdModello_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."Modelli" ALTER COLUMN "IdModello" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Modelli_IdModello_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Posti; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Posti" (
    "IdPosto" integer NOT NULL,
    "Aereo" integer NOT NULL,
    "Numero" integer NOT NULL,
    "Lettera" text NOT NULL,
    "LegRoom" boolean NOT NULL,
    "Classe" text NOT NULL,
    "IsActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Posti" OWNER TO admin;

--
-- Name: Posti_IdPosto_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."Posti" ALTER COLUMN "IdPosto" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Posti_IdPosto_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: RigheExtraLegRoom; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."RigheExtraLegRoom" (
    "IdRiga" integer NOT NULL,
    "Modello" integer NOT NULL,
    "NRiga" integer NOT NULL,
    "IsActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."RigheExtraLegRoom" OWNER TO admin;

--
-- Name: RigheExtraLegRoom_IdRiga_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."RigheExtraLegRoom" ALTER COLUMN "IdRiga" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."RigheExtraLegRoom_IdRiga_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Rotte; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Rotte" (
    "IdRotta" integer NOT NULL,
    "Partenza" integer NOT NULL,
    "Destinazione" integer NOT NULL,
    "CompagniaAerea" integer NOT NULL,
    "IsActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Rotte" OWNER TO admin;

--
-- Name: Rotte_IdRotta_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."Rotte" ALTER COLUMN "IdRotta" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Rotte_IdRotta_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Utenti; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Utenti" (
    "IdUtente" integer NOT NULL,
    "Nome" text NOT NULL,
    "Cognome" text NOT NULL,
    "Email" text NOT NULL,
    "Password" text NOT NULL,
    "Telefono" text NOT NULL,
    "DoB" date NOT NULL,
    "Admin" boolean DEFAULT false NOT NULL,
    "IsActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Utenti" OWNER TO admin;

--
-- Name: Utenti_IdUtente_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."Utenti" ALTER COLUMN "IdUtente" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Utenti_IdUtente_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Voli; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Voli" (
    "IdVolo" integer NOT NULL,
    "Aereo" integer NOT NULL,
    "Rotta" integer NOT NULL,
    "DataPartenzaPrev" date NOT NULL,
    "DateArrivoPrev" date NOT NULL,
    "DataPartenzaEff" date,
    "DataArrivoEff" date,
    "Stato" text NOT NULL,
    "CostoPC" real NOT NULL,
    "CostoB" real NOT NULL,
    "CostoE" real NOT NULL,
    "CostoBag" real NOT NULL,
    "CostoLegRoom" real NOT NULL,
    "CostoSceltaPosto" real NOT NULL,
    "IsActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Voli" OWNER TO admin;

--
-- Name: Voli_IdVolo_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."Voli" ALTER COLUMN "IdVolo" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Voli_IdVolo_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: Aerei; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Aerei" ("IdAereo", "CompagniaAerea", "Modello", "AnnoCostruzione", "IsActive") FROM stdin;
\.


--
-- Data for Name: Aeroporti; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Aeroporti" ("IdAeroporto", "CittÔö£├í", "Nazione", "Nome", "CodiceIdentificativo", "IsActive") FROM stdin;
\.


--
-- Data for Name: Biglietti; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Biglietti" ("IdVolo", "Utente", "Posto", "Volo", "Nome", "Cognome", "DoB", "Classe", "NBagagliExtra", "IsActive") FROM stdin;
\.


--
-- Data for Name: CompagnieAeree; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."CompagnieAeree" ("IdCompagniaAerea", "Nome", "CodiceIdentificativo", "Email", "Password", "IsActive") FROM stdin;
\.


--
-- Data for Name: Modelli; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Modelli" ("IdModello", "Nome", "PostiPc", "RigheB", "ColonneB", "RigheE", "ColonneE", "IsActive") FROM stdin;
\.


--
-- Data for Name: Posti; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Posti" ("IdPosto", "Aereo", "Numero", "Lettera", "LegRoom", "Classe", "IsActive") FROM stdin;
\.


--
-- Data for Name: RigheExtraLegRoom; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."RigheExtraLegRoom" ("IdRiga", "Modello", "NRiga", "IsActive") FROM stdin;
\.


--
-- Data for Name: Rotte; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Rotte" ("IdRotta", "Partenza", "Destinazione", "CompagniaAerea", "IsActive") FROM stdin;
\.


--
-- Data for Name: Utenti; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Utenti" ("IdUtente", "Nome", "Cognome", "Email", "Password", "Telefono", "DoB", "Admin", "IsActive") FROM stdin;
\.


--
-- Data for Name: Voli; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Voli" ("IdVolo", "Aereo", "Rotta", "DataPartenzaPrev", "DateArrivoPrev", "DataPartenzaEff", "DataArrivoEff", "Stato", "CostoPC", "CostoB", "CostoE", "CostoBag", "CostoLegRoom", "CostoSceltaPosto", "IsActive") FROM stdin;
\.


--
-- Name: Aerei_IdAereo_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Aerei_IdAereo_seq"', 1, false);


--
-- Name: Aereoporti_IdAeroporto_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Aereoporti_IdAeroporto_seq"', 1, true);


--
-- Name: Biglietti_IdVolo_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Biglietti_IdVolo_seq"', 1, false);


--
-- Name: CompagnieAeree_IdCompagniaAerea_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."CompagnieAeree_IdCompagniaAerea_seq"', 1, false);


--
-- Name: Modelli_IdModello_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Modelli_IdModello_seq"', 1, false);


--
-- Name: Posti_IdPosto_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Posti_IdPosto_seq"', 1, false);


--
-- Name: RigheExtraLegRoom_IdRiga_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."RigheExtraLegRoom_IdRiga_seq"', 1, false);


--
-- Name: Rotte_IdRotta_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Rotte_IdRotta_seq"', 1, false);


--
-- Name: Utenti_IdUtente_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Utenti_IdUtente_seq"', 1, false);


--
-- Name: Voli_IdVolo_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Voli_IdVolo_seq"', 1, false);


--
-- Name: Aerei Aerei_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Aerei"
    ADD CONSTRAINT "Aerei_pkey" PRIMARY KEY ("IdAereo");


--
-- Name: Aeroporti Aereoporti_CodiceIdentificativo_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Aeroporti"
    ADD CONSTRAINT "Aereoporti_CodiceIdentificativo_key" UNIQUE ("CodiceIdentificativo");


--
-- Name: Aeroporti Aereoporti_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Aeroporti"
    ADD CONSTRAINT "Aereoporti_pkey" PRIMARY KEY ("IdAeroporto");


--
-- Name: Biglietti Biglietti_Posto_Volo_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Biglietti"
    ADD CONSTRAINT "Biglietti_Posto_Volo_key" UNIQUE ("Posto", "Volo");


--
-- Name: Biglietti Biglietti_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Biglietti"
    ADD CONSTRAINT "Biglietti_pkey" PRIMARY KEY ("IdVolo");


--
-- Name: CompagnieAeree CompagnieAeree_CodiceIdentificativo_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."CompagnieAeree"
    ADD CONSTRAINT "CompagnieAeree_CodiceIdentificativo_key" UNIQUE ("CodiceIdentificativo");


--
-- Name: CompagnieAeree CompagnieAeree_Email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."CompagnieAeree"
    ADD CONSTRAINT "CompagnieAeree_Email_key" UNIQUE ("Email");


--
-- Name: CompagnieAeree CompagnieAeree_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."CompagnieAeree"
    ADD CONSTRAINT "CompagnieAeree_pkey" PRIMARY KEY ("IdCompagniaAerea");


--
-- Name: Modelli Modelli_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Modelli"
    ADD CONSTRAINT "Modelli_pkey" PRIMARY KEY ("IdModello");


--
-- Name: Posti Posti_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Posti"
    ADD CONSTRAINT "Posti_pkey" PRIMARY KEY ("IdPosto");


--
-- Name: RigheExtraLegRoom RigheExtraLegRoom_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."RigheExtraLegRoom"
    ADD CONSTRAINT "RigheExtraLegRoom_pkey" PRIMARY KEY ("IdRiga");


--
-- Name: Rotte Rotte_Partenza_Destinazione_CompagniaAerea_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Rotte"
    ADD CONSTRAINT "Rotte_Partenza_Destinazione_CompagniaAerea_key" UNIQUE ("Partenza", "Destinazione", "CompagniaAerea");


--
-- Name: Rotte Rotte_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Rotte"
    ADD CONSTRAINT "Rotte_pkey" PRIMARY KEY ("IdRotta");


--
-- Name: Utenti Utenti_Email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Utenti"
    ADD CONSTRAINT "Utenti_Email_key" UNIQUE ("Email");


--
-- Name: Utenti Utenti_Telefono_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Utenti"
    ADD CONSTRAINT "Utenti_Telefono_key" UNIQUE ("Telefono");


--
-- Name: Utenti Utenti_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Utenti"
    ADD CONSTRAINT "Utenti_pkey" PRIMARY KEY ("IdUtente");


--
-- Name: Voli Voli_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Voli"
    ADD CONSTRAINT "Voli_pkey" PRIMARY KEY ("IdVolo");


--
-- Name: Aerei Aerei_CompagnieAerea_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Aerei"
    ADD CONSTRAINT "Aerei_CompagnieAerea_fkey" FOREIGN KEY ("CompagniaAerea") REFERENCES public."CompagnieAeree"("IdCompagniaAerea") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Aerei Aerei_Modello_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Aerei"
    ADD CONSTRAINT "Aerei_Modello_fkey" FOREIGN KEY ("Modello") REFERENCES public."Modelli"("IdModello") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Biglietti Biglietti_Posto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Biglietti"
    ADD CONSTRAINT "Biglietti_Posto_fkey" FOREIGN KEY ("Posto") REFERENCES public."Posti"("IdPosto") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Biglietti Biglietti_Utente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Biglietti"
    ADD CONSTRAINT "Biglietti_Utente_fkey" FOREIGN KEY ("Utente") REFERENCES public."Utenti"("IdUtente") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Biglietti Biglietti_Volo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Biglietti"
    ADD CONSTRAINT "Biglietti_Volo_fkey" FOREIGN KEY ("Volo") REFERENCES public."Voli"("IdVolo") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Posti Posti_Aereo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Posti"
    ADD CONSTRAINT "Posti_Aereo_fkey" FOREIGN KEY ("Aereo") REFERENCES public."Aerei"("IdAereo") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: RigheExtraLegRoom RigheExtraLegRoom_Modello_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."RigheExtraLegRoom"
    ADD CONSTRAINT "RigheExtraLegRoom_Modello_fkey" FOREIGN KEY ("Modello") REFERENCES public."Modelli"("IdModello") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Rotte Rotte_CompagniaAerea_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Rotte"
    ADD CONSTRAINT "Rotte_CompagniaAerea_fkey" FOREIGN KEY ("CompagniaAerea") REFERENCES public."CompagnieAeree"("IdCompagniaAerea") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Rotte Rotte_Destinazione_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Rotte"
    ADD CONSTRAINT "Rotte_Destinazione_fkey" FOREIGN KEY ("Destinazione") REFERENCES public."Aeroporti"("IdAeroporto") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Rotte Rotte_Partenza_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Rotte"
    ADD CONSTRAINT "Rotte_Partenza_fkey" FOREIGN KEY ("Partenza") REFERENCES public."Aeroporti"("IdAeroporto") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Voli Voli_Aereo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Voli"
    ADD CONSTRAINT "Voli_Aereo_fkey" FOREIGN KEY ("Aereo") REFERENCES public."Aerei"("IdAereo") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Voli Voli_Rotta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Voli"
    ADD CONSTRAINT "Voli_Rotta_fkey" FOREIGN KEY ("Rotta") REFERENCES public."Rotte"("IdRotta") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 4S6tNuVoxEUhR6yNeVKIPgSboknduHsuiahVBpjl4V9PgSKoV6dk7ue9kHt515u

