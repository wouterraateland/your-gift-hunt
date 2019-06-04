import React from "react"
import Entities, { getEntityComponent } from "../Entities"
import _ from "utils"

import DefaultEntityDetail from "./Default"

import Computer from "./Computer"
import DoorWithLock from "./DoorWithLock"
import InstructionNote from "./InstructionNote"
import Mailbox from "./Mailbox"
import Note from "./Note"
import SafeWithCode from "./SafeWithCode"
import SafeWithKeyhole from "./SafeWithKeyhole"

export {
  DefaultEntityDetail,
  Computer,
  DoorWithLock,
  InstructionNote,
  Mailbox,
  Note,
  SafeWithCode,
  SafeWithKeyhole
}

const entityDetails = [
  Computer,
  DoorWithLock,
  InstructionNote,
  Mailbox,
  Note,
  SafeWithCode,
  SafeWithKeyhole
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
