Hello and welcome to the server side of the MaintControl project :)
This file will include everything you need to know in order to develop the server.

This folder includes:
1. Server architcures
2. Installations insturctions
3. Postman Requests

------------------------ Installations ----------------------
1. run in the command line the commands:'npm init' and then 'npm install' in order to install 
all the pacakges of npm we used in the project.

2. create a local postgress server in your computer and run the following commands in the psql cmd:
----1-----
'CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
role VARCHAR(20) NOT NULL CHECK(role='maintainance' OR role='manager' OR role='administrator'));'
----------

3. we are using nodemon, in order to use it run the command: 'npm run dev'.