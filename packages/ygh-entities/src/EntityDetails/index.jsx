import React from "react"
import Entities, { getEntityComponent } from "../Entities"
import _ from "ygh-utils"

import DefaultEntityDetail from "./Default"

import Closet from "./Closet"
import Computer from "./Computer"
import DoorWithLock from "./DoorWithLock"
import InstructionNote from "./InstructionNote"
import Mailbox from "./Mailbox"
import Note from "./Note"
import PhotoFrame from "./PhotoFrame"
import Planner from "./Planner"
import SafeWithCode from "./SafeWithCode"
import SafeWithKeyhole from "./SafeWithKeyhole"
import TV from "./TV"

export {
  Closet,
  Computer,
  DoorWithLock,
  InstructionNote,
  Mailbox,
  Note,
  PhotoFrame,
  Planner,
  SafeWithCode,
  SafeWithKeyhole,
  TV
}

const entityDetails = [
  Closet,
  Computer,
  DoorWithLock,
  InstructionNote,
  Mailbox,
  Note,
  PhotoFrame,
  Planner,
  SafeWithCode,
  SafeWithKeyhole,
  TV
]

export const getEntityDetailComponent = templateName =>
  entityDetails.find(entityDetail => templateName === entityDetail.templateName)

export const GenericEntityDetail = props =>
  _.compose(
    Component => <Component {...props} />,
    _.maybe(() => DefaultEntityDetail, _.identity),
    _.maybe(() => getEntityComponent(props.template.name), _.identity),
    getEntityDetailComponent
  )(props.template.name)

export default entityDetails.reduce((acc, x) => ({ ...acc, [x.name]: x }), {
  DefaultEntityDetail,
  ...Entities
})
