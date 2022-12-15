import { Server } from 'Socket.IO'
var sockets = {};

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    io.on('connection', async socket => {
        console.log(sockets);
        socket.join("room1");
        socket.on('check', msg => {
            console.log(msg);
            io.to("room1").emit("RECEIVED", "SERVER")
        })
    })
  }
  res.end()
}

export default SocketHandler