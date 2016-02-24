import io from 'socket.io-client'
import { resetEdited, setState } from '../redux/actions'

export default class SocketManager {

  constructor() {

  }

  bindToStore(store) {
    this.store = store

//    this.connectToNamespace('fnclstmt2')
  }

  connectToNamespace(namespace) {

    if( this.store == null ) {
      throw "store must be set"
    }


    if( this.socket ) {
      this.socket.on('state', state => {})
      this.socket = undefined
    }

    this.socket = io(`${location.protocol}//${location.hostname}:${location.port}/${namespace}`)

    this.socket.on('state', state => {
      this.store.dispatch(resetEdited());
      this.store.dispatch(setState(state))
    })

  }
}
