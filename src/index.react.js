import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import Sign from './components/sign'
import Button from './components/button'
import Board from './components/starter'
import Game from './components/lineBoard'
import Arkham from './components/arkham'

const e = React.createElement

function App() {
  const [ counter, setCounter ] = useState(0)

  function handleClick() {
    setCounter(current => current + 1)
  }

  return e(
    'div',
    null,
    // e('h2', null, 'Hello, React world.'),
    // e(ButtonTrigger, { counter, handleClick }),
    <Game />
  )
}

function ButtonTrigger(props) {
  return e(
    Button,
    props,
    'A Trigger Button: ' + props.counter
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
