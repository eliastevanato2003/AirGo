--
-- PostgreSQL database dump
--

\restrict PMnMjQcV3hB2x6cCKPz6s3mPk9B78JeEk28VcB4RxotTWwG9iMXRhou1s7fflxy

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
    "Citta" text NOT NULL,
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
    "IdBiglietto" integer NOT NULL,
    "Utente" integer NOT NULL,
    "Volo" integer NOT NULL,
    "Nome" text NOT NULL,
    "Cognome" text NOT NULL,
    "DoB" date NOT NULL,
    "Classe" text NOT NULL,
    "NBagagliExtra" integer NOT NULL,
    "IsActive" boolean DEFAULT true NOT NULL,
    "ColPosto" text,
    "RigPosto" text
);


ALTER TABLE public."Biglietti" OWNER TO admin;

--
-- Name: Biglietti_IdVolo_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."Biglietti" ALTER COLUMN "IdBiglietto" ADD GENERATED ALWAYS AS IDENTITY (
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
    "Password" text NOT NULL,
    "IsActive" boolean DEFAULT true NOT NULL,
    "Mail" integer NOT NULL
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
-- Name: IndirizziEmail; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."IndirizziEmail" (
    "IdEmail" integer NOT NULL,
    "Email" text NOT NULL,
    "IsActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."IndirizziEmail" OWNER TO admin;

--
-- Name: IndirizziEmail_IdEmail_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."IndirizziEmail" ALTER COLUMN "IdEmail" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."IndirizziEmail_IdEmail_seq"
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
    "Password" text NOT NULL,
    "Telefono" text NOT NULL,
    "DoB" date NOT NULL,
    "Admin" boolean DEFAULT false NOT NULL,
    "IsActive" boolean DEFAULT true NOT NULL,
    "Mail" integer NOT NULL
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
    "DataPartenzaPrev" timestamp without time zone NOT NULL,
    "DataArrivoPrev" timestamp without time zone NOT NULL,
    "DataPartenzaEff" timestamp without time zone,
    "DataArrivoEff" timestamp without time zone,
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
-- Name: aereiposti; Type: VIEW; Schema: public; Owner: admin
--

CREATE VIEW public.aereiposti AS
SELECT
    NULL::integer AS "IdVolo",
    NULL::integer AS "Aereo",
    NULL::integer AS "Rotta",
    NULL::timestamp without time zone AS "DataPartenzaPrev",
    NULL::timestamp without time zone AS "DataArrivoPrev",
    NULL::timestamp without time zone AS "DataPartenzaEff",
    NULL::timestamp without time zone AS "DataArrivoEff",
    NULL::text AS "Stato",
    NULL::real AS "CostoPC",
    NULL::real AS "CostoB",
    NULL::real AS "CostoE",
    NULL::real AS "CostoBag",
    NULL::real AS "CostoLegRoom",
    NULL::real AS "CostoSceltaPosto",
    NULL::boolean AS "IsActive",
    NULL::bigint AS "PostiOccupati",
    NULL::bigint AS "PostiPc",
    NULL::bigint AS "PostiB",
    NULL::bigint AS "PostiE";


ALTER VIEW public.aereiposti OWNER TO admin;

--
-- Data for Name: Aerei; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Aerei" ("IdAereo", "CompagniaAerea", "Modello", "AnnoCostruzione", "IsActive") FROM stdin;
1	12	1	2020	t
2	8	1	2020	t
3	8	1	2024	t
4	11	3	2019	t
5	11	3	2019	t
6	10	24	2019	t
8	10	26	2021	t
\.


--
-- Data for Name: Aeroporti; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Aeroporti" ("IdAeroporto", "Citta", "Nazione", "Nome", "CodiceIdentificativo", "IsActive") FROM stdin;
2	Venezia	Italia	Marco Polo	VCE	t
7	Lamezia Terme	Italia	Sant'Eufemia	SUF	t
8	Roma	Italia	Leonardo Da Vinci	FCO	t
10	Milan	Italia	Enrico Fornalini	LIN	t
9	Roma	Italia	G. B. Pastine	CIA	t
\.


--
-- Data for Name: Biglietti; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Biglietti" ("IdBiglietto", "Utente", "Volo", "Nome", "Cognome", "DoB", "Classe", "NBagagliExtra", "IsActive", "ColPosto", "RigPosto") FROM stdin;
\.


--
-- Data for Name: CompagnieAeree; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."CompagnieAeree" ("IdCompagniaAerea", "Nome", "CodiceIdentificativo", "Password", "IsActive", "Mail") FROM stdin;
8	Alitalia	AZ	$2b$10$c/vxGlxc0xeHoh8l9IErHuzE2JHAdJua38euJWpbTCgsppwKogfue	t	19
10	Easyjet	U2	$2b$10$X1iVlNXZNMog.Pj4hbN3Ru25PqCf7mqcyti2/1BA6rGmThESHbmPC	t	27
11	Volotea	V7	$2b$10$DznFWksihS3yWV2SKABj9.5FNXApgrtRFCwtGC.iY41PX96x6k9B2	t	28
12	Air France	AF	$2b$10$i40yVwnd0GXW2Ve0oYbDeODVK3xt3Rn/Jy18lXx.korxioyHTCmda	t	66
\.


--
-- Data for Name: IndirizziEmail; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."IndirizziEmail" ("IdEmail", "Email", "IsActive") FROM stdin;
5	elia.stevanato@example.com	t
11	filippo.pizzo@example.com	t
14	dario.caberlotto@example.com	t
19	alitalia@example.com	t
27	easyjet@example.com	t
28	volotea@example.com	t
34	francesco.pasqualato@example.com	t
60	irene.massarotto@example.com	t
66	airfrance@example.com	t
54	francesca.pasqualato@example.com	t
\.


--
-- Data for Name: Modelli; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Modelli" ("IdModello", "Nome", "PostiPc", "RigheB", "ColonneB", "RigheE", "ColonneE", "IsActive") FROM stdin;
1	Boeing 737	20	10	4	20	6	t
3	Boeing 737v2	20	10	4	20	6	t
8	Boeing 737v4	20	10	4	20	6	t
22	Boeing 737v9	0	15	4	30	4	t
24	Boeing 737v5	0	15	2	30	4	t
26	Boeing 737v6	0	15	2	30	4	t
\.


--
-- Data for Name: RigheExtraLegRoom; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."RigheExtraLegRoom" ("IdRiga", "Modello", "NRiga", "IsActive") FROM stdin;
1	3	1	t
2	3	5	t
3	3	10	t
15	22	1	t
16	22	2	t
17	24	1	t
18	24	2	t
19	26	1	t
20	26	30	t
\.


--
-- Data for Name: Rotte; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Rotte" ("IdRotta", "Partenza", "Destinazione", "CompagniaAerea", "IsActive") FROM stdin;
1	2	7	8	t
4	2	8	8	t
5	7	8	8	t
6	7	8	10	t
7	7	9	11	t
8	7	8	11	t
9	7	2	8	t
10	7	2	11	t
11	10	2	12	t
12	8	2	11	t
\.


--
-- Data for Name: Utenti; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Utenti" ("IdUtente", "Nome", "Cognome", "Password", "Telefono", "DoB", "Admin", "IsActive", "Mail") FROM stdin;
37	Filippo	Pizzo	$2b$10$segRmt2k.cO0MRwH041VAOx/tdqECfSsr7TZGQ8iFdHcDNgWRx9Du	2234567890	2003-11-06	f	t	11
39	Dario	Caberlotto	$2b$10$pEeh21J1f7R4wIyDaZ4UuOLKAZTWdAK12WrW8XEMY.pfh0YwPjKFS	3234567890	2003-09-24	f	t	14
31	Elia	Stevanato	$2b$10$Pu4B/XGjeYgs9jUrb461cebDWk6yarcir4RMjvJDpqLrkNDQd9HA.	1234567890	2003-12-08	t	t	5
45	Francesco	Pasqualato	$2b$10$mZszo8lBAPR2p/ZN.jKXjueC1bJhNok5qx6yZTfg1eu7Mz4SLogyi	4234567890	2003-10-19	f	t	34
62	Irene	Massarotto	$2b$10$QesnwrPmIQajlfm/f.xlz.3Kl1Q8T9/aOqSmQXlAQWBcUKCKHLFX6	6234567890	2002-05-22	f	t	60
61	Francesca	Pasqualato	$2b$10$dvdbFaWYkRYxdZb5HZyUMOExkzue.25n69dHOZioiCCXZ6Rs/ESc2	5234567890	2003-10-20	f	t	54
\.


--
-- Data for Name: Voli; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Voli" ("IdVolo", "Aereo", "Rotta", "DataPartenzaPrev", "DataArrivoPrev", "DataPartenzaEff", "DataArrivoEff", "Stato", "CostoPC", "CostoB", "CostoE", "CostoBag", "CostoLegRoom", "CostoSceltaPosto", "IsActive") FROM stdin;
4	3	1	2025-10-14 10:30:00	2025-10-14 11:45:00	\N	\N	Programmato	100	70	35	20.25	10	3	t
7	4	12	2025-10-14 22:30:00	2025-10-15 00:15:00	\N	\N	Programmato	100	70	20	20.25	10	3	t
5	1	11	2025-10-17 10:30:00	2025-10-17 11:45:00	\N	\N	Programmato	100	70	25.5	20.25	10	3	t
\.


--
-- Name: Aerei_IdAereo_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Aerei_IdAereo_seq"', 8, true);


--
-- Name: Aereoporti_IdAeroporto_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Aereoporti_IdAeroporto_seq"', 13, true);


--
-- Name: Biglietti_IdVolo_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Biglietti_IdVolo_seq"', 1, false);


--
-- Name: CompagnieAeree_IdCompagniaAerea_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."CompagnieAeree_IdCompagniaAerea_seq"', 13, true);


--
-- Name: IndirizziEmail_IdEmail_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."IndirizziEmail_IdEmail_seq"', 68, true);


--
-- Name: Modelli_IdModello_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Modelli_IdModello_seq"', 26, true);


--
-- Name: RigheExtraLegRoom_IdRiga_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."RigheExtraLegRoom_IdRiga_seq"', 20, true);


--
-- Name: Rotte_IdRotta_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Rotte_IdRotta_seq"', 12, true);


--
-- Name: Utenti_IdUtente_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Utenti_IdUtente_seq"', 63, true);


--
-- Name: Voli_IdVolo_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Voli_IdVolo_seq"', 7, true);


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
-- Name: Biglietti Biglietti_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Biglietti"
    ADD CONSTRAINT "Biglietti_pkey" PRIMARY KEY ("IdBiglietto");


--
-- Name: CompagnieAeree CompagnieAeree_CodiceIdentificativo_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."CompagnieAeree"
    ADD CONSTRAINT "CompagnieAeree_CodiceIdentificativo_key" UNIQUE ("CodiceIdentificativo");


--
-- Name: CompagnieAeree CompagnieAeree_Email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."CompagnieAeree"
    ADD CONSTRAINT "CompagnieAeree_Email_key" UNIQUE ("Mail");


--
-- Name: CompagnieAeree CompagnieAeree_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."CompagnieAeree"
    ADD CONSTRAINT "CompagnieAeree_pkey" PRIMARY KEY ("IdCompagniaAerea");


--
-- Name: IndirizziEmail IndirizziEmail_Email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."IndirizziEmail"
    ADD CONSTRAINT "IndirizziEmail_Email_key" UNIQUE ("Email");


--
-- Name: IndirizziEmail IndirizziEmail_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."IndirizziEmail"
    ADD CONSTRAINT "IndirizziEmail_pkey" PRIMARY KEY ("IdEmail");


--
-- Name: Modelli Modelli_Nome_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Modelli"
    ADD CONSTRAINT "Modelli_Nome_key" UNIQUE ("Nome");


--
-- Name: Modelli Modelli_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Modelli"
    ADD CONSTRAINT "Modelli_pkey" PRIMARY KEY ("IdModello");


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
    ADD CONSTRAINT "Utenti_Email_key" UNIQUE ("Mail");


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
-- Name: aereiposti _RETURN; Type: RULE; Schema: public; Owner: admin
--

CREATE OR REPLACE VIEW public.aereiposti AS
 SELECT "V"."IdVolo",
    "V"."Aereo",
    "V"."Rotta",
    "V"."DataPartenzaPrev",
    "V"."DataArrivoPrev",
    "V"."DataPartenzaEff",
    "V"."DataArrivoEff",
    "V"."Stato",
    "V"."CostoPC",
    "V"."CostoB",
    "V"."CostoE",
    "V"."CostoBag",
    "V"."CostoLegRoom",
    "V"."CostoSceltaPosto",
    "V"."IsActive",
    sum("B"."IdBiglietto") AS "PostiOccupati",
    sum("M"."PostiPc") AS "PostiPc",
    sum(("M"."RigheB" * "M"."ColonneB")) AS "PostiB",
    sum(("M"."RigheE" * "M"."ColonneE")) AS "PostiE"
   FROM (((public."Voli" "V"
     LEFT JOIN public."Biglietti" "B" ON (("V"."IdVolo" = "B"."Volo")))
     LEFT JOIN public."Aerei" "A" ON (("A"."IdAereo" = "V"."Aereo")))
     LEFT JOIN public."Modelli" "M" ON (("M"."IdModello" = "A"."Modello")))
  GROUP BY "V"."IdVolo";


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
-- Name: CompagnieAeree CompagnieAeree_Email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."CompagnieAeree"
    ADD CONSTRAINT "CompagnieAeree_Email_fkey" FOREIGN KEY ("Mail") REFERENCES public."IndirizziEmail"("IdEmail") ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


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
-- Name: Utenti Utenti_Email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Utenti"
    ADD CONSTRAINT "Utenti_Email_fkey" FOREIGN KEY ("Mail") REFERENCES public."IndirizziEmail"("IdEmail") ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


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

\unrestrict PMnMjQcV3hB2x6cCKPz6s3mPk9B78JeEk28VcB4RxotTWwG9iMXRhou1s7fflxy

