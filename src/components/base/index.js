import React, { useState } from 'react'
import { prepareWork } from './context'

function MainContainer(props) {
  const [ scenario, setScenario ] = useState({})
  const [ players, setPlayers ] = useState([])
  const [ status, setStatus ] = useState(0)

  function pickupScenario(scenario) {

  }

  function pickupPlayer(playerList) {

  }

  function confirm() {

  }

  prepareWork(props)

  return (
    <div>
      { status === 0 ? <Main /> : <Main /> }
    </div>
  )
}

function Main() {
  return <div>This means a start.</div>
}
