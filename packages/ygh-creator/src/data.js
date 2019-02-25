export const ACTION_TYPES = {
  USE: "USE",
  TARGET_OF_USE: "TARGET_OF_USE",
  INPUT: "INPUT",
  TRANSFORM: "TRANSFORM",
  UNLOCK: "UNLOCK"
}

export const ACCESS_TYPES = {
  CODE: "CODE",
  NONE: "NONE"
}

export const PRIVACY = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE"
}

export const accessOptions = [
  { label: "Access code", value: ACCESS_TYPES.CODE },
  { label: "None", value: ACCESS_TYPES.NONE }
]

export const nameOptions = {
  first: [
    "Christmas",
    "Birthday",
    "Valentines",
    "Guacemole",
    "Moleskine",
    "Paper",
    "Escape",
    "Treasure",
    "Road"
  ],
  last: ["hunt", "game", "challenge", "trip"]
}

export const NODE_TYPES = {
  ENTRY: "entry",
  EXIT: "exit",
  STATE: "state"
}

export const EDGE_TYPES = {
  ENTRY: "entry",
  EXIT: "exit",
  TRANSFORM: "transform",
  UNLOCK: "unlock",
  USE: "use"
}
