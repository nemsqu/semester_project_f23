Backend instructions
==========

Structure
---------
The backend is built using Node.js and Mongoose (MongoDB).
The database includes three different tables:
* "Method" including all available transportation methods and their average emissions and fuel consumption
* "Fuel" including all available fuels and the emissions due to their production (well-to-tank)
* "Electricity" including emissions from producing elecricity using different fuels

Usage
------
To start the backend server, copy the code to a folder of your choice and in that folder run the command `node.js start` or `node app.js`. This will automatically start the server and populate the database with the data found in _inputData.js_ (if the database is empty).

To retrieve data from the database there are `GET` api routes for each table. These can be found from _index.js_.
For example, running `GET http://localhost:3000/api/methods` will return all data from the "Method" table as a list of json objects.

To add data after starting the server, similar `POST` methods are available in _index.js_. All values to be added to the database need to be inluded in the request body.

Problem solving
----------------
Running with an Andrdoid emulator: If connections from the app to the backend don't work, try running `adb reverse tcp:3000 tcp:3000` in the terminal to fix port issues with the emulator.