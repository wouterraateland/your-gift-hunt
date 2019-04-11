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
import Sink from "./Sink"
import Wall from "./Wall"
import WateringCan from "./WateringCan"
import Entities from "your-gift-hunt/entities"

export const getEntityComponent = templateName => {
  switch (templateName) {
    case Entities.Armchair.templateName:
      return Armchair
    case Entities.Battery.templateName:
      return Battery
    case Entities.Camera.templateName:
      return Camera
    case Entities.Carpet.templateName:
      return Carpet
    case Entities.Computer.templateName:
      return Computer
    case Entities.Desk.templateName:
      return Desk
    case Entities.DeskChair.templateName:
      return DeskChair
    case Entities.Door.templateName:
      return Door
    case Entities.Flashlight.templateName:
      return Flashlight
    case Entities.Floor.templateName:
      return Floor
    case Entities.Grass.templateName:
      return Grass
    case Entities.InstructionNote.templateName:
      return InstructionNote
    case Entities.Lamp.templateName:
      return Lamp
    case Entities.Mailbox.templateName:
      return Mailbox
    case Entities.Map.templateName:
      return Map
    case Entities.MapPiece.templateName:
      return MapPiece
    case Entities.Package.templateName:
      return Package
    case Entities.Path.templateName:
      return Path
    case Entities.PlantPot.templateName:
      return PlantPot
    case Entities.SafeKey.templateName:
      return SafeKey
    case Entities.SafeWithCode.templateName:
      return SafeWithCode
    case Entities.SafeWithKeyhole.templateName:
      return SafeWithKeyhole
    case Entities.Seeds.templateName:
      return Seeds
    case Entities.WorktopWithSink.templateName:
      return Sink
    case Entities.Wall.templateName:
      return Wall
    case Entities.WateringCan.templateName:
      return WateringCan
    default:
      return null
  }
}

export const GenericEntity = props =>
  _.compose(
    Component => <Component {...props} />,
    _.maybe(() => DefaultEntity, _.identity),
    getEntityComponent
  )(props.template.name)

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
  Sink,
  Wall,
  WateringCan
}

export default {
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
  Sink,
  Wall,
  WateringCan
}
