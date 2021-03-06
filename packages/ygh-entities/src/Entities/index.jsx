import React from "react"
import _ from "ygh-utils"

import DefaultEntity from "./Default"
import DefaultEntityDetail from "../EntityDetails/Default"
import Entity from "../Entity"

import Armchair from "./Armchair"
import Battery from "./Battery"
import Bed from "./Bed"
import BowlingShoes from "./BowlingShoes"
import Cake from "./Cake"
import Camera from "./Camera"
import Carpet from "./Carpet"
import Closet from "./Closet"
import CoffeeTable from "./CoffeeTable"
import Computer from "./Computer"
import Desk from "./Desk"
import DeskChair from "./DeskChair"
import Door from "./Door"
import DoorKey from "./DoorKey"
import DoorWithLock from "./DoorWithLock"
import Flashlight from "./Flashlight"
import Floor from "./Floor"
import Grass from "./Grass"
import InstructionNote from "./InstructionNote"
import Introduction from "./Introduction"
import Lamp from "./Lamp"
import Mailbox from "./Mailbox"
import Map from "./Map"
import MapPiece from "./MapPiece"
import Outro from "./Outro"
import Package from "./Package"
import PartyGame from "./PartyGame"
import Path from "./Path"
import PhotoFrame from "./PhotoFrame"
import Planner from "./Planner"
import PlantPot from "./PlantPot"
import Plate from "./Plate"
import RandomWalk from "./RandomWalk"
import Room from "./Room"
import SafeKey from "./SafeKey"
import SafeWithCode from "./SafeWithCode"
import SafeWithKeyhole from "./SafeWithKeyhole"
import Seeds from "./Seeds"
import SideTable from "./SideTable"
import SportPants from "./SportPants"
import SportShirt from "./SportShirt"
import SportShoes from "./SportShoes"
import SquashMatch from "./SquashMatch"
import SquashRacket from "./SquashRacket"
import Tree from "./Tree"
import TreeStump from "./TreeStump"
import TV from "./TV"
import TVCabinet from "./TVCabinet"
import TVGame from "./TVGame"
import UglyShoes from "./UglyShoes"
import Wall from "./Wall"
import WateringCan from "./WateringCan"
import WorktopWithSink from "./WorktopWithSink"

export {
  DefaultEntity,
  DefaultEntityDetail,
  Entity,
  Armchair,
  Battery,
  Bed,
  BowlingShoes,
  Cake,
  Camera,
  Carpet,
  Closet,
  CoffeeTable,
  Computer,
  Desk,
  DeskChair,
  Door,
  DoorKey,
  DoorWithLock,
  Flashlight,
  Floor,
  Grass,
  InstructionNote,
  Introduction,
  Lamp,
  Mailbox,
  Map,
  MapPiece,
  Outro,
  Package,
  PartyGame,
  Path,
  PhotoFrame,
  Planner,
  PlantPot,
  Plate,
  RandomWalk,
  Room,
  SafeKey,
  SafeWithCode,
  SafeWithKeyhole,
  Seeds,
  SideTable,
  SportPants,
  SportShirt,
  SportShoes,
  SquashMatch,
  SquashRacket,
  Tree,
  TreeStump,
  TV,
  TVCabinet,
  TVGame,
  UglyShoes,
  Wall,
  WateringCan,
  WorktopWithSink
}

const entities = [
  Armchair,
  Battery,
  Bed,
  BowlingShoes,
  Cake,
  Camera,
  Carpet,
  Closet,
  CoffeeTable,
  Computer,
  Desk,
  DeskChair,
  Door,
  DoorKey,
  DoorWithLock,
  Flashlight,
  Floor,
  Grass,
  InstructionNote,
  Introduction,
  Lamp,
  Mailbox,
  Map,
  MapPiece,
  Outro,
  Package,
  PartyGame,
  Path,
  PhotoFrame,
  Planner,
  PlantPot,
  Plate,
  RandomWalk,
  Room,
  SafeKey,
  SafeWithCode,
  SafeWithKeyhole,
  Seeds,
  SideTable,
  SportPants,
  SportShirt,
  SportShoes,
  SquashMatch,
  SquashRacket,
  Tree,
  TreeStump,
  TV,
  TVCabinet,
  TVGame,
  UglyShoes,
  Wall,
  WateringCan,
  WorktopWithSink
]

export const getEntityComponent = templateName =>
  entities.find(entity => templateName === entity.templateName)

export const GenericEntity = props =>
  _.compose(
    Component => <Component {...props} />,
    _.maybe(() => DefaultEntity, _.identity),
    getEntityComponent
  )(props.template.name)

export default entities.reduce((acc, x) => ({ ...acc, [x.name]: x }), {
  DefaultEntity
})
