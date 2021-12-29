import { DISTRICT, NEIGHBOURHOOD, ENCOUNTER } from './data/map'

export function initDistrict(nameOrObj) {
  return typeof nameOrObj === 'string' ?
     initDistrictWithString(nameOrObj) : initDistrictWithObj(nameOrObj)
}

function initDistrictWithString(name) {
  const district = DISTRICT.get(name)
  district.neighbourhood = NEIGHBOURHOOD.get(name)

  const encounters = []
  encounters.push(initEncounters(district.neighbourhood.lt))
  encounters.push(initEncounters(district.neighbourhood.rt))
  encounters.push(initEncounters(district.neighbourhood.b))

  district.encounters = encounters

  return district
}

function initDistrictWithObj(district) {

}

function initEncounters(neighbourhood) {
  return ENCOUNTER.get(neighbourhood)
}

function District() {

}

District.prototype = {
  join(street, joint) {

  }
}
