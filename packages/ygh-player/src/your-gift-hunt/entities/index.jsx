import React from "react"
import _ from "utils"

import DefaultEntity from "./Default"

import Armchair from "./Armchair"
import Battery from "./Battery"
import Camera from "./Camera"
import Carpet from "./Carpet"
import Computer from "./Computer"
import Desk from "./Desk"
import DeskChair from "./DeskChair"
import Door from "./Door"
import Flashlight from "./Flashlight"
import Floor from "./Floor"
import Grass from "./Grass"
import InstructionNote from "./InstructionNote"
import Lamp from "./Lamp"
import Mailbox from "./Mailbox"
import Map from "./Map"
import MapPiece from "./MapPiece"
import Package from "./Package"
import Path from "./Path"
import PlantPot from "./PlantPot"
import SafeKey from "./SafeKey"
import SafeWithCode from "./SafeWithCode"
import SafeWithKeyhole from "./SafeWithKeyhole"
import Seeds from "./Seeds"
import Wall from "./Wall"
import WateringCan from "./WateringCan"
import WorktopWithSink from "./WorktopWithSink"

export {
  Armchair,
  Battery,
  Camera,
  Carpet,
  Computer,
  DefaultEntity,
  Desk,
  DeskChair,
  Door,
  Flashlight,
  Floor,
  Grass,
  InstructionNote,
  Lamp,
  Mailbox,
  Map,
  MapPiece,
  Package,
  Path,
  PlantPot,
  SafeKey,
  SafeWithCode,
  SafeWithKeyhole,
  Seeds,
  Wall,
  WateringCan,
  WorktopWithSink
}

const entities = [
  Armchair,
  Battery,
  Camera,
  Carpet,
  Computer,
  Desk,
  DeskChair,
  Door,
  Flashlight,
  Floor,
  Grass,
  InstructionNote,
  Lamp,
  Mailbox,
  Map,
  MapPiece,
  Package,
  Path,
  PlantPot,
  SafeKey,
  SafeWithCode,
  SafeWithKeyhole,
  Seeds,
  Wall,
  WateringCan,
  WorktopWithSink
]

export const getEntityComponent = templateName =>
  Object.values(entities).find(object => templateName === object.templateName)

export const GenericEntity = props =>
  _.compose(
    Component => <Component {...props} />,
    _.maybe(() => DefaultEntity, _.identity),
    getEntityComponent
  )(props.template.name)

export default entities.reduce((acc, x) => ({ ...acc, [x.name]: x }), {
  DefaultEntity
})
