import React from 'react'

import App from './App'
import Home from './Home'
import ConnectScrollsExample from './ConnectScrollsExample'
import KineticScrollExample from './KineticScrollExample'

const Root = () => (
  <div>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="connect-scrolls" component={ConnectScrollsExample} />
            <Route path="kinetic-scroll" component={KineticScrollExample} />
        </Route>
    </Router>
  </div>
)

export default Root