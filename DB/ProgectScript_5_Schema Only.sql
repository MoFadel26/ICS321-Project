--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-12-14 23:06:02

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
-- TOC entry 238 (class 1255 OID 17409)
-- Name: notify_passenger_before_departure(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.notify_passenger_before_departure() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    current_time TIMESTAMP := CURRENT_TIMESTAMP;
    departure_time TIMESTAMP;
    passenger_email VARCHAR(40);
BEGIN
    -- Corrected query to get the departure time and passenger email
    SELECT ts.departure_time, p.email
    INTO departure_time, passenger_email
    FROM public.train_schedules ts
    JOIN public.trips t ON t.train_id = ts.train_id  -- Link trips to train_schedules
    JOIN public.bookings b ON b.trip_id = t.trip_id  -- Link bookings to trips
    JOIN public.passenger p ON p.passenger_id = b.user_id  -- Get passenger email
    WHERE ts.schedule_id = NEW.schedule_id;

    -- Check if current time is 3 hours before departure
    IF departure_time - INTERVAL '3 hours' <= NOW() THEN
        -- Send message notification to an external service
        PERFORM pg_notify('send_departure_email', passenger_email);
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.notify_passenger_before_departure() OWNER TO postgres;

--
-- TOC entry 239 (class 1255 OID 17410)
-- Name: send_payment_reminder(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.send_payment_reminder() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Check if the status of the payment is 'Unpaid'
    IF NEW.status = 'pending' THEN
        -- Notify the external listener to send the email
        PERFORM pg_notify('send_payment_email', NEW.passenger_id::text);
    END IF;

    -- Return the modified row
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.send_payment_reminder() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 17411)
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    admin_id character varying(10) NOT NULL,
    name character varying(30) NOT NULL,
    email character varying(40),
    password character varying(30) NOT NULL
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 17414)
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    reservation_number integer NOT NULL,
    booking_date date NOT NULL,
    seating_class character varying(8),
    seat_number integer NOT NULL,
    user_id character varying(10) NOT NULL,
    trip_id integer NOT NULL,
    CONSTRAINT seating_class CHECK (((seating_class)::text = ANY (ARRAY[('economy'::character varying)::text, ('business'::character varying)::text])))
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17418)
-- Name: bookings_reservation_number_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.bookings ALTER COLUMN reservation_number ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.bookings_reservation_number_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 100000
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 17419)
-- Name: bookings_seat_number_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.bookings ALTER COLUMN seat_number ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.bookings_seat_number_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 300
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 17420)
-- Name: bookings_trip_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.bookings ALTER COLUMN trip_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.bookings_trip_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 100000
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 17421)
-- Name: dependents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dependents (
    dependent_id character varying(10) NOT NULL,
    name character varying(30) NOT NULL,
    sex character varying(1) NOT NULL,
    relationship character varying(10) NOT NULL,
    passenger_id character varying(10) NOT NULL
);


ALTER TABLE public.dependents OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17424)
-- Name: passenger; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.passenger (
    passenger_id character varying(10) NOT NULL,
    fname character varying(30) NOT NULL,
    lname character varying(30) NOT NULL,
    phone_number character(10) NOT NULL,
    email character varying(40),
    password character varying(30) NOT NULL,
    miles numeric(10,2)
);


ALTER TABLE public.passenger OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17427)
-- Name: payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment (
    payment_id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    status character varying(10) NOT NULL,
    reservation_number integer NOT NULL,
    CONSTRAINT payment_status_types CHECK (((status)::text = ANY (ARRAY[('paid'::character varying)::text, ('pending'::character varying)::text, ('cancelled'::character varying)::text])))
);


ALTER TABLE public.payment OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17431)
-- Name: payment_payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.payment ALTER COLUMN payment_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.payment_payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 100000
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 17432)
-- Name: staff; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff (
    staff_id integer NOT NULL,
    name character varying(30) NOT NULL,
    role character varying(10) NOT NULL
);


ALTER TABLE public.staff OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17435)
-- Name: staff_assign; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff_assign (
    staff_id integer NOT NULL,
    train_id character varying(10),
    date date NOT NULL
);


ALTER TABLE public.staff_assign OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 17438)
-- Name: staff_staff_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.staff ALTER COLUMN staff_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.staff_staff_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 10000
    CACHE 1
);


--
-- TOC entry 229 (class 1259 OID 17439)
-- Name: stations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stations (
    station_name character varying(30) NOT NULL,
    sequence_number integer NOT NULL
);


ALTER TABLE public.stations OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 17442)
-- Name: stations_sequence_number_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.stations ALTER COLUMN sequence_number ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.stations_sequence_number_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 10000
    CACHE 1
);


--
-- TOC entry 231 (class 1259 OID 17443)
-- Name: tracks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tracks (
    track_id character varying(10) NOT NULL,
    from_station character varying(30) NOT NULL,
    to_station character varying(30) NOT NULL
);


ALTER TABLE public.tracks OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 17446)
-- Name: train_schedules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.train_schedules (
    schedule_id character varying(10) NOT NULL,
    date date NOT NULL,
    train_id character varying(10) NOT NULL,
    track_id character varying(10) NOT NULL,
    sequence_number integer NOT NULL,
    arrival_time timestamp without time zone,
    departure_time timestamp without time zone
);


ALTER TABLE public.train_schedules OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 17449)
-- Name: trains; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trains (
    train_id character varying(10) NOT NULL,
    train_name_en character varying(30) NOT NULL,
    train_name_ar character varying(30),
    capacity integer NOT NULL,
    CONSTRAINT standard_id_format CHECK (((train_id)::text ~~ 'TR%'::text))
);


ALTER TABLE public.trains OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 17453)
-- Name: trips; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trips (
    trip_id integer NOT NULL,
    date date NOT NULL,
    train_id character varying(10) NOT NULL,
    from_station character varying(30) NOT NULL,
    to_station character varying(30) NOT NULL
);


ALTER TABLE public.trips OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 17456)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    national_id character varying(10) NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 17459)
-- Name: waiting_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.waiting_list (
    waiting_id integer NOT NULL,
    waiting_status character varying(10) NOT NULL,
    trip_id integer NOT NULL,
    passenger_id character varying(10) NOT NULL,
    CONSTRAINT waiting_status_types CHECK (((waiting_status)::text = ANY (ARRAY[('temporary'::character varying)::text, ('permanent'::character varying)::text])))
);


ALTER TABLE public.waiting_list OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 17463)
-- Name: waiting_list_waiting_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.waiting_list ALTER COLUMN waiting_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.waiting_list_waiting_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 10000
    CACHE 1
);


--
-- TOC entry 4760 (class 2606 OID 17465)
-- Name: admin admin_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_email_key UNIQUE (email);


--
-- TOC entry 4762 (class 2606 OID 17467)
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (admin_id);


--
-- TOC entry 4764 (class 2606 OID 17469)
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (reservation_number);


--
-- TOC entry 4766 (class 2606 OID 17471)
-- Name: dependents dependents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dependents
    ADD CONSTRAINT dependents_pkey PRIMARY KEY (dependent_id);


--
-- TOC entry 4768 (class 2606 OID 17473)
-- Name: passenger passenger_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passenger
    ADD CONSTRAINT passenger_email_key UNIQUE (email);


--
-- TOC entry 4770 (class 2606 OID 17475)
-- Name: passenger passenger_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passenger
    ADD CONSTRAINT passenger_pkey PRIMARY KEY (passenger_id);


--
-- TOC entry 4772 (class 2606 OID 17477)
-- Name: payment payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (payment_id);


--
-- TOC entry 4776 (class 2606 OID 17479)
-- Name: staff_assign pk_staff_assign; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_assign
    ADD CONSTRAINT pk_staff_assign PRIMARY KEY (staff_id);


--
-- TOC entry 4774 (class 2606 OID 17481)
-- Name: staff staff_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (staff_id);


--
-- TOC entry 4778 (class 2606 OID 17483)
-- Name: stations stations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stations
    ADD CONSTRAINT stations_pkey PRIMARY KEY (sequence_number);


--
-- TOC entry 4780 (class 2606 OID 17485)
-- Name: stations stations_station_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stations
    ADD CONSTRAINT stations_station_name_key UNIQUE (station_name);


--
-- TOC entry 4782 (class 2606 OID 17487)
-- Name: tracks tracks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tracks
    ADD CONSTRAINT tracks_pkey PRIMARY KEY (track_id);


--
-- TOC entry 4784 (class 2606 OID 17489)
-- Name: train_schedules train_schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.train_schedules
    ADD CONSTRAINT train_schedules_pkey PRIMARY KEY (schedule_id);


--
-- TOC entry 4786 (class 2606 OID 17491)
-- Name: trains trains_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trains
    ADD CONSTRAINT trains_pkey PRIMARY KEY (train_id);


--
-- TOC entry 4788 (class 2606 OID 17493)
-- Name: trips trips_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trips_pkey PRIMARY KEY (trip_id);


--
-- TOC entry 4790 (class 2606 OID 17495)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (national_id);


--
-- TOC entry 4792 (class 2606 OID 17497)
-- Name: waiting_list waiting_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waiting_list
    ADD CONSTRAINT waiting_list_pkey PRIMARY KEY (waiting_id);


--
-- TOC entry 4811 (class 2620 OID 17498)
-- Name: train_schedules trigger_notify_passenger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_notify_passenger AFTER INSERT ON public.train_schedules FOR EACH ROW EXECUTE FUNCTION public.notify_passenger_before_departure();


--
-- TOC entry 4795 (class 2606 OID 17499)
-- Name: dependents fk_dependent_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dependents
    ADD CONSTRAINT fk_dependent_id FOREIGN KEY (dependent_id) REFERENCES public.users(national_id);


--
-- TOC entry 4801 (class 2606 OID 17504)
-- Name: tracks fk_from_station; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tracks
    ADD CONSTRAINT fk_from_station FOREIGN KEY (from_station) REFERENCES public.stations(station_name);


--
-- TOC entry 4806 (class 2606 OID 17509)
-- Name: trips fk_from_station_trip; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT fk_from_station_trip FOREIGN KEY (from_station) REFERENCES public.stations(station_name);


--
-- TOC entry 4797 (class 2606 OID 17514)
-- Name: passenger fk_passenger_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passenger
    ADD CONSTRAINT fk_passenger_id FOREIGN KEY (passenger_id) REFERENCES public.users(national_id);


--
-- TOC entry 4796 (class 2606 OID 17519)
-- Name: dependents fk_passenger_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dependents
    ADD CONSTRAINT fk_passenger_id FOREIGN KEY (passenger_id) REFERENCES public.passenger(passenger_id);


--
-- TOC entry 4809 (class 2606 OID 17524)
-- Name: waiting_list fk_passenger_id_wait; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waiting_list
    ADD CONSTRAINT fk_passenger_id_wait FOREIGN KEY (passenger_id) REFERENCES public.passenger(passenger_id);


--
-- TOC entry 4798 (class 2606 OID 17529)
-- Name: payment fk_reservation_number_pay; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT fk_reservation_number_pay FOREIGN KEY (reservation_number) REFERENCES public.bookings(reservation_number);


--
-- TOC entry 4810 (class 2606 OID 17534)
-- Name: waiting_list fk_schedule_id_wait; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waiting_list
    ADD CONSTRAINT fk_schedule_id_wait FOREIGN KEY (trip_id) REFERENCES public.trips(trip_id);


--
-- TOC entry 4803 (class 2606 OID 17539)
-- Name: train_schedules fk_seq_num; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.train_schedules
    ADD CONSTRAINT fk_seq_num FOREIGN KEY (sequence_number) REFERENCES public.stations(sequence_number) NOT VALID;


--
-- TOC entry 4799 (class 2606 OID 17544)
-- Name: staff_assign fk_staff_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_assign
    ADD CONSTRAINT fk_staff_id FOREIGN KEY (staff_id) REFERENCES public.staff(staff_id) NOT VALID;


--
-- TOC entry 4802 (class 2606 OID 17549)
-- Name: tracks fk_to_station; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tracks
    ADD CONSTRAINT fk_to_station FOREIGN KEY (to_station) REFERENCES public.stations(station_name);


--
-- TOC entry 4807 (class 2606 OID 17554)
-- Name: trips fk_to_station_trip; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT fk_to_station_trip FOREIGN KEY (to_station) REFERENCES public.stations(station_name);


--
-- TOC entry 4804 (class 2606 OID 17559)
-- Name: train_schedules fk_track_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.train_schedules
    ADD CONSTRAINT fk_track_id FOREIGN KEY (track_id) REFERENCES public.tracks(track_id);


--
-- TOC entry 4800 (class 2606 OID 17564)
-- Name: staff_assign fk_train_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_assign
    ADD CONSTRAINT fk_train_id FOREIGN KEY (train_id) REFERENCES public.trains(train_id);


--
-- TOC entry 4805 (class 2606 OID 17569)
-- Name: train_schedules fk_train_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.train_schedules
    ADD CONSTRAINT fk_train_id FOREIGN KEY (train_id) REFERENCES public.trains(train_id);


--
-- TOC entry 4808 (class 2606 OID 17574)
-- Name: trips fk_train_id_trip; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT fk_train_id_trip FOREIGN KEY (train_id) REFERENCES public.trains(train_id);


--
-- TOC entry 4793 (class 2606 OID 17579)
-- Name: bookings fk_trip_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT fk_trip_id FOREIGN KEY (trip_id) REFERENCES public.trips(trip_id);


--
-- TOC entry 4794 (class 2606 OID 17584)
-- Name: bookings fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(national_id);


-- Completed on 2024-12-14 23:06:03

--
-- PostgreSQL database dump complete
--

