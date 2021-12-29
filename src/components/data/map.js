// district
const DOWNTOWN = 'downtown'
const UPTOWN = 'uptown'
const NORTHSIDE = 'northside'
const SOUTHSIDE = 'southside'

const DISTRICT = new Map()
const DISTRICT_TYPES = new Map()
const NEIGHBOURHOOD = new Map()
const FORWARD = 'forward'
const BACKWARD = 'backward'

// neighbourhood
const STATION = {
  name: 'station', name_cn: '', hintFrom: [], hintTo: [],
}
const BLACKCAVE = {
  name: 'blackcave', hintFrom: [], hintTo: [],
}
const POLICE = {
  name: 'policestation', hintFrom: [], hintTo: [],
}
const HILL = {
  name: `hangman's hill`, hintFrom: [], hintTo: [],
}
const HOSPITAL = {
  name: 'hospital', hintFrom: [], hintTo: [],
}
const RESTAURANT = {
  name: 'restaurant', hintFrom: [], hintTo: [],
}
const BAR = {}
const STORE = {}
const CUPIOSHOP = {}
const MAGICSHOP = {}
const NEWS = {}
const CHURCISH = {}

// street
const PARK = {}
const BRIDGE = {}
const LIGHT = {}

const ENCOUNTER = new Map()
ENCOUNTER.set(STATION, [])
ENCOUNTER.set(BLACKCAVE, [])
ENCOUNTER.set(POLICE, [])
ENCOUNTER.set(HILL, [])
ENCOUNTER.set(STORE, [])
ENCOUNTER.set(PARK, [])
ENCOUNTER.set(BRIDGE, [])
ENCOUNTER.set(LIGHT, [])

const DISTRICT_DOWNTOWN = {
  name: DOWNTOWN,
  name_cn: '',
  name_jp: '',
}

const DISTRICT_UPTOWN = {
  name: UPTOWN,
  name_cn: '',
  name_jp: '',
}

const DISTRICT_NORTHSIDE = {
  name: NORTHSIDE,
  name_cn: '',
  name_jp: '',
}

const DISTRICT_SOUTHSIDE = {
  name: SOUTHSIDE,
  name_cn: '',
  name_jp: '',
}

NEIGHBOURHOOD.set(DOWNTOWN, { lt: CUPIOSHOP, rt: NEWS, b: STATION, })
NEIGHBOURHOOD.set(UPTOWN, { lt: RESTAURANT, rt: BAR, b: POLICE })
NEIGHBOURHOOD.set(NORTHSIDE, {})
NEIGHBOURHOOD.set(SOUTHSIDE, {})

DISTRICT.set(DOWNTOWN, DISTRICT_DOWNTOWN)
DISTRICT.set(UPTOWN, DISTRICT_UPTOWN)
DISTRICT.set(NORTHSIDE, DISTRICT_NORTHSIDE)
DISTRICT.set(SOUTHSIDE, DISTRICT_SOUTHSIDE)

DISTRICT_TYPES.set(DOWNTOWN, FORWARD)
DISTRICT_TYPES.set(UPTOWN, BACKWARD)

export default {
  DOWNTOWN, UPTOWN,
  DISTRICT, DISTRICT_TYPES, NEIGHBOURHOOD, ENCOUNTER
}
