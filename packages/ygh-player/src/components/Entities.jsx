import React from "react"
import _ from "ygh-utils"

import Entities from "ygh-entities"
import * as Screens from "components/screens"

import withEntityBehaviour from "containers/withEntityBehaviour"
import withPathBehaviour from "containers/withPathBehaviour"
import withCarpetBehaviour from "containers/withCarpetBehaviour"
import withPackageBehaviour from "containers/withPackageBehaviour"
import withContainedEntities from "containers/withContainedEntities"

export const DefaultEntity = withEntityBehaviour(Entities.DefaultEntity)

const entityComponents = {
  ...Object.values(Entities).reduce(
    (acc, Entity) => ({
      ...acc,
      [Entity.name]: withEntityBehaviour(Entity)
    }),
    {}
  ),
  Camera: withContainedEntities(
    withEntityBehaviour(Entities.Camera, {
      detailScreen: Screens.Camera
    })
  ),
  Carpet: withContainedEntities(
    withCarpetBehaviour(withEntityBehaviour(Entities.Carpet))
  ),
  Computer: withContainedEntities(withEntityBehaviour(Entities.Computer)),
  Mailbox: withContainedEntities(withEntityBehaviour(Entities.Mailbox)),
  Package: withContainedEntities(
    withPackageBehaviour(withEntityBehaviour(Entities.Package))
  ),
  Path: withContainedEntities(
    withPathBehaviour(withEntityBehaviour(Entities.Path))
  ),
  SafeWithCode: withContainedEntities(
    withEntityBehaviour(Entities.SafeWithCode)
  ),
  SafeWithKeyhole: withContainedEntities(
    withEntityBehaviour(Entities.SafeWithKeyhole)
  )
}

export const getEntityComponent = templateName =>
  Object.values(entityComponents).find(
    component => component.templateName === templateName
  )

export const GenericEntity = props =>
  _.compose(
    Component => <Component {...props} />,
    _.maybe(() => DefaultEntity, _.identity),
    getEntityComponent
  )(props.template.name)

export default entityComponents
