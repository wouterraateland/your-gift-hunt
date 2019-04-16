import React from "react"
import _ from "utils"
import Entities, { DefaultEntity } from "components/Entities"

import EntityDetails from "your-gift-hunt/EntityDetails"

import withEntityBehaviour from "containers/withEntityBehaviour"
import withMailboxDetailBehaviour from "containers/withMailboxDetailBehaviour"
import withPickupBehaviour from "containers/withPickupBehaviour"

const entityDetailComponents = [
  withEntityBehaviour(EntityDetails.Computer),
  withEntityBehaviour(EntityDetails.InstructionNote),
  withMailboxDetailBehaviour(EntityDetails.Mailbox),
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
