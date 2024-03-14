
-- THIS IS A SAMPLE SQL COMMANDS TO FILL SAMPLE DATA IN THE DATABASE

CREATE DATABASE qstar;

CREATE TABLE police(
    _policeId SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fullName VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL ,
    station_address VARCHAR(255),
    station_name VARCHAR(100) NOT NULL
);

CREATE TABLE users(
    userId SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fullName VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL ,
    locale_name VARCHAR(255),
    locale_address VARCHAR(255),
    locale_type VARCHAR(100) NOT NULL
);

CREATE TABLE camera(
    camid SERIAL PRIMARY KEY,
    cameraname VARCHAR(50) NOT NULL,
    userid INT NOT NULL ,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    camaddress VARCHAR NOT NULL,
    postalcode VARCHAR NOT NULL,
    visibilityRange VARCHAR(15) NOT NULL,
    status VARCHAR(10),
    timestamp TIMESTAMPTZ,
    entitytype VARCHAR(20) NOT NULL,
    model VARCHAR(255) NOT NULL,
    resolution varchar(255) NOT NULL,
    record_capacity varchar(255)
);

CREATE TABLE tampering_events (
    eventid SERIAL PRIMARY KEY,
    camid INTEGER REFERENCES camera(camid),
    timestamp TIMESTAMPTZ
);

CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    camid INT,
    timestamp TIMESTAMP,
    message VARCHAR(50)
);


INSERT INTO camera (cameraname, userid, latitude, longitude, visibilityRange, status,model,resolution,record_capacity, entitytype)
VALUES
    ('Hawa Mahal', 1, 26.92614115, 75.82671485, '100', 'Active','4k2160','3840x2160','100GB', 'private'),
    ('Amer Fort', 2, 26.99118400, 75.85325106, '50', 'Active','Night20','1920x1080','100GB', 'private'),
    ('Patrika Gate', 3, 26.84398861, 75.80979622, '25.0', 'Inactive','InfraRed','480x260','1TB', 'public'),
    ('Rajasthan International Center', 3, 26.86707693, 75.81913108, '25.0', 'Active','YYH5f','1920x1080','1TB', 'public');

INSERT INTO police (username, email, password, fullName, phone, station_address, station_name)
VALUES
    ('inspector_gupta', 'gupta@example.com', 'hashed_password_1', 'Inspector Gupta', '9876543210', '12/345 Police Lane', 'City Police Station'),
    ('constable_sharma', 'sharma@example.com', 'hashed_password_2', 'Constable Sharma', '7890123456', '45/678 Main Street', 'Downtown Police Station'),
    ('sub_inspector_kumar', 'kumar@example.com', 'hashed_password_3', 'Sub-Inspector Kumar', '9988776655', '78/910 Oak Street', 'Central Police Station');
