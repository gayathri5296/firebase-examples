import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './components/App'

const draw = Component => {
    render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    )
}

draw(App)

if (module.hot) {
    module.hot.accept('./components/App', () => { draw(App) })
}