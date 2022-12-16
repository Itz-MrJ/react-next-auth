import { Server } from 'Socket.IO';
import { connectToDatabase } from "../../lib/mongodb";
var sockets = {};

const SocketHandler = async (req, res) => {
  // if (res.socket.server.io) {
  //   res.socket.server.io.on('connection', async socket => {
  //     socket.join("kitchen");
  //     socket.on('ORDER', msg => {
  //         console.log(msg, "in order");
  //         res.socket.server.io.to("kitchen").emit("PREPARING", {});
  //     })
  // })
  //   console.log('Socket is already running');
  // } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    const { database } = await connectToDatabase();
    let result = await database.collection("kitchen").findOne({'kitchen': 'kitchen'});
    io.on('connection', async socket => {
        // socket.join("kitchen");
        socket.on('ORDER', async msg => {
          console.log(msg);
            result['order'].push(msg);
            await database.collection("kitchen").updateOne({'kitchen': 'kitchen'}, {$set: {'order': result['order']}})
            io.to("kitchen").emit("PREPARING", 'PUSHED');
        })
    })
  // }
  res.end()
}

export default SocketHandler