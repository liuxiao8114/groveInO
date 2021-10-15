import React, { useState, useEffect } from 'react'
import './starter.css'

const X = 'X'
const O = 'O'

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isNextX: false,
    };
  }

  handleClick(i) {
    this.setState(prevState => {
      const squares = prevState.squares.slice()
      squares[i] = prevState.isNextX ? X : O

      return {
        squares: prevState,
        isNextX: !prevState.isNextX
      }
    })
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// function Board() {
//   const [ squares, setSquares ] = useState(Array(9).fill(null))
//   const [ isNextX, setNextX ] = useState()
//
//   function handleClick(i) {
//     setSquares(() => {
//       squares.slice()[i] = X
//     })
//
//     setNextX()
//   }
//
//   function renderSquare(i) {
//     return <Square value={squares[i]} onClick={ () => handleClick(i) }/>
//   }
//
//   const status = `Next player: ${isNextX}`
//
//   return (
//     <div>
//       <div className="status">{status}</div>
//       <div className="board-row">
//         {this.renderSquare(0)}
//         {this.renderSquare(1)}
//         {this.renderSquare(2)}
//       </div>
//       <div className="board-row">
//         {this.renderSquare(3)}
//         {this.renderSquare(4)}
//         {this.renderSquare(5)}
//       </div>
//       <div className="board-row">
//         {this.renderSquare(6)}
//         {this.renderSquare(7)}
//         {this.renderSquare(8)}
//       </div>
//     </div>
//   )
// }
