import React, { useState } from 'react'

const re = React.createElement

const PHASE_MOVE = 'move'
const PHASE_DEAL = 'deal'
const PHASE_PAY = 'pay'
const PHASE_CHOISE = 'choise'

/*
  roll -> phase === 'move'
       -> move
       -> targetType !== 0 && isOwned ? buy : isOwnedByYourself ? upgrade : pay
       -> isOnemoreChance ? roll : next

*/

const CELLS_INIT = [
  { name: 'start', type: '0' },
  { name: 'beijing', type: '1' },
  { name: 'shanghai', type: '1' },
  { name: 'shenzhen', type: '2' },
  { name: 'guangzhou', type: '2' },
  { name: 'hangzhou', type: '2' },
  { name: 'chengdu', type: '2' },
  { name: 'shenyang', type: '3' },
  { name: 'dalian', type: '3' },
]

const PLAYERS = [ 'zhao', 'qian', 'sun', 'li' ]

function randomDice() {
  return Math.floor(Math.random() * 6) + 1
}

function getNextPhase(currentPhase, decision) {

}

function Game() {
  const players = PLAYERS.slice().map(
    (name, i) => ({
      name, clsName: `player${i}`, position: 0,
    })
  )

  const [ turn, setTurn ] = useState()
  const [ dice1, setDice1 ] = useState(0)
  const [ dice2, setDice2 ] = useState(0)
  const [ phase, setPhase ] = useState(PHASE_MOVE)

  const [ position, setPosition ] = useState(Array(players.length).fill(0))

  function move(i, steps) {
    const newPlayers = players.slice()
    newPlayers[i].position[turn] += steps
    setPosition(newPosition)
  }

  function moveTo(i, next) {
    const newPosition = position.slice()
    newPosition[turn] = next
    setPosition(newPosition)
  }

  function handleRoll(i) {
    if(phase === PHASE_MOVE) {
      setDice1(randomDice())
      setDice2(randomDice())
      move(i, dice1 + dice2)

      if(dice1 === dice2) { 1 }
    }
  }

  function handleStop(cell, player) {

  }

  return re(
    'div',
    null,
    re(Board, { players, cells: CELLS_INIT.slice(), phase, handleRoll, turn, position, }),
  )
}

function Board({ players, cells, handleRoll, handleStop, dice1, dice2, turn, position }) {
  position.forEach((p, i) => cells[p].player = players[i])

  return (
    <div>
      <div>
        <button onClick={ () => handleRoll() } onKeyUp={ handleRoll }>
          { players[turn] }&#39s turn
        </button>
        <label>last rolled: [ { dice1 }, { dice2 } ]</label>
      </div>
      <ul className="block">
        {
          cells.map(cell =>
            <Cell
              key={cell.name}
              name={cell.name}
              type={cell.type}
              player={cell.player}
              handleStop={() => handleStop(cell)}
            />
          )
        }
      </ul>
    </div>
  )
}

function Cell({ name, type, player, ownedBy }) {
  return (
    <li>
      <div>
        <span>{ name }: </span>
        <span>{ type }</span>
        <span>ownedBy: { ownedBy && 'noone' }</span>
      </div>
      { player }
    </li>
  )
}

function Player() {
  const [ properties, setProperties ] = useState(new Map())

  return (
    <div> Player: 1 </div>
  )
}

function Decision({ handleOKClick, handleNGClick }) {
  return re(
    'div',
    null,
    re('button', { onClick: handleOKClick }, 'OK'),
    re('button', { onClick: handleNGClick }, 'NG')
  )
}

/*
f: A->B, f is bijection. a', a" in A.
a' ~ a" <=> f(a') = f(a")


f: A -> B
decomposition f: A ->> A/~ =~ im f => B

The formula defines a f~,
we have to verify:
that formula does define a function.
that fuction is in fact a bijection.

the equivalence class

2.1.  How many different bijections are there between a set S with n elements
and itself? [§II.2.1]
A: n!

2.2.  Prove statement (2) in Proposition 2.1. You may assume that given a family
of disjoint subsets of a set, there is a way to choose one element in each member of
the family. [§2.5, V.3.3]

f: A -> B exist right inverse g
<=> f is surjective.

=>:
for every b in B:
  f(g(b)) = b

let a = g(b)
then it means there exists a in A, which:
  f(a) = b

<=:
for every b in B, there exists a -> A, fits f(a) = b
define a set V:
  V = {(a,b)|a in A, b in B, f(a) = b}

pick up every identical b in V, form a set Vb
g =


2.3. Prove that the inverse of a bijection is a bijection, and that the composition
of two bijections is a bijection.

2.4.  Prove that ‘isomorphism’ is an equivalence relation (on any set of sets).
[§4.1]

means the ‘isomorphism’ set S.
reflexive: idA is isomorphism.
symmary: f is bi, f-1 is also bi.
transitive: f: A->B is bi, g: B->C is bi, then f o g: A->C is also bi.

2.5.  Formulate a notion of epimorphism, in the style of the notion of monomorphism
seen in §2.6, and prove a result analogous to Proposition 2.3, for epimorphisms
and surjections. [§2.6, §4.2]

monic: a', a": Z -> A. f: A -> B. f o a' = f o a" => a' = a"
f is monic <=> f is injective

prof.  =>
f(a'(x)) = f(a"(x)) => a' = a"
let
  b' = a'(x), b" = a"(x)
a' = a" => b' = b"
so f(b') = f(b") => b' = b"
f is injective

a'(f(x)) = a"(f(x)) => a' = a"
prof.  <=
microscopic portion Z = {p}, a', a": Z -> A
f o a' = f o a"
f(a'(p)) = f(a"(p))
(X) f is injective => a'(p) = a"(p) => a' = a"
(O) g o (f o a') = (g o f) o a' = idA o a' = idA o a" = (g o f) o a" = g o (f o a")

epic: f: A -> B. g: B -> C, im g = C => im(g o f) = C
f is epic <=> f is sujective

2.6. With notation as in Example 2.4, explain how any function f : A → B
determines a section of πA.

2.7. Let f : A → B be any function. Prove that the graph Γf of f is isomorphic
to A.

2.8. Describe as explicitly as you can all terms in the canonical decomposition
(cf. §2.8) of the function R → C defined by r → e2πir. (This exercise matches one
assigned previously, which one?)

2.9.  Show that if A ∼=
A and B ∼=
B, and further A∩B = ∅ and A∩B = ∅,
then A ∪B ∼=
A ∪B. Conclude that the operation AB (as described in §1.4)
is well-defined up to isomorphism (cf. §2.9). [§2.9, 5.7]
2.10.  Show that if A and B are finite sets, then |BA| = |B||A|. [§2.1, 2.11, §II.4.1]
12The reader should also be aware that there are important variations on the operations we
have seen so far—particularly important are the fibered flavors of products and disjoint unions.
13This (


*/
