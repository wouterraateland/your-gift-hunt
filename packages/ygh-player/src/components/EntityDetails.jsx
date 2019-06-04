import React from "react"
import _ from "utils"
import Entities, { getEntityComponent } from "components/Entities"

import EntityDetails from "your-gift-hunt/EntityDetails"
import MultiDetail from "components/screens/MultiDetail"

import withEntityBehaviour from "containers/withEntityBehaviour"
import withSafeBehaviour from "containers/withSafeBehaviour"
import withContainedEntities from "containers/withContainedEntities"

export const DefaultEntityDetail = withEntityBehaviour(
  EntityDetails.DefaultEntityDetail
)

const entityDetailComponents = [
  withContainedEntities(withEntityBehaviour(EntityDetails.Computer)),
  withEntityBehaviour(EntityDetails.DoorWithLock),
  withEntityBehaviour(EntityDetails.InstructionNote),
  withContainedEntities(
    withEntityBehaviour(EntityDetails.Mailbox, {
      detailScreen: MultiDetail
    })
  ),
  withEntityBehaviour(EntityDetails.Note),
  withContainedEntities(
    withSafeBehaviour(withEntityBehaviour(EntityDetails.SafeWithCode))
  ),
  withContainedEntities(
    withSafeBehaviour(withEntityBehaviour(EntityDetails.SafeWithKeyhole))
  ),
  ...Object.values(Entities)
]

export const getEntityDetailComponent = templateName =>
  entityDetailComponents.find(
    component => component.templateName === templateName
  )

export const GenericEntityDetail = props =>
  _.compose(
    Component => <Component {...props} />,
    _.maybe(() => DefaultEntityDetail, _.identity),
    _.maybe(() => getEntityComponent(props.template.name), _.identity),
    getEntityDetailComponent
  )(props.template.name)

export default entityDetailComponents.reduceRight(
  (acc, x) => ({ ...acc, [x.name]: x }),
  {}
)
