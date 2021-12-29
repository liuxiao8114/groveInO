const ENCOUNTER_TYPE = ''

const LORE = 'lore'
const INFLUENCE = 'influence'
const OBSERVATION = 'observation'
const STRENGTH = 'strength'
const WILL = 'will'

const TWILIGHT = {
  ark: {
    eventCards: [],
    scenarioCards: [],
    map: [],
    deamons: [],
    mythosTokens: [],
  }
}

const SCENARIOS = new Set(...[ TWILIGHT ])


const EVENT = {
  purcharge: {
    description: '',
  }
}

const joint = (x, y, pos) => {
  return
}

function MulitLanguage() {

}

const CURRENT_LANG = ''

function DistrictRaw(name, connections) {

}

const CLOCK1 = 1
const CLOCK3 = 3
const CLOCK5 = 5
const CLOCK7 = 7
const CLOCK9 = 9
const CLOCK11 = 11

/*
12,
A - clock3 - 1
A - clock5 - 2
B - clock3 - 6
B - clock5 - 5
B - clock7 - 3
B - clock9 - 1
C - clock1 - 3
C - clock3 - 4
C - clock11- 2
D - clock1 - 7
D - clock9 - 4
D - clock11- 5

      A   1   B   6   E
        2   3   5   7
          C   4   D


          A
        1   2
      B   3   C
        4   5   6
          D       E


      B       A
        3   1   2
          C   4   D
                    5
                      E


A - c5 - 1
B - c3 - 2
B - c5 - 3
B - c11- 1
C - c9 - 2
C - c7 - 4
D - c1 - 4
D - c7 - 5
D - c11- 3
E - c1 - 5

      A
        1
          B   2   C
            3   4
              D
            5
          E
*/
