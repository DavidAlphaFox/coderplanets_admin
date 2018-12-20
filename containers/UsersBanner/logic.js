// import R from 'ramda'

import { makeDebugger, $solver, asyncRes } from '../../utils'

import S from './schema'
import SR71 from '../../utils/network/sr71'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:UsersBanner')
/* eslint-enable no-unused-vars */

let store = null

export function loadUsers() {
  sr71$.query(S.pagedUsers, { filter: {}, userHasLogin: false })
}

export function onAdd() {}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('pagedUsers'),
    action: ({ pagedUsers: { totalCount: usersTotalCount } }) => {
      store.markState({ usersTotalCount })
    },
  },
]
const ErrSolver = []

export function init(selectedStore) {
  store = selectedStore

  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}
