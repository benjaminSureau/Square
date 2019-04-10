###Requirements

Clone the project: ``git clone https://github.com/benjaminSureau/Square.git``.

Install nodejs https://nodejs.org/en/download/

Install mongodb https://docs.mongodb.com/manual/installation/

Launch mongo server locally:

* ``Program Files/MongoDB/Server/4.0/bin/mongod --port 21017`` on windows
* ``sudo service mongod start`` on linux
* ``~/mongodb/bin/mongod`` on macos

Install nodejs dependencies ``npm install``

Run the project ``npm start``

###Docker

To start the service execute this command :

* ``docker-compose down`` -> Stop Process
* ``docker-compose build`` -> Build the container
* ``docker-compose up -d mongo`` -> Start Mongo DataBase
* ``docker-compose up web`` -> Start Web Api And Web Client

To delete the docker-compose : ``docker-compose rm``

Important : to use the container docker with node you must change the connection to mongo database :
Change this line in app.js : ``mongoose.connect("mongodb://localhost:27017/Square")`` to ``mongoose.connect("mongodb://mongo:27017/Square")``


###API

