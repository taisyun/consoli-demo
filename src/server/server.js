import Server from 'socket.io'
import configureStore from './configureStore'
import { loadInitData } from '../redux/actions'

export default function startServer(httpServer) {

  const store = configureStore()

  const io = new Server(httpServer)

  store.dispatch.bind(store)(loadInitData())

  const items = io.of('/joblist')
  // Emit 'state' to socket.io when Store changes
  store.subscribe(
    () => items.emit('state', store.getState())
  )

  items.on('connection', (socket) => {
    socket.emit('state', store.getState())

    // Feed action event from clients directly into store
    // Should probably put authentication here
    socket.on('action', store.dispatch.bind(store))
  })
}
