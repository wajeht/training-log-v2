module.exports = (io, socket) => {
  const message = (msg) => {
    console.log(msg);
  };

  socket.on("chat message", message);
};
