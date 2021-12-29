function Item(name, categories, description, type,
  { hands = 0, health = null, sense = null, cost = 0 }) {
  this.name = name
  this.categories = categories
  this.description = description
  this.type = type

  this.hands = hands
  this.status = 'displaying' || '?' || 'discarded'
  this.health = health
  this.sense = sense
}

Item.prototype = {
  constructor: Item,
  suffer(amount, type) {

  },

}

new Item('', )

const HANDS = [ 0, 1, 2 ]
const TYPES = { r: 'role', n: 'nromal', s: 'special' }
const CATEGORY = new Set('common', 'cuprio', 'weapon', 'book')
const H = 'health'
const S = 'sense'

function createItem(props) {
  return
}

function initItemPool(names) {

}

function Living(h, s) {
  this[H] = h || 0
  this[S] = s || 0

  if(this[H] === this[S] === 0)
    throw new Error('Both health and sense are init in 0.')
  else if(this[H] === 0)
    this.livingType = 1
  else if(this[S] === 0)
    this.livingType = 2
  else
    this.livingType = 0
}

function Rounding() {
  this.isUsedInRound = false
}

function Test() {

}

function Conditional() {

}

Living.prototype = {
  isDeadInH() {},
  isDeadInS() {},
  suffer(amount, type) {
    let afford = amount

    if(type === H)
      this[H] -= afford
    else if(type === S)
      this[S] -= afford

    return amount - afford
  },
}

function liveItem(health, sense, item) {
  return Object.create(new Living(health, sense), ...item)
}
