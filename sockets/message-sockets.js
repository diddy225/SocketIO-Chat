const db = require("../model");

module.exports = (io)=> {
  io.on("connection", (socket) => {
    //SOCKET ROUTES
    socket.on("send-message", (data) => {
      db.Message.create(data)
      io.emit("display-message", (data));
    });
  })
}
