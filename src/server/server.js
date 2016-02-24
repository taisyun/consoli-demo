import Server from 'socket.io'
import fnclstmt1_configureStoreWithSocket from './fnclstmt1/configureStoreWithSocket'
import fnclstmt2_configureStoreWithSocket from './fnclstmt2/configureStoreWithSocket'
import consolidated_configureStoreWithSocket from './consolidated/configureStoreWithSocket'
import calculation from './calculation'

export default function startServer(httpServer) {

  let io
  if(httpServer != null) {
    io = new Server(httpServer)
  } else {
    io = new Server().attach(8090)
  }
  const fnclstmt1_store = fnclstmt1_configureStoreWithSocket(io)
  const fnclstmt2_store = fnclstmt2_configureStoreWithSocket(io)
  const consolidated_store = consolidated_configureStoreWithSocket(io)

  calculation(fnclstmt1_store, fnclstmt2_store, consolidated_store)
  
  console.log('socket.io server started')
}
