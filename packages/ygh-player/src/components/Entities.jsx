import React from "react"
import _ from "utils"

import Entities from "your-gift-hunt/Entities"
import * as Screens from "components/screens"

import withEntityBehaviour from "containers/withEntityBehaviour"
import withPackageBehaviour from "containers/withPackageBehaviour"
import withContainedEntities from "containers/withContainedEntities"

export const DefaultEntity = withEntityBehaviour(Entities.DefaultEntity)

const entityComponents = [
  withEntityBehaviour(Entities.Armchair),
  withEntityBehaviour(Entities.Battery),
  withContainedEntities(
    withEntityBehaviour(Entities.Camera, {
      detailScreen: Screens.Camera
    })
  ),
  withEntityBehaviour(Entities.Carpet),
  withContainedEntities(withEntityBehaviour(Entities.Computer)),
  withEntityBehaviour(Entities.Desk),
  withEntityBehaviour(Entities.DeskChair),
  withEntityBehaviour(Entities.Door),
  withEntityBehaviour(Entities.DoorKey),
  withEntityBehaviour(Entities.DoorWithLock),
  withEntityBehaviour(Entities.Flashlight),
  withEntityBehaviour(Entities.Floor),
  withEntityBehaviour(Entities.Grass),
  withEntityBehaviour(Entities.InstructionNote),
  withEntityBehaviour(Entities.Lamp),
  withContainedEntities(withEntityBehaviour(Entities.Mailbox)),
  withEntityBehaviour(Entities.Map),
  withEntityBehaviour(Entities.MapPiece),
  withContainedEntities(
    withPackageBehaviour(withEntityBehaviour(Entities.Package))
  ),
  withEntityBehaviour(Entities.Path),
  withEntityBehaviour(Entities.PlantPot),
  withEntityBehaviour(Entities.Room),
  withEntityBehaviour(Entities.SafeKey),
  withContainedEntities(withEntityBehaviour(Entities.SafeWithCode)),
  withContainedEntities(withEntityBehaviour(Entities.SafeWithKeyhole)),
  withEntityBehaviour(Entities.Seeds),
  withEntityBehaviour(Entities.Tree),
  withEntityBehaviour(Entities.TreeStump),
  withEntityBehaviour(Entities.Wall),
  withEntityBehaviour(Entities.WateringCan),
  withEntityBehaviour(Entities.WorktopWithSink)
]

export const getEntityComponent = templateName =>
  entityComponents.find(component => component.templateName === templateName)

export const GenericEntity = props =>
  _.compose(
    Component => <Component {...props} />,
    _.maybe(() => DefaultEntity, _.identity),
    getEntityComponent
  )(props.template.name)

export default entityComponents.reduce(
  (acc, x) => ({ ...acc, [x.name]: x }),
  {}
)
