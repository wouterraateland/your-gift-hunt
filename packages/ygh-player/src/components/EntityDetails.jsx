import React from "react"
import _ from "utils"
import Entities, { DefaultEntity } from "components/Entities"

import EntityDetails from "your-gift-hunt/EntityDetails"
import * as Screens from "components/screens"

import withEntityBehaviour from "containers/withEntityBehaviour"
import withPickupBehaviour from "containers/withPickupBehaviour"

const entityDetailComponents = [
  withEntityBehaviour(EntityDetails.Computer),
  withEntityBehaviour(EntityDetails.DoorWithLock),
  withEntityBehaviour(EntityDetails.InstructionNote),
  withEntityBehaviour(EntityDetails.Mailbox, {
    detailScreen: Screens.MultiDetail
  }),
  withEntityBehaviour(EntityDetails.Note),
  withPickupBehaviour(EntityDetails.SafeWithCode),
  withPickupBehaviour(EntityDetails.SafeWithKeyhole),
  ...Object.values(Entities)
]

export const getEntityDetailComponent = templateName =>
  entityDetailComponents.find(
    component => component.templateName === templateName
  )

export const GenericEntityDetail = props =>
  _.compose(
    Component => <Component {...props} />,
    _.maybe(() => DefaultEntity, _.identity),
    getEntityDetailComponent
  )(props.template.name)

export default entityDetailComponents.reduceRight(
  (acc, x) => ({ ...acc, [x.name]: x }),
  {}
)
