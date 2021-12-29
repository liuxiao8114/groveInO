import React, { useState, useEffect, useRef } from 'react'
import Button from './button'
import './sign.css'

export default function Sign() {
  const [ x, setX ] = useState(0)
  const [ y, setY ] = useState(0)
  const [ isMouseDown, setMouseDown ] = useState(false)
  const canvas = useRef(null)

  const WIDTH = 500
  const HEIGHT = 500

  function handleMouseDown(e) {
    setX(e.clientX)
    setY(e.clientY)
    setMouseDown(true)
    canvas.current.getContext('2d').beginPath()
  }

  function handleMouseMove(e) {
    if(isMouseDown) {
      setX(e.clientX)
      setY(e.clientY)
    }
  }

  function handleMouseUp() {
    setMouseDown(false)
    canvas.current.getContext('2d').stroke()
  }

  useEffect(() => {
    canvas.current.getContext('2d').arc(x, y, 0.5, 0, 2 * Math.PI)
  })

  function clear() {
    canvas.current.getContext('2d').clearRect(0, 0, WIDTH, HEIGHT)
  }

  function submit() {
    alert(canvas.current.toDataURL())
  }

  return (
    <div>
      <canvas className="box" ref={canvas} width={WIDTH} height={HEIGHT}
        onMouseDown={ handleMouseDown } onMouseMove={ handleMouseMove } onMouseUp={ handleMouseUp }
      />
      <Button className="btn_clear" handleClick={ clear }>Clear</Button>
      <Button className="btn_submit" handleClick={ submit }>Submit</Button>
    </div>
  )
}
