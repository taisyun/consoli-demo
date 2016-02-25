import { loadInitData } from '../redux/actions'

const key = 'ACCTCD'
const value = 'DRCR_FRGNAT'

function recalculate(fnclstmt1_store, fnclstmt2_store, consolidated_store) {
  const fnclstmt1_items = (fnclstmt1_store.getState().recordList || {}).items || []
  const fnclstmt2_items = (fnclstmt2_store.getState().recordList || {}).items || []

  console.log(`fnclstmt1_items.length=${fnclstmt1_items.length} fnclstmt2_items.length=${fnclstmt2_items.length}`)
  const result_items = []
  const items_array = [fnclstmt1_items, fnclstmt2_items]

  items_array.forEach( (items) => {
    items.forEach( (in_item) => {

      if( in_item[key] === "1111000") {
        debugger
      }

      let index = result_items.findIndex( (result_item) => {
        return result_item[key] != null && in_item[key] === result_item[key]
      })

      if(index === -1) {
        result_items.push(in_item)
      } else {
        const result_item = Object.assign( {}, result_items[index] )

        let value_in = in_item[value]
        let value_result = result_item[value]

        if (value_in == null && value_result == null) {
          // nop
        } else {
          value_in = +value_in || 0
          value_result = +value_result || 0
          value_result += value_in
          result_item[value] = value_result
          result_items[index] = result_item
        }
      }
    })
  })

  consolidated_store.dispatch.bind(consolidated_store)(loadInitData(result_items))
}

export default function calculation(fnclstmt1_store,
    fnclstmt2_store, consolidated_store) {

  fnclstmt1_store.subscribe(
    () => {
      recalculate(fnclstmt1_store, fnclstmt2_store,
                      consolidated_store)
    }
  )

  fnclstmt2_store.subscribe(
    () => {
      recalculate(fnclstmt1_store, fnclstmt2_store,
                      consolidated_store)
    }
  )

  recalculate(fnclstmt1_store, fnclstmt2_store,
                      consolidated_store)
}
