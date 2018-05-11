/*
 *
 * Route
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'
import Router, { withRouter } from 'next/router'
// import Router, { withRouter } from 'next/router'

// import Link from 'next/link'

import { makeDebugger, storeSelector } from '../../utils'
import { init, syncRoute } from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:Route')
/* eslint-enable no-unused-vars */

class RouteContainer extends React.Component {
  componentWillMount() {
    init(this.props.route)
    syncRoute(this.props.router)
    Router.onRouteChangeComplete = () => {
      // Router.onRouteChangeStart = url => {
      syncRoute(this.props.router)
    }
  }

  render() {
    return <div />
  }
}

export default inject(storeSelector('route'))(
  observer(withRouter(RouteContainer))
)
