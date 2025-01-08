--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-12-15 00:10:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4957 (class 0 OID 17592)
-- Dependencies: 217
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (admin_id, name, email, password) FROM stdin;
A001	Admin	admin@example.com	admin
\.


--
-- TOC entry 4958 (class 0 OID 17595)
-- Dependencies: 218
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (reservation_number, booking_date, seating_class, seat_number, user_id, trip_id) FROM stdin;
1	2025-01-01	economy	1	2196622555	1
2	2025-01-01	economy	2	1000000000	1
3	2025-01-02	business	3	2000000000	1
4	2025-01-02	economy	1	2196622555	2
5	2025-01-03	economy	2	1000000000	2
6	2025-01-03	business	3	2000000000	2
\.


--
-- TOC entry 4962 (class 0 OID 17602)
-- Dependencies: 222
-- Data for Name: dependents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dependents (dependent_id, name, sex, relationship, passenger_id) FROM stdin;
1000000001	Khalid	M	Son	1000000000
1000000002	Hassan	M	Son	1000000000
\.


--
-- TOC entry 4963 (class 0 OID 17605)
-- Dependencies: 223
-- Data for Name: passenger; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.passenger (passenger_id, fname, lname, phone_number, email, password, miles) FROM stdin;
2196622555	Kenan	Kaddoura	0571578219	kenanxdgazwan@gmail.com	1111	1500.00
1000000000	Omar	ALJOHANI	0511111111	omaraljohani@gmail.com	1111	10.00
2000000000	Mohammed	FAadel	0511111111	mohammed@gmail.com	1111	3000.00
\.


--
-- TOC entry 4964 (class 0 OID 17608)
-- Dependencies: 224
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment (payment_id, amount, status, reservation_number) FROM stdin;
1	100.00	paid	1
2	100.00	paid	2
3	250.00	paid	3
4	100.00	paid	4
5	100.00	pending	5
6	250.00	pending	6
\.


--
-- TOC entry 4966 (class 0 OID 17613)
-- Dependencies: 226
-- Data for Name: staff; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.staff (staff_id, name, role) FROM stdin;
1	Alice Smith	Driver
2	Hussam Mohammed	Driver
3	Nahid Ahmed	Driver
4	Alice Smith	Driver
\.


--
-- TOC entry 4967 (class 0 OID 17616)
-- Dependencies: 227
-- Data for Name: staff_assign; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.staff_assign (staff_id, train_id, date) FROM stdin;
1	TR001	2025-01-01
2	TR002	2025-01-01
\.


--
-- TOC entry 4969 (class 0 OID 17620)
-- Dependencies: 229
-- Data for Name: stations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stations (station_name, sequence_number) FROM stdin;
Station A	1
Station B	2
Station D	3
Station C	4
\.


--
-- TOC entry 4971 (class 0 OID 17624)
-- Dependencies: 231
-- Data for Name: tracks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tracks (track_id, from_station, to_station) FROM stdin;
TK001	Station A	Station B
TK002	Station B	Station A
TK003	Station A	Station C
TK004	Station A	Station D
\.


--
-- TOC entry 4972 (class 0 OID 17627)
-- Dependencies: 232
-- Data for Name: train_schedules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.train_schedules (schedule_id, date, train_id, track_id, sequence_number, arrival_time, departure_time) FROM stdin;
S001	2025-01-02	TR001	TK001	1	2025-01-02 12:00:00	2025-01-02 08:00:00
S002	2025-01-04	TR001	TK002	2	2025-01-04 04:00:00	2025-01-04 01:00:00
S003	2025-01-03	TR002	TK001	1	2025-01-03 12:00:00	2025-01-03 08:00:00
S004	2025-01-05	TR002	TK002	2	2025-01-05 08:00:00	2025-01-05 04:00:00
S005	2025-01-05	TR001	TK003	3	2025-01-05 12:00:00	2025-01-05 08:00:00
S006	2025-01-06	TR002	TK004	4	2025-01-06 05:00:00	2025-01-06 02:00:00
\.


--
-- TOC entry 4973 (class 0 OID 17630)
-- Dependencies: 233
-- Data for Name: trains; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trains (train_id, train_name_en, train_name_ar, capacity) FROM stdin;
TR001	Express Train	قطار سريع	300
TR002	Express Train	قطار سريع	300
\.


--
-- TOC entry 4974 (class 0 OID 17634)
-- Dependencies: 234
-- Data for Name: trips; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trips (trip_id, date, train_id, from_station, to_station) FROM stdin;
1	2025-01-02	TR001	Station A	Station B
2	2025-01-04	TR001	Station B	Station A
3	2025-01-03	TR002	Station A	Station B
4	2025-01-05	TR002	Station B	Station A
5	2025-01-05	TR001	Station A	Station C
6	2025-01-06	TR002	Station A	Station D
\.


--
-- TOC entry 4975 (class 0 OID 17637)
-- Dependencies: 235
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (national_id, name) FROM stdin;
2196622555	Kenan
2000000000	Mohammed
1000000000	Omar
1000000001	Khalid
1000000002	Hassan
\.


--
-- TOC entry 4976 (class 0 OID 17640)
-- Dependencies: 236
-- Data for Name: waiting_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.waiting_list (waiting_id, waiting_status, trip_id, passenger_id) FROM stdin;
1	temporary	1	2196622555
2	temporary	3	1000000000
\.


--
-- TOC entry 4983 (class 0 OID 0)
-- Dependencies: 219
-- Name: bookings_reservation_number_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_reservation_number_seq', 1, false);


--
-- TOC entry 4984 (class 0 OID 0)
-- Dependencies: 220
-- Name: bookings_seat_number_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_seat_number_seq', 1, false);


--
-- TOC entry 4985 (class 0 OID 0)
-- Dependencies: 221
-- Name: bookings_trip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_trip_id_seq', 1, false);


--
-- TOC entry 4986 (class 0 OID 0)
-- Dependencies: 225
-- Name: payment_payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_payment_id_seq', 1, false);


--
-- TOC entry 4987 (class 0 OID 0)
-- Dependencies: 228
-- Name: staff_staff_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.staff_staff_id_seq', 1, false);


--
-- TOC entry 4988 (class 0 OID 0)
-- Dependencies: 230
-- Name: stations_sequence_number_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stations_sequence_number_seq', 1, false);


--
-- TOC entry 4989 (class 0 OID 0)
-- Dependencies: 237
-- Name: waiting_list_waiting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.waiting_list_waiting_id_seq', 1, false);


-- Completed on 2024-12-15 00:10:30

--
-- PostgreSQL database dump complete
--

