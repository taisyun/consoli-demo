import configureStore from './configureStore'
import { loadInitData } from '../../redux/actions'

export default function configureStoreWithIniData() {

  const store = configureStore()

  const initialData = require('../../data/data_11000.json')

  store.dispatch.bind(store)(loadInitData(initialData))

  return store
}
