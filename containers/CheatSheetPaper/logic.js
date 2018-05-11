import R from 'ramda'

import Prism from 'mastani-codehighlight'
import { makeDebugger, ERR } from '../../utils'
import SR71 from '../../utils/network/sr71'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:cheatSheetPaper')
/* eslint-enable no-unused-vars */

const sr71$ = new SR71()
let cheatSheetPaper = null
let sub$ = null

/* cheatSheetPaper logic */
const groupSpliter = '{{ ::group:: }}'
const cardsHeaderSpliter = '{{ ::cards-header:: }}'
const cardItemSpliter = '{{ ::card-item:: }}'

const getCardHeader = R.compose(R.trim, R.head, R.split(cardsHeaderSpliter))
const getCardList = R.compose(R.trim, R.nth(1), R.split(cardsHeaderSpliter))
const getCardItems = R.compose(
  R.map(R.trim),
  R.split(cardItemSpliter),
  getCardList
)
const formatFromer = v => ({
  header: getCardHeader(v),
  cards: getCardItems(v),
})

export const transMarkDownforRender = R.compose(
  R.map(formatFromer),
  R.split(groupSpliter),
  R.trim
)

export const convertTaskTag = R.compose(
  R.replace(/<li>\[ \] /g, '<li class="task-pending">'),
  R.replace(/<li>\[x\] /g, '<li class="task-done">')
)

const CheatsheetCDN =
  'https://raw.githubusercontent.com/mydearxym/mastani-cheatsheets/master'

export function getData(which) {
  const url = `${CheatsheetCDN}/${which}.md`
  cheatSheetPaper.markState({
    state: 'loading',
  })
  sr71$.restGet(url)
}

function handleParseError(errMsg) {
  cheatSheetPaper.markState({
    current: '',
    state: 'parse_error',
    errMsg: String(errMsg),
  })
  Prism.highlightAll()
}

function handle404Error() {
  cheatSheetPaper.markState({
    current: '',
    state: '404',
  })
}

const maybeEmptyState = v => (R.isEmpty(v) ? 'empty' : 'loaded')
function handleLoaded(source) {
  cheatSheetPaper.markState({
    source,
    state: maybeEmptyState(source),
  })

  try {
    // in case document is undefined
    Prism.highlightAll()
  } catch (e) {
    debug(e)
  }
}

function handleError(res) {
  switch (res.error) {
    case ERR.PARSE_CHEATSHEET_MD:
      return handleParseError()
    case ERR.NETWORK:
      debug(`${res.error}: ${res.details}`)
      return false
    case ERR.NOT_FOUND:
      return handle404Error()
    case ERR.TIMEOUT:
      debug(`${res.error}: ${res.details}`)
      // sr71$.stop()
      return false

    default:
      debug('un handleError in ', cheatSheetPaper)
      debug('un handleError: ', res)
  }
}

export function init(selectedStore) {
  cheatSheetPaper = selectedStore

  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe(res => {
    if (res.error) return handleError(res)
    let source = ''
    debug('sr71 res: ', res)
    try {
      source = transMarkDownforRender(res)
    } catch (err) {
      return handleError({ error: ERR.PARSE_CHEATSHEET_MD })
    }
    handleLoaded(source)
  })
  getData('elixir')
}

export function unInit() {
  // TODO
  // avoid the duplicate subscribe caused by HMR
  // sub$.unsubscribe()
}
