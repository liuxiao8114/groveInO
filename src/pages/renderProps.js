import React, { useState } from 'react'

const e = React.createElement

export function OriginalTracker() {
  const [ x, setX ] = useState(0)
  const [ y, setY ] = useState(0)

  function handleMouseMove(event) {
    setX(event.clientX)
    setY(event.clientY)
  }

  return e(
    'div',
    { style: { height: '100vh' }, onMouseMove: handleMouseMove, },
    e('h1', null, 'Move the mouse around!'),
    e('p', null, `The current mouse position is (${x}, ${y})`)
  )
}

export function CallMouseTracker() {
  return CallDynamicMouseTracker()
}

function CallDynamicMouseTracker() {
  return e(
    'div',
    null,
    e('h1', null, 'Move the mouse around!'),
    // e(Mouse, { render: ({ x, y }) => e(Cat, { x, y }) }),
    e(Mouse, null, ({ x, y }) => e(Cat, { x, y }))
  )
}

// function CallStaticMouseTracker() {
//   return e(
//     'div',
//     null,
//     e('h1', null, 'Move the mouse around!'),
//     e(Cat, { x: 1, y: 2, }),
//     e(
//       Mouse,
//       { render: ({ x, y }) => `The current mouse position is (${x}, ${y})` },
//     ),
//   )
// }

function Mouse(props) {
  const [ x, setX ] = useState(0)
  const [ y, setY ] = useState(0)

  function handleMouseMove(event) {
    setX(event.clientX)
    setY(event.clientY)
  }

  return e(
    'div',
    { style: { height: '100vh' }, onMouseMove: handleMouseMove },
    props.children({ x, y }),
  )
}

function Cat({ x, y }) {
  return e(
    'div',
    null,
    `Cat caught the position ${x}, ${y}`
  )
}
