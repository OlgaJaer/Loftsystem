const connectedUsers = {};
const historyMessage = {};

const addMessageToHistory = (senderId, recipientId, data) => {
  if (historyMessage[senderId]) {
    if (historyMessage[senderId][recipientId]) {
      if (historyMessage[senderId][recipientId].length > 10) {
        historyMessage[senderId][recipientId].shift();
      }
      historyMessage[senderId][recipientId].push(data);
    } else {
      historyMessage[senderId][recipientId] = [];
      historyMessage[senderId][recipientId].push(data);
    }
  } else {
    historyMessage[senderId] = {};
    historyMessage[senderId][recipientId] = [];
    historyMessage[senderId][recipientId].push(data);
  }
};

module.exports.usersConnect = (socket, data, socketId) => {
  const user = { ...data, socketId, activeRoom: null };
  connectedUsers[socketId] = user;
  socket.emit("users:list", Object.values(connectedUsers));
  socket.broadcast.emit("users:add", user);
};
module.exports.messageAdd = (socket, data) => {
  const { senderId, recipientId } = data;
  socket.emit("message:add", data);
  socket.broadcast.to(data.roomId).emit("message:add", data);
  addMessageToHistory(senderId, recipientId, data);
  addMessageToHistory(recipientId, senderId, data);
};
module.exports.messageHistory = (socket, data) => {
  if (
    historyMessage[data.userId] &&
    historyMessage[data.userId][data.recipientId]
  ) {
    socket.emit(
      "message:history",
      historyMessage[data.userId][data.recipientId]
    );
  }
};
module.exports.usersDisconnect = (socket, socketId) => {
  delete connectedUsers[socketId];
  socket.broadcast.emit("users:leave", socketId);
};
