import React, { useState, useEffect } from 'react'
import './starter.css'

const X = 'X'
const O = 'O'

function caculateWinner(squares) {
  const win = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 3, 6, 9 ],
  ]
}

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      history: [ { squares: Array(9).fill(null) } ],
      isNextX: O,
    }
  }

  handleClick(i) {
    this.setState(prevState => {
      const history = prevState.history
      const squares = history[history.length - 1].squares.slice()
      squares[i] = prevState.isNextX ? X : O

      return {
        history: history.concat([ { squares } ]),
        isNextX: !prevState.isNextX
      }
    })
  }

  render() {
    const moves = this.state.history.map((squares, i) => {
      const descipt = !i ? 'move start' : `move: ${i}`
      return (
        <li key={i}>
          <button onClick={() => this.jumpTo(i)}>{descipt}</button>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={this.state.history[this.state.stepNumber]} onClick={i => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let status
    const winner = caculateWinner(this.props.squeres)

    if(winner)
      status = `Winner: ${winner}`
    else
      status = `Next player: ${this.state.isNextX ? X : O}`;

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

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}
