import React, { useState, useEffect } from 'react'

const re = React.createElement

const STATUS_MOVE = 'move'
const STATUS_INVEST = 'invest'
const STATUS_PAY = 'pay'
const STATUS_CHANCE = 'chance'
const STATUS_JAIL = 'jail'

const CHOISE_OK = -1
const CHOISE_NG = -2
const CHOISE_HIDDEN = 0

const CELL_TYPE0 = '0'
const CELL_TYPE1 = '1'
const CELL_TYPE2 = '2'
const CELL_TYPE3 = '3'

const CELLS = [
  { name: 'start', type: CELL_TYPE0, },
  { name: 'beijing', type: CELL_TYPE1, value: 450, cost: [ 40, 80, 200 ] },
  { name: 'shanghai', type: CELL_TYPE1, value: 500 , cost: [ 50, 100, 250 ] },
  { name: 'shenzhen', type: CELL_TYPE2, value: 425, cost: [ 30, 50, 100 ] },
  { name: 'guangzhou', type: CELL_TYPE2, value: 400, cost: [ 30, 45, 90 ] },
  { name: 'chance', type: CELL_TYPE0, },
  { name: 'hangzhou', type: CELL_TYPE2, value: 425, cost: [ 35, 60, 110 ] },
  { name: 'chengdu', type: CELL_TYPE2, value: 375, cost: [ 20, 35, 80 ] },
  { name: 'shenyang', type: CELL_TYPE3, value: 285, cost: [ 10, 20, 50 ] },
  { name: 'dalian', type: CELL_TYPE3, value: 280, cost: [ 10, 20, 40 ] },
  { name: 'jail', type: CELL_TYPE0, },
]

const PLAYERS = [ 'XXX', 'OOO' ]
const DICE_NUMBER = 2

function randomDice() {
  return Math.floor(Math.random() * 6) + 1
}

export default function Game() {
  const [ turn, setTurn ] = useState(0)
  const [ dices, setDices ] = useState(Array(DICE_NUMBER).fill(0))

  const [ players, setPlayers ] = useState(
    PLAYERS.slice().map(
      (name, i) => ({
        name,
        clsName: `player${i}`,
        position: 0,
        properties: new Map(),
        cash: 1000,
        status: STATUS_MOVE,
      })
    )
  )
  const [ cells, setCells ] = useState(
    CELLS.slice().map(
      (cell, i) => ({
        ...cell,
        players: i === 0 ? new Set(Array(PLAYERS.length).fill(0).map((x, n) => n)) : new Set()
      })
    )
  )
  const [ choice, setChoice ] = useState(CHOISE_HIDDEN)
  const [ message, setMessage ] = useState('')

  function move(i, steps) {
    const newPlayers = players.slice()
    const newCells = cells.slice()

    const p = Number(newPlayers[i].position)

    newCells[p].players.delete(i)
    newPlayers[i].position = (p + steps) % cells.length
    newCells[newPlayers[i].position].players.add(i)

    setPlayers(newPlayers)
    setCells(newCells)
  }

  function moveTo(i, next) {
    if(typeof next === 'string')
      next = cells.findIndex(cell => cell.name === next)
    else
      next %= cells.length

    const newCells = cells.slice()
    newCells[Number(players[i].position)].players.delete(i)

    updatePlayers(i, 'position', next)
    newCells[next].players.add(players[i])
    setCells(newCells)
  }

  function trigerPay(i, j, cost, cb) {
    setMessage(`player: ${players[i].name} pay {${cost}} to ${players[j].name}!`)
    const newPlayers = players.slice()

    newPlayers[i].cash -= cost
    newPlayers[j].cash += cost
    setPlayers(newPlayers)

    cb ? cb() : setTurn((turn + 1) % (players.length))
  }

  function trigerInvest(i) {
    const newPlayers = players.slice()
    const cell = cells[newPlayers[i].position]

    if(newPlayers[i].cash < cell.value) {
      setMessage(`No enough money.`)
    } else {
      newPlayers[i].properties.set(cell.type, cell)
      newPlayers[i].cash -= cell.value
      setPlayers(newPlayers)
      updateCells(newPlayers[i].position, 'ownedBy', { index: i, name: newPlayers[i].name, level: 0 })
    }
  }

  function updatePlayers(i, p, v) {
    const newPlayers = players.slice()
    newPlayers[i][p] = v
    setPlayers(newPlayers)
  }

  function updateCells(i, p, v) {
    const newCells = cells.slice()
    newCells[i][p] = v
    setCells(newCells)
  }

  function handlePhaseMove(i, newDices) {
    move(i, newDices.reduce((a, b) => a + b))
  }

  function handleRoll(diceSize = DICE_NUMBER) {
    const newDices = Array(diceSize).fill(0).map(() => randomDice())
    setDices(newDices)

    if(players[turn].status === STATUS_JAIL) {
      if(turn === 1) { // only the same results can change status(to move)
        // updatePlayers(turn, 'status', STATUS_MOVE)
      } else {
        setTurn((turn + 1) % (players.length))
      }
    } else {
      handlePhaseMove(turn, newDices)
      handleStop(turn)
    }
  }

  function handleStop() {
    const player = players[turn]
    const cell = cells[player.position]

    if(cell.type === CELL_TYPE0) {
      if(cell.name === 'start')
        updatePlayers(turn, 'cash', players[turn].cash + 200)
      else if(cell.name === 'jail') {
        moveTo(turn, 'jail')
        updatePlayers(turn, 'status', STATUS_JAIL)
      }
      setTurn((turn + 1) % (players.length))
    } else {
      if(cell.ownedBy && cell.ownedBy.index !== turn) {
        trigerPay(turn, cell.ownedBy.index, cell.cost[cell.ownedBy.level])
      } else {
        setChoice(1)
        updatePlayers(turn, 'status', STATUS_INVEST)
      }
    }
  }

  function handleOKClick() {
    if(players[turn].status === STATUS_INVEST) {
      trigerInvest(turn)
      setTurn((turn + 1) % (players.length))
    }

    setChoice(CHOISE_HIDDEN)
  }

  function handleNGClick() {
    setChoice(CHOISE_HIDDEN)
  }

  // useEffect(() => {
  //
  // })

  return (
    <Board { ...{ players, cells, dices, handleRoll, turn } }>
      { choice > 0 ? <Choice handleOKClick={handleOKClick} handleNGClick={handleNGClick}/> : '' }
      { message ? <Message message={message} /> : '' }
    </Board>
  )
}

function Board({ players, cells, dices, handleRoll, turn, children }) {
  return (
    <div>
      <div>
        <button onClick={ () => handleRoll() } onKeyUp={ handleRoll }>
          { players[Number(turn)].name } turn
        </button>
        <label>last rolled: [ { dices } ]</label>
      </div>
      { children }
      <ul className="block">
        {
          cells.map(cell =>
            <Cell
              key={cell.name} name={cell.name} type={cell.type} ownedBy={ cell.ownedBy || null }
              players={ cell.players.size === 0 ? null : players.filter((p, i) => cell.players.has(i)) }
            />
          )
        }
      </ul>
    </div>
  )
}

function Cell({ name, type, players, ownedBy }) {
  let playersBlock = ''

  if(players !== null)
    playersBlock = <ul>{ players.map(p => <Player key={p.name} {...p} />) }</ul>

  return (
    <li>
      <div>
        <span>{ name }: </span>
        <span>{ type }</span>
        <span>ownedBy: { (ownedBy && `${ownedBy.name}, level: ${ownedBy.level}` ) || 'none' }</span>
      </div>
      { playersBlock }
    </li>
  )
}

function Player({ name, properties, cash }) {
  return (
    <div>
      Player: {name},
      properties: {properties.size},
      cash: {cash},
    </div>
  )
}

function Message({ message }) {
  return re(
    'p',
    message
  )
}

function Choice({ handleOKClick, handleNGClick }) {
  return re(
    'div',
    null,
    re('button', { onClick: handleOKClick }, 'OK'),
    re('button', { onClick: handleNGClick }, 'NG')
  )
}
