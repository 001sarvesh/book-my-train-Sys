-- Insert stations
INSERT INTO stations (name) VALUES 
('Patan'),
('Palanpur'),
('Ahmedabad'),
('Gandhinagar'),
('Kanpur'),
('Delhi'),
('Bangalore');

-- Insert trains
INSERT INTO trains (name, date, time, source_station_id, dest_station_id, capacity) VALUES
('Express 101', CURDATE(), '10:00:00', 
    (SELECT station_id FROM stations WHERE name = 'Patan'),
    (SELECT station_id FROM stations WHERE name = 'Palanpur'),
    100
),
('Express 102', CURDATE(), '14:00:00', 
    (SELECT station_id FROM stations WHERE name = 'Patan'),
    (SELECT station_id FROM stations WHERE name = 'Palanpur'),
    150
),
('Express 103', CURDATE(), '16:00:00', 
    (SELECT station_id FROM stations WHERE name = 'Palanpur'),
    (SELECT station_id FROM stations WHERE name = 'Ahmedabad'),
    200
),
-- Kanpur to Delhi trains
('Shatabdi Express', CURDATE(), '06:00:00',
    (SELECT station_id FROM stations WHERE name = 'Kanpur'),
    (SELECT station_id FROM stations WHERE name = 'Delhi'),
    300
),
('Rajdhani Express', CURDATE(), '15:30:00',
    (SELECT station_id FROM stations WHERE name = 'Kanpur'),
    (SELECT station_id FROM stations WHERE name = 'Delhi'),
    350
),
-- Delhi to Bangalore trains
('Karnataka Express', CURDATE(), '08:00:00',
    (SELECT station_id FROM stations WHERE name = 'Delhi'),
    (SELECT station_id FROM stations WHERE name = 'Bangalore'),
    400
),
('Bangalore Superfast', CURDATE(), '20:00:00',
    (SELECT station_id FROM stations WHERE name = 'Delhi'),
    (SELECT station_id FROM stations WHERE name = 'Bangalore'),
    450
); 