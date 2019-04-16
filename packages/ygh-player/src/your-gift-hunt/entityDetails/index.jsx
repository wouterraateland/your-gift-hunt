import React from "react"
import Entities, { GenericEntity } from "../entities"
import _ from "utils"

import Computer from "./Computer"
import InstructionNote from "./InstructionNote"
import Mailbox from "./Mailbox"
import Note from "./Note"
import SafeWithCode from "./SafeWithCode"
import SafeWithKeyhole from "./SafeWithKeyhole"

export {
  Computer,
  InstructionNote,
  Mailbox,
  Note,
  SafeWithCode,
  SafeWithKeyhole
}

const entityDetails = [
  Computer,
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
    _.maybe(() => GenericEntity, _.identity),
    getEntityDetailComponent
  )(props.template.name)

export default entityDetails.reduce(
  (acc, x) => ({ ...acc, [x.name]: x }),
  Entities
)
