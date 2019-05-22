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
  ENTITY: "entity",
  ENTRY: "entry",
  EXIT: "exit",
  STATE: "state",
  INFORMATION_SLOT: "information-slot",
  FIELD: "field",
  PORTAL: "portal",
  ENTRANCE: "entrance"
}

export const EDGE_TYPES = {
  ENTRY: "entry",
  EXIT: "exit",
  INFO: "info",
  INFO_AVAILABILITY: "info-availability",
  FIELD_USAGE: "field-usage",
  PORTAL: "portal",
  PORTAL_OPENNESS: "portal-openness",
  TRANSFORM: "transform",
  UNLOCK: "unlock",
  USE: "use"
}
