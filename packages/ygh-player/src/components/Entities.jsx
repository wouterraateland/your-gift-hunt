import React from "react"
import _ from "utils"

import Entities from "your-gift-hunt/Entities"

import withCameraBehaviour from "containers/withCameraBehaviour"
import withEntityBehaviour from "containers/withEntityBehaviour"
import withPackageBehaviour from "containers/withPackageBehaviour"
import withTreeBehaviour from "containers/withTreeBehaviour"

export const DefaultEntity = withEntityBehaviour(Entities.DefaultEntity)

const entityComponents = [
  withEntityBehaviour(Entities.Armchair),
  withEntityBehaviour(Entities.Battery),
  withCameraBehaviour(Entities.Camera),
  withEntityBehaviour(Entities.Carpet),
  withEntityBehaviour(Entities.Computer),
  withEntityBehaviour(Entities.DefaultEntity),
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
  withEntityBehaviour(Entities.Mailbox),
  withEntityBehaviour(Entities.Map),
  withEntityBehaviour(Entities.MapPiece),
  withPackageBehaviour(Entities.Package),
  withEntityBehaviour(Entities.Path),
  withEntityBehaviour(Entities.PlantPot),
  withEntityBehaviour(Entities.SafeKey),
  withEntityBehaviour(Entities.SafeWithCode),
  withEntityBehaviour(Entities.SafeWithKeyhole),
  withEntityBehaviour(Entities.Seeds),
  withTreeBehaviour(Entities.Tree),
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
