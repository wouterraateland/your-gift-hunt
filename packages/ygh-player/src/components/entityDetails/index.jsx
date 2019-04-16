import React from "react"
import _ from "utils"
import { GenericEntity } from "../entities"
import EntityDetails from "your-gift-hunt/entityDetails"

import Computer from "./Computer"
import InstructionNote from "./InstructionNote"
import Mailbox from "./Mailbox"
import Note from "./Note"
import SafeWithCode from "./SafeWithCode"
import SafeWithKeyhole from "./SafeWithKeyhole"

export const getEntityDetailComponent = templateName => {
  switch (templateName) {
    case EntityDetails.Computer.templateName:
      return Computer
    case EntityDetails.InstructionNote.templateName:
      return InstructionNote
    case EntityDetails.Mailbox.templateName:
      return Mailbox
    case EntityDetails.Note.templateName:
      return Note
    case EntityDetails.SafeWithCode.templateName:
      return SafeWithCode
    case EntityDetails.SafeWithKeyhole.templateName:
      return SafeWithKeyhole
    default:
      return null
  }
}

export const GenericEntityDetail = props =>
  _.compose(
    Component => <Component {...props} />,
    _.maybe(() => GenericEntity, _.identity),
    getEntityDetailComponent
  )(props.template.name)

export {
  Computer,
  InstructionNote,
  Mailbox,
  Note,
  SafeWithCode,
  SafeWithKeyhole
}

export default {
  Computer,
  InstructionNote,
  Mailbox,
  Note,
  SafeWithCode,
  SafeWithKeyhole
}
