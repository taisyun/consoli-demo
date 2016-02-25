import Server from 'socket.io'
import configureStoreWithIniData from './configureStoreWithIniData'

const namespace = 'fnclstmt1'

export default function configureStoreWithSocket(io) {

  const store = configureStoreWithIniData()

  const items = io.of('/' + namespace)
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

  return store
}

