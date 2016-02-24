import Server from 'socket.io'
import fnclstmt1_configureSocket from './fnclstmt1/configureSocket'
import fnclstmt2_configureSocket from './fnclstmt2/configureSocket'

export default function startServer(httpServer) {

  const io = new Server(httpServer)
  fnclstmt1_configureSocket(io)
  fnclstmt2_configureSocket(io)

}
