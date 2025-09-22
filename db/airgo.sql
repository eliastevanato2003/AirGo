--
-- PostgreSQL database dump
--

\restrict 99fRNLMn2gNjHsyQYtAmeoWLItibMdDdgSvTwL2iVQ7zEqcFVhHrhMaf1LIQO6c

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
    "IsActive" boolean DEFAULT true NOT NULL,
    "InServizio" boolean DEFAULT true NOT NULL
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
    "Utente" integer,
    "Volo" integer NOT NULL,
    "Nome" text NOT NULL,
    "Cognome" text NOT NULL,
    "DoB" date NOT NULL,
    "Classe" text NOT NULL,
    "NBagagliExtra" integer NOT NULL,
    "IsActive" boolean DEFAULT true NOT NULL,
    "ColPosto" text,
    "NPosto" integer,
    "SceltaPosto" boolean NOT NULL,
    "Costo" real NOT NULL,
    "RigPosto" integer
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
    "IsActive" boolean DEFAULT false NOT NULL,
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
    NULL::integer AS "IdModello",
    NULL::integer AS "RigheB",
    NULL::integer AS "ColonneB",
    NULL::integer AS "ColonneE",
    NULL::integer AS "RigheE",
    NULL::bigint AS "PostiOccupati",
    NULL::bigint AS "PostiPc",
    NULL::bigint AS "PostiB",
    NULL::bigint AS "PostiE",
    NULL::bigint AS "PostiOccPc",
    NULL::bigint AS "PostiOccB",
    NULL::bigint AS "PostiOccE";


ALTER VIEW public.aereiposti OWNER TO admin;

--
-- Name: postitotali; Type: VIEW; Schema: public; Owner: admin
--

CREATE VIEW public.postitotali AS
 SELECT "R"."IdRotta",
    sum(("M"."ColonneE" * "M"."RigheE")) AS "PostiEconomyTotali",
    sum(("M"."ColonneB" * "M"."RigheB")) AS "PostiBusinessTotali",
    sum("M"."PostiPc") AS "PostiPrimaClasseTotali"
   FROM (((public."Voli" "V"
     JOIN public."Rotte" "R" ON ((("V"."Rotta" = "R"."IdRotta") AND ("R"."IsActive" = true))))
     JOIN public."Aerei" "A" ON ((("V"."Aereo" = "A"."IdAereo") AND ("A"."IsActive" = true))))
     JOIN public."Modelli" "M" ON ((("A"."Modello" = "M"."IdModello") AND ("M"."IsActive" = true))))
  GROUP BY "R"."IdRotta";


ALTER VIEW public.postitotali OWNER TO admin;

--
-- Name: statistiche; Type: VIEW; Schema: public; Owner: admin
--

CREATE VIEW public.statistiche AS
 SELECT "R"."CompagniaAerea",
    "F"."Rotta",
    "C"."IdCompagniaAerea",
    "A1"."Citta" AS "Partenza",
    "A2"."Citta" AS "Destinazione",
    count(DISTINCT "F"."IdVolo") AS "VoliTotali",
    count(DISTINCT "B"."IdBiglietto") AS "BigliettiTotali",
    sum("B"."Costo") AS "GuadagnoTotale",
    sum(
        CASE "B"."Classe"
            WHEN 'Prima'::text THEN "B"."Costo"
            ELSE (0)::real
        END) AS "GuadagnoPrimaClasse",
    sum(
        CASE "B"."Classe"
            WHEN 'Business'::text THEN "B"."Costo"
            ELSE (0)::real
        END) AS "GuadagnoBusiness",
    sum(
        CASE "B"."Classe"
            WHEN 'Economy'::text THEN "B"."Costo"
            ELSE (0)::real
        END) AS "GuadagnoEconomy",
    sum(
        CASE "B"."Classe"
            WHEN 'Prima'::text THEN 1
            ELSE 0
        END) AS "BigliettiPrimaClasse",
    sum(
        CASE "B"."Classe"
            WHEN 'Business'::text THEN 1
            ELSE 0
        END) AS "BigliettiBusiness",
    sum(
        CASE "B"."Classe"
            WHEN 'Economy'::text THEN 1
            ELSE 0
        END) AS "BigliettiEconomy",
    min("PT"."PostiEconomyTotali") AS "PostiEconomyTotali",
    min("PT"."PostiBusinessTotali") AS "PostiBusinessTotali",
    min("PT"."PostiPrimaClasseTotali") AS "PostiPrimaClasseTotali"
   FROM ((((((public.aereiposti "F"
     JOIN public."Rotte" "R" ON ((("F"."Rotta" = "R"."IdRotta") AND ("R"."IsActive" = true))))
     JOIN public."CompagnieAeree" "C" ON ((("R"."CompagniaAerea" = "C"."IdCompagniaAerea") AND ("C"."IsActive" = true))))
     LEFT JOIN public."Biglietti" "B" ON (("B"."Volo" = "F"."IdVolo")))
     JOIN public."Aeroporti" "A1" ON (("R"."Partenza" = "A1"."IdAeroporto")))
     JOIN public."Aeroporti" "A2" ON (("R"."Destinazione" = "A2"."IdAeroporto")))
     JOIN public.postitotali "PT" ON (("PT"."IdRotta" = "F"."Rotta")))
  GROUP BY "F"."Rotta", "C"."IdCompagniaAerea", "A1"."Citta", "A2"."Citta", "R"."CompagniaAerea";


ALTER VIEW public.statistiche OWNER TO admin;

--
-- Data for Name: Aerei; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Aerei" ("IdAereo", "CompagniaAerea", "Modello", "AnnoCostruzione", "IsActive", "InServizio") FROM stdin;
1	12	1	2020	t	t
2	8	1	2020	t	t
3	8	1	2024	t	t
4	11	3	2019	t	t
6	10	24	2019	t	t
8	10	26	2021	t	f
5	11	3	2019	f	f
9	11	1	2021	t	t
10	11	3	2021	t	t
11	8	28	2021	t	t
12	12	28	2024	f	t
14	22	28	2024	t	t
\.


--
-- Data for Name: Aeroporti; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Aeroporti" ("IdAeroporto", "Citta", "Nazione", "Nome", "CodiceIdentificativo", "IsActive") FROM stdin;
2	Venezia	Italia	Marco Polo	VCE	t
7	Lamezia Terme	Italia	Sant'Eufemia	SUF	t
8	Roma	Italia	Leonardo Da Vinci	FCO	t
9	Roma	Italia	G. B. Pastine	CIA	t
14	Treviso	Italia	Sant'Angelo	TSF	t
28	Torino	Italia	Sandro Pertini	TRN	t
30	Parigi	Francia	Charles de Gaulle	CDG	t
33	Londra	Regno Unito	London City Airport	LCY	t
35	Berlino	Germania	Willy Brandt	BER	t
36	Madrid	Spagna	Adolfo Su├árez	MAD	t
10	Milano	Italia	Enrico Fornalini	LIN	t
37	Barcellona	Spagna	Josep Tarradellas	BCN	t
20	Verona	Italia	Valerio Catullo	VRN	t
\.


--
-- Data for Name: Biglietti; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Biglietti" ("IdBiglietto", "Utente", "Volo", "Nome", "Cognome", "DoB", "Classe", "NBagagliExtra", "IsActive", "ColPosto", "NPosto", "SceltaPosto", "Costo", "RigPosto") FROM stdin;
81	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
82	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
5	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
6	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
7	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
8	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
9	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
10	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
11	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
12	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
13	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
14	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
15	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
16	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
17	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
18	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
19	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
20	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
21	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
22	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
23	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
24	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
25	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
26	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
27	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
28	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
29	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
30	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
31	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
32	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
33	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
34	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
35	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
36	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
37	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
38	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
39	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
40	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
41	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
42	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
43	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
44	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
45	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
46	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
47	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
48	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
49	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
50	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
51	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
52	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
53	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
54	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
55	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
56	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
57	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
58	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
59	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
60	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
61	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
62	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
63	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
64	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
65	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
66	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
67	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
68	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
69	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
70	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
71	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
72	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
73	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
74	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
75	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
76	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
77	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
78	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
79	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
80	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
83	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
84	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
85	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
86	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
87	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
88	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
89	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
90	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
91	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
92	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
93	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
94	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
95	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
96	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
97	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
98	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
99	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
100	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
101	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
102	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
103	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
104	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
105	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
106	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
107	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
108	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
109	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
110	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
111	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
112	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
113	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
114	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
115	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
116	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
117	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
118	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
119	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
120	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
121	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
122	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
123	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
124	45	14	Dario	Caberlotto	2003-09-24	Economy	1	t	\N	\N	f	40.5	\N
125	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
126	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
127	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
128	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
129	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
130	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
131	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
132	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
133	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
134	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
135	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
136	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
137	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
138	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
139	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
140	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
141	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
142	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
143	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
144	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
145	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
146	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
147	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
148	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
149	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
150	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
151	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
152	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
153	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
154	45	14	Dario	Caberlotto	2003-09-24	Business	2	t	\N	\N	f	101	\N
155	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
156	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
157	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
158	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
159	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
160	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
161	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
162	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
163	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
164	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
165	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
166	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
167	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
168	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
169	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
170	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
171	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
172	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
173	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
174	45	7	Dario	Caberlotto	2003-09-24	Prima	0	t	\N	\N	f	100	\N
175	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
177	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
178	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
179	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
180	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
181	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
182	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
183	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
184	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
185	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
186	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
187	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
188	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
189	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
190	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
191	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
192	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
193	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
194	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
195	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
196	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
197	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
198	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
199	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
200	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
201	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
202	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
203	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
204	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
205	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
206	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
207	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
208	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
209	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
210	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
211	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
212	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
213	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
214	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	\N	\N	f	70	\N
215	45	7	Dario	Caberlotto	2003-09-24	Economy	0	t	\N	\N	f	20	\N
216	45	7	Dario	Caberlotto	2003-09-24	Economy	0	t	\N	\N	f	20	\N
337	45	7	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	t	33	10
338	45	7	Dario	Caberlotto	2003-09-24	Business	0	t	D	\N	t	73	10
339	45	12	Dario	Caberlotto	2003-09-24	Business	0	t	B	\N	t	84	15
340	45	12	Dario	Caberlotto	2003-09-24	Business	0	t	B	\N	t	84	1
341	45	12	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	t	34	3
342	45	12	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	t	39	1
343	45	12	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	t	39	1
344	45	12	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	t	34	30
345	45	12	Dario	Caberlotto	2003-09-24	Business	0	t	A	\N	t	84	15
347	45	12	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	t	34	29
348	45	12	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	t	39	2
349	45	12	Dario	Caberlotto	2003-09-24	Economy	2	t	C	\N	t	60	2
350	39	12	Dario	Caberlotto	2003-09-24	Economy	2	t	D	\N	t	60	2
346	45	12	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	30
352	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	20
353	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	20
354	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	20
356	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	20
358	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	19
359	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	19
360	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	19
361	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	19
362	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	19
364	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	18
365	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	18
366	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	18
367	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	18
368	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	18
369	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	17
370	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	17
372	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	17
373	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	17
374	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	17
375	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	16
376	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	16
377	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	16
378	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	16
379	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	16
381	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	15
382	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	15
384	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	15
385	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	15
386	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	15
387	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	14
388	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	14
389	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	14
391	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	14
392	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	14
393	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	13
394	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	13
395	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	13
396	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	13
397	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	13
399	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	12
400	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	12
401	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	12
402	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	12
403	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	12
404	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	12
405	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	11
407	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	11
408	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	11
409	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	11
410	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	11
411	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	10
412	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	10
413	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	10
414	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	10
416	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	10
417	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	9
418	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	9
419	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	9
420	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	9
421	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	9
422	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	9
424	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	8
425	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	8
426	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	8
427	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	8
428	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	8
429	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	7
430	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	7
432	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	7
433	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	7
434	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	7
435	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	6
436	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	6
437	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	6
438	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	6
439	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	6
441	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	5
442	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	5
443	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	5
444	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	5
445	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	5
446	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	5
447	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	4
449	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	4
450	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	4
451	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	4
452	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	4
453	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	3
454	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	3
455	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	3
457	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	3
458	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	3
459	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	2
460	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	2
461	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	2
462	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	2
463	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	2
464	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	2
466	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	1
467	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	1
468	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	1
469	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	1
470	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	1
355	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	20
363	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	18
371	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	17
380	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	16
383	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	15
390	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	14
398	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	13
406	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	11
415	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	B	\N	f	30	10
423	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	8
431	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	D	\N	f	30	7
440	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	A	\N	f	30	6
448	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	4
456	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	C	\N	f	30	3
465	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	1
509	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	A	\N	t	84	1
510	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	A	\N	t	84	2
471	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	D	\N	f	80	10
472	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	C	\N	f	80	10
473	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	B	\N	f	80	10
474	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	A	\N	f	80	10
475	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	D	\N	f	80	9
476	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	C	\N	f	80	9
477	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	B	\N	f	80	9
478	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	A	\N	f	80	9
479	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	D	\N	f	80	8
480	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	C	\N	f	80	8
481	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	B	\N	f	80	8
482	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	A	\N	f	80	8
483	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	D	\N	f	80	7
484	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	C	\N	f	80	7
485	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	B	\N	f	80	7
486	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	A	\N	f	80	7
487	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	D	\N	f	80	6
488	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	C	\N	f	80	6
489	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	B	\N	f	80	6
490	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	A	\N	f	80	6
491	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	D	\N	f	80	5
492	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	C	\N	f	80	5
493	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	B	\N	f	80	5
494	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	A	\N	f	80	5
495	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	D	\N	f	80	4
496	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	C	\N	f	80	4
351	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	E	\N	f	30	20
498	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	A	\N	f	80	4
499	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	D	\N	f	80	3
500	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	C	\N	f	80	3
497	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	B	\N	f	80	4
502	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	A	\N	f	80	3
503	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	D	\N	f	80	2
504	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	C	\N	f	80	2
505	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	B	\N	f	80	2
506	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	D	\N	f	80	1
507	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	C	\N	f	80	1
508	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	B	\N	f	80	1
511	39	8	Dario	Caberlotto	2003-09-24	Prima	1	t	\N	20	f	120.5	\N
512	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	19	f	131	\N
513	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	16	f	131	\N
514	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	5	f	131	\N
515	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	18	f	131	\N
516	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	17	f	131	\N
517	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	2	f	131	\N
518	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	15	f	131	\N
519	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	14	f	131	\N
520	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	13	f	131	\N
521	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	12	f	131	\N
522	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	11	f	131	\N
523	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	10	f	131	\N
524	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	9	f	131	\N
525	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	8	f	131	\N
526	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	7	f	131	\N
527	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	6	f	131	\N
501	39	8	Dario	Caberlotto	2003-09-24	Business	0	t	B	\N	f	80	3
529	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	4	f	131	\N
530	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	3	f	131	\N
528	39	8	Dario	Caberlotto	2003-09-24	Prima	2	t	\N	1	f	131	\N
357	39	8	Dario	Caberlotto	2003-09-24	Economy	0	t	F	\N	f	30	19
533	61	17	Elia	Stevanato	2003-12-08	Business	0	t	C	\N	t	23	5
534	61	17	Elia	Stevanato	2003-12-08	Business	0	t	D	\N	t	23	5
535	61	17	Elia	Stevanato	2003-12-08	Business	0	t	D	\N	t	23	4
536	61	17	Elia	Stevanato	2003-12-08	Business	1	t	B	\N	t	26	4
531	61	17	Elia	Stevanato	2003-12-08	Economy	0	t	F	\N	f	10	20
537	61	17	Dario	Caberlotto	2025-09-24	Business	1	t	D	\N	f	23	10
538	61	17	Dario	Caberlotto	2025-09-24	Business	3	t	C	\N	f	29	10
532	61	17	Elia	Stevanato	2003-12-08	Economy	3	f	C	\N	t	22	5
\.


--
-- Data for Name: CompagnieAeree; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."CompagnieAeree" ("IdCompagniaAerea", "Nome", "CodiceIdentificativo", "Password", "IsActive", "Mail") FROM stdin;
8	Alitalia	AZ	$2b$10$c/vxGlxc0xeHoh8l9IErHuzE2JHAdJua38euJWpbTCgsppwKogfue	t	19
10	Easyjet	U2	$2b$10$X1iVlNXZNMog.Pj4hbN3Ru25PqCf7mqcyti2/1BA6rGmThESHbmPC	t	27
11	Volotea	V7	$2b$10$DznFWksihS3yWV2SKABj9.5FNXApgrtRFCwtGC.iY41PX96x6k9B2	t	28
12	Air France	AF	$2b$10$i40yVwnd0GXW2Ve0oYbDeODVK3xt3Rn/Jy18lXx.korxioyHTCmda	t	66
22	Lufthansa	LH	$2b$10$K4dQ2havh/XAl3/EqzKZ7ucZiTAQ5wdpg3BspUclcVKbeDHZ/q/H2	t	83
\.


--
-- Data for Name: IndirizziEmail; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."IndirizziEmail" ("IdEmail", "Email", "IsActive") FROM stdin;
11	filippo.pizzo@example.com	t
14	dario.caberlotto@example.com	t
19	alitalia@example.com	t
27	easyjet@example.com	t
28	volotea@example.com	t
60	irene.massarotto@example.com	t
66	airfrance@example.com	t
81	mario.rossi@example.com	f
54	francesca.pasqualato@example.com	f
5	elia.stevanato@example.com	t
34	francesco.pasqualato@example.com	t
83	lufthansa@example.com	f
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
26	Boeing 737v6	0	0	0	0	0	t
28	Boeing 736	0	5	4	20	6	t
31	Boeing 736v3	10	10	4	20	6	f
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
21	28	1	t
22	28	2	t
23	28	3	t
24	31	1	f
25	31	1	f
26	31	2	f
27	31	3	f
28	31	30	f
29	31	3	f
30	31	3	f
31	31	3	f
32	31	3	f
33	31	3	f
\.


--
-- Data for Name: Rotte; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Rotte" ("IdRotta", "Partenza", "Destinazione", "CompagniaAerea", "IsActive") FROM stdin;
1	2	7	8	t
4	2	8	8	t
5	7	8	8	t
7	7	9	11	t
8	7	8	11	t
9	7	2	8	t
10	7	2	11	t
11	10	2	12	t
12	8	2	11	t
13	8	2	10	t
15	8	10	10	t
17	2	28	10	t
18	2	10	11	t
19	10	28	11	t
21	35	36	10	t
6	10	36	10	t
16	2	35	10	t
23	20	36	10	f
24	33	36	22	t
\.


--
-- Data for Name: Utenti; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Utenti" ("IdUtente", "Nome", "Cognome", "Password", "Telefono", "DoB", "Admin", "IsActive", "Mail") FROM stdin;
37	Filippo	Pizzo	$2b$10$segRmt2k.cO0MRwH041VAOx/tdqECfSsr7TZGQ8iFdHcDNgWRx9Du	2234567890	2003-11-06	f	t	11
39	Dario	Caberlotto	$2b$10$pEeh21J1f7R4wIyDaZ4UuOLKAZTWdAK12WrW8XEMY.pfh0YwPjKFS	3234567890	2003-09-24	f	t	14
31	Elia	Stevanato	$2b$10$Pu4B/XGjeYgs9jUrb461cebDWk6yarcir4RMjvJDpqLrkNDQd9HA.	1234567890	2003-12-08	t	t	5
62	Irene	Massarotto	$2b$10$QesnwrPmIQajlfm/f.xlz.3Kl1Q8T9/aOqSmQXlAQWBcUKCKHLFX6	6234567890	2002-05-22	f	t	60
66	Mario	Rossi	$2b$10$GtQANjeIX53hWuV0SALCNOjb5A9gDnu5JrxdXBHeydPq1AP8qwsEy	7234567890	2003-10-13	f	f	81
61	Francesca	Pasqualato	$2b$10$dvdbFaWYkRYxdZb5HZyUMOExkzue.25n69dHOZioiCCXZ6Rs/ESc2	5234567890	2003-10-20	f	f	54
45	Francesco	Pasqualato	$2b$10$L2iJ9jMxTTtpUJdLox8cbOnIWuYwTyfGAjsFhqqBfxtvEBj6G8RjS	8234567890	2003-10-20	f	t	34
\.


--
-- Data for Name: Voli; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Voli" ("IdVolo", "Aereo", "Rotta", "DataPartenzaPrev", "DataArrivoPrev", "DataPartenzaEff", "DataArrivoEff", "Stato", "CostoPC", "CostoB", "CostoE", "CostoBag", "CostoLegRoom", "CostoSceltaPosto", "IsActive") FROM stdin;
8	2	4	2025-12-23 12:00:00	2025-12-23 15:45:00	\N	\N	Programmato	110	80	30	10.5	5	4	t
11	2	5	2025-12-23 12:00:00	2025-12-23 15:45:00	\N	\N	Programmato	110	80	30	10.5	5	4	t
12	6	6	2025-12-23 17:20:00	2025-12-23 15:45:00	\N	\N	Programmato	110	80	30	10.5	5	4	t
14	6	6	2025-12-23 17:20:00	2025-12-23 15:45:00	\N	\N	Programmato	110	80	30	10.5	5	4	t
4	3	1	2025-10-14 10:30:00	2025-10-14 11:45:00	\N	\N	Programmato	80	20	1	20.25	10	3	f
5	1	11	2025-10-17 10:30:00	2025-10-17 11:45:00	\N	\N	Programmato	100	70	25.5	20.25	10	3	f
15	8	17	2025-11-21 00:00:00	2025-11-21 15:45:00	\N	\N	Programmato	110	80	30	10.5	5	4	t
18	1	11	2025-11-20 13:00:00	2025-11-20 15:00:00	\N	\N	Programmato	80	40	20	3	3	3	t
19	1	11	2025-12-08 14:00:00	2025-12-08 17:15:00	2025-09-19 05:10:38.903	2025-09-19 07:10:38.903	Atterrato	30	20	10	3	3	3	f
17	9	19	2025-11-20 13:00:00	2025-11-20 15:00:00	2025-09-19 10:18:29.943	\N	Decollato	30	20	10	3	3	3	t
20	14	24	2025-12-08 14:00:00	2025-12-08 17:15:00	2025-09-19 14:28:48.856	2025-09-19 14:29:06.534	Atterrato	30	20	10	3	3	3	t
\.


--
-- Name: Aerei_IdAereo_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Aerei_IdAereo_seq"', 14, true);


--
-- Name: Aereoporti_IdAeroporto_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Aereoporti_IdAeroporto_seq"', 37, true);


--
-- Name: Biglietti_IdVolo_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Biglietti_IdVolo_seq"', 538, true);


--
-- Name: CompagnieAeree_IdCompagniaAerea_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."CompagnieAeree_IdCompagniaAerea_seq"', 25, true);


--
-- Name: IndirizziEmail_IdEmail_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."IndirizziEmail_IdEmail_seq"', 88, true);


--
-- Name: Modelli_IdModello_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Modelli_IdModello_seq"', 31, true);


--
-- Name: RigheExtraLegRoom_IdRiga_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."RigheExtraLegRoom_IdRiga_seq"', 33, true);


--
-- Name: Rotte_IdRotta_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Rotte_IdRotta_seq"', 24, true);


--
-- Name: Utenti_IdUtente_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Utenti_IdUtente_seq"', 66, true);


--
-- Name: Voli_IdVolo_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Voli_IdVolo_seq"', 20, true);


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
    "M"."IdModello",
    "M"."RigheB",
    "M"."ColonneB",
    "M"."ColonneE",
    "M"."RigheE",
    count("B"."IdBiglietto") AS "PostiOccupati",
    (sum("M"."PostiPc") / count(*)) AS "PostiPc",
    (sum(("M"."RigheB" * "M"."ColonneB")) / count(*)) AS "PostiB",
    (sum(("M"."RigheE" * "M"."ColonneE")) / count(*)) AS "PostiE",
    sum(
        CASE
            WHEN ("B"."Classe" = 'Prima'::text) THEN 1
            ELSE 0
        END) AS "PostiOccPc",
    sum(
        CASE
            WHEN ("B"."Classe" = 'Business'::text) THEN 1
            ELSE 0
        END) AS "PostiOccB",
    sum(
        CASE
            WHEN ("B"."Classe" = 'Economy'::text) THEN 1
            ELSE 0
        END) AS "PostiOccE"
   FROM (((public."Voli" "V"
     LEFT JOIN public."Biglietti" "B" ON (("V"."IdVolo" = "B"."Volo")))
     LEFT JOIN public."Aerei" "A" ON (("A"."IdAereo" = "V"."Aereo")))
     LEFT JOIN public."Modelli" "M" ON (("M"."IdModello" = "A"."Modello")))
  GROUP BY "V"."IdVolo", "M"."IdModello";


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
    ADD CONSTRAINT "Biglietti_Utente_fkey" FOREIGN KEY ("Utente") REFERENCES public."Utenti"("IdUtente") ON UPDATE SET NULL ON DELETE SET NULL NOT VALID;


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

\unrestrict 99fRNLMn2gNjHsyQYtAmeoWLItibMdDdgSvTwL2iVQ7zEqcFVhHrhMaf1LIQO6c

