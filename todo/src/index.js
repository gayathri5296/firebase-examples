import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import TodoApp from './components/App'

const draw = Component => {
    render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    )
}

draw(TodoApp)

if (module.hot) {
    module.hot.accept('./components/App', () => { draw(TodoApp) })
}