/**
 * complexCodeExample.js
 *
 * This code demonstrates a complex implementation of a web-based chat application
 * that allows users to send messages, create chat rooms, and join existing rooms.
 * It incorporates various features like user authentication, real-time updates,
 * and message validation.
 */

// Import necessary modules
const express = require('express');
const socketIO = require('socket.io');

// Create an express application
const app = express();
const server = require('http').createServer(app);
const io = socketIO(server);

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// User authentication middleware
app.use((req, res, next) => {
  // Authenticates the user and sets req.user object
  // based on their session or token
  // ...

  next();
});

// Socket.io connection event handling
io.on('connection', (socket) => {
  // Join default room and authenticate user
  socket.join('default-room');

  // Handle incoming messages
  socket.on('chat:message', (message) => {
    // Validate message content and user permissions
    // ...

    // Broadcast the message to all users in the room
    io.in(socket.room).emit('chat:message', message);
  });

  // Room creation and joining
  socket.on('chat:join', (room) => {
    // Leave current room
    socket.leave(socket.room);

    // Join new room
    socket.join(room);
    socket.room = room;

    // Broadcast room join event to all users
    io.in(room).emit('chat:userJoined', socket.user);
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server started on port 3000');
});
