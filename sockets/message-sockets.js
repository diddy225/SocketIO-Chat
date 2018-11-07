const db = require("../model");

const users = {};

module.exports = io => {
  io.on("connection", (socket) => {
    //SOCKET ROUTES
    socket.on("new-user", (data) => {
      console.log(data);
      users[data.name] = socket;
      io.emit('emit-users', Object.keys(users))
    });

    socket.on('new-change', (newData) => {
      console.log('newdata', newData);
      const socket1 = users[newData.user1];
      const socket2 = users[newData.user2];

      socket1.emit('emit-message', newData);
      socket2.emit('emit-message', newData);
    })

    socket.on("send-message", (data) => {
      db.Message.create(data);
      console.log(data)
      io.emit("display-message", data);
    });
  });
};
