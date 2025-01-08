
-- Insert data into the trains table
INSERT INTO public.trains (train_id, train_name_en, train_name_ar, capacity) 
VALUES 
('TR001', 'Express Train', 'قطار سريع', '300'),
('TR002', 'Express Train', 'قطار سريع', '300');

-- Insert data into the users table
INSERT INTO public.users (national_id, name) 
VALUES 
('2196622555', 'Kenan'),
('2000000000', 'Mohammed'),
('1000000000', 'Omar'),
('1000000001', 'Khalid'),
('1000000002', 'Hassan');

INSERT INTO public.stations (station_name, sequence_number) 
VALUES 
('Station A', 1),
('Station B', 2),
('Station D', 3),
('Station C', 4);

-- Insert data into the trips table
INSERT INTO public.trips (trip_id, date, train_id, from_station, to_station) 
VALUES 
(1, '2025-01-02', 'TR001', 'Station A', 'Station B'),
(2, '2025-01-04', 'TR001', 'Station B', 'Station A'),
(3, '2025-01-03', 'TR002', 'Station A', 'Station B'),
(4, '2025-01-05', 'TR002', 'Station B', 'Station A'),
(5, '2025-01-05', 'TR001', 'Station A', 'Station C'),
(6, '2025-01-06', 'TR002', 'Station A', 'Station D');



INSERT INTO public.bookings (reservation_number, booking_date, seating_class, seat_number, user_id, trip_id) 
VALUES 
(1, '2025-01-01', 'economy', 1, '2196622555',  1),
(2, '2025-01-01', 'economy', 2, '1000000000',  1),
(3, '2025-01-02', 'business',3, '2000000000',  1),
(4, '2025-01-02', 'economy',1, '2196622555',  2),
(5, '2025-01-03', 'economy',2, '1000000000',  2),
(6, '2025-01-03', 'business', 3, '2000000000',  2);


-- Insert data into the admin table
INSERT INTO public.admin (admin_id, name, email, password) 
VALUES 
('A001', 'Admin', 'admin@example.com', 'admin');

-- Insert data into the passenger table
INSERT INTO public.passenger (passenger_id, fname, lname, phone_number, email, password, miles) 
VALUES 
('2196622555', 'Kenan', 'Kaddoura', '0571578219', 'kenanxdgazwan@gmail.com', '1111', 1500.00),
('1000000000', 'Omar', 'ALJOHANI', '0511111111', 'omaraljohani@gmail.com', '1111', 10),
('2000000000', 'Mohammed', 'FAadel', '0511111111', 'mohammed@gmail.com', '1111', 3000);


-- Insert data into the dependents table
INSERT INTO public.dependents (dependent_id, name, sex, relationship, passenger_id) 
VALUES 
('1000000001', 'Khalid', 'M', 'Son', '1000000000'),
('1000000002', 'Hassan', 'M', 'Son', '1000000000');


-- Insert data into the payment table
INSERT INTO public.payment (payment_id, amount, status, reservation_number) 
VALUES 
(1, 100.00, 'paid', 1),
(2, 100.00, 'paid', 2),
(3, 250.00, 'paid', 3),
(4, 100.00, 'paid', 4),
(5, 100.00, 'pending', 5),
(6, 250.00, 'pending', 6);

-- Insert data into the staff table
INSERT INTO public.staff (staff_id, name, role) 
VALUES 
(1, 'Alice Smith', 'Driver'),
(2, 'Hussam Mohammed', 'Driver'),
(3 ,'Nahid Ahmed', 'Driver'),
(4, 'Alice Smith', 'Driver');

-- Insert data into the staff_assign table

INSERT INTO public.staff_assign (staff_id, train_id, date) 
VALUES 
(1, 'TR001', '2025-01-01'),
(2, 'TR002', '2025-01-01');

-- Insert data into the stations table


-- Insert data into the tracks table
INSERT INTO public.tracks (track_id, from_station, to_station) 
VALUES 
('TK001', 'Station A', 'Station B'),
('TK002', 'Station B', 'Station A'),
('TK003', 'Station A', 'Station C'),
('TK004', 'Station A', 'Station D');

-- Insert data into the train_schedules table

INSERT INTO public.train_schedules 
    (schedule_id, date, train_id, track_id, sequence_number, arrival_time, departure_time) 
VALUES 	
	('S001', '2025-01-02', 'TR001', 'TK001', 1 , '2025-01-02 12:00:00', '2025-01-02 08:00:00'),
	('S002', '2025-01-04', 'TR001', 'TK002', 2 , '2025-01-04 04:00:00', '2025-01-04 01:00:00'),
	('S003', '2025-01-03', 'TR002', 'TK001', 1 , '2025-01-03 12:00:00', '2025-01-03 08:00:00'),
	('S004', '2025-01-05', 'TR002', 'TK002', 2 , '2025-01-05 08:00:00', '2025-01-05 04:00:00'),
	('S005', '2025-01-05', 'TR001', 'TK003', 3 , '2025-01-05 12:00:00', '2025-01-05 08:00:00'),
	('S006', '2025-01-06', 'TR002', 'TK004', 4 , '2025-01-06 05:00:00', '2025-01-06 02:00:00');






-- Insert data into the waiting_list table
INSERT INTO public.waiting_list (waiting_id, waiting_status, trip_id, passenger_id) 
VALUES 
(1, 'temporary', 1, '2196622555'),
(2, 'temporary', 3, '1000000000');


