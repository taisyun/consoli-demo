import { loadInitData } from '../redux/actions'

const key = 'ACCTCD'
const value = 'DRCR_FRGNAT'

function recalculate(fnclstmt1_store, fnclstmt2_store, consolidated_store) {
  const fnclstmt1_items = (fnclstmt1_store.getState().recordList || {}).items || []
  const fnclstmt2_items = (fnclstmt2_store.getState().recordList || {}).items || []

  const result_items = fnclstmt1_items

  fnclstmt2_items.forEach( (fnclstmt2_item) => {
    let index = result_items.findIndex( (result_item) => {
      return result_item[key] == null && fnclstmt2_item[key] === result_item[key]
    })

    if(index === -1) {
      result_items.push(fnclstmt2_item)
    } else {
      const value_fnclstmt2 = (+fnclstmt2_item[value])
      let value_result = (+result_item[value])
      value_result += value_fnclstmt2
      result_item[value] = value_result
      result_items[index] = reslut_item
    }
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
}
