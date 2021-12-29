import { SCENARIO } from '../data/scenario'

function Phase(name) {
  this.name = name
  this.isActive = false
  this.subscribers = []
}

Phase.prototype = {
  constructor: Phase,
  setActive() {
    this.isActive = true
  },
  spliceSubscriber(s) {
    this.subscribers.splice(s,)
  },
  isPhaseEnd() {

  },
}

const playerPhase = Object.create()
const monsterPhase = Object.create()
const encounterPhase = ''
const mythosPhase = ''

function initScenario(name) {

}

function initPlayer() {

}

function fixedPrepareWork() {

}

function prepareWork({ scenario, players }) {
  initScenario(scenario)
  initPlayer(players)
  fixedPrepareWork()
}

export { prepareWork, playerPhase, monsterPhase, encounterPhase, mythosPhase }
