import configureStore from './configureStore'
import { loadInitData } from '../../redux/actions'

export default function configureStoreWithIniData() {

  const store = configureStore()

//  const initialData = require('../../data/data_.json')

//  store.dispatch.bind(store)(loadInitData(initialData))

  return store
}
