import React, { useState, useEffect } from 'react'
const re = React.createElement

function Series() {
  return re(
    'div',
    null,
    re('div', null, re('div')),
    re(Board)
  )
}

function Board({ districts, streets, players }) {
  return (
    <div>

    </div>
  )
}

function District({ encounterTypeHint }) {

}

function Neighbourhood() {

}

function Cell({ name, encounter, ...others }) {

}

function Role({ name }) {

}

function Player({ role }) {

}
