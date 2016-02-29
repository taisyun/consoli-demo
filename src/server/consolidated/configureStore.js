import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createNodeLogger from 'redux-node-logger'
import rootReducer from './reducer'


export default function configureStore(initialState) {

  const loggerMiddleware = createNodeLogger()
  const enhancer = applyMiddleware(
    thunkMiddleware
//   ,loggerMiddleware
  )
  const store = createStore(rootReducer, initialState, enhancer)

  return store
}
