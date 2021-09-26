import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const e = React.createElement

function App() {
  const [ counter, setCounter ] = useState(0)

  function handleClick() {
    setCounter(current => current + 1)
  }

  return e(
    'div',
    null,
    e('h2', null, 'Hello, React world.'),
    e(ButtonTrigger, { counter, handleClick }),
  )
}

function Button(props) {
  return e(
    'button',
    { style: { background: 'red' }, onClick: props.handleClick, },
    props.children,
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
