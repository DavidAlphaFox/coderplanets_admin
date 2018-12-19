// import R from 'ramda'

import {
  makeDebugger,
  $solver,
  asyncErr,
  asyncRes,
  closePreviewer,
  isObject,
  ERR,
} from '../../utils'

import SR71 from '../../utils/network/sr71'
import S from './schema'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:ThreadEditor')
/* eslint-enable no-unused-vars */

let store = null

export const inputOnChange = (part, e) => {
  if (!store) return false
  const value = isObject(e) ? e.target.value : e
  store.updateEditing({ [part]: value })
}

export const mutateConfirm = () => {
  console.log('mutateConfirm store: ', store.editThreadData)
  sr71$.mutate(S.createThread, store.editThreadData)
}

export function cancleEdit() {
  store.markState({
    community: {},
    isEdit: false,
  })
  closePreviewer()
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('createThread'),
    action: () => {
      closePreviewer()
      // closePreviewer(TYPE.COMMUNITIES_REFRESH)
    },
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.CRAPHQL),
    action: ({ details }) => {
      debug('ERR.CRAPHQL -->', details)
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      debug('ERR.TIMEOUT -->', details)
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: ({ details }) => {
      debug('ERR.NETWORK -->', details)
    },
  },
]

export function init(_store) {
  if (store) return false
  store = _store

  debug(store)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}
