const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// mongoose.connect('mongodb://localhost/realTimeChat', { useNewUrlParser: true});
mongoose.connect('mongodb://user:pass123@ds211694.mlab.com:11694/heroku_sbgfz701', { useNewUrlParser: true});

require('./sockets/message-sockets.js')(io);
require('./routes/html-routes.js')(app);
require('./routes/api-routes.js')(app);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})