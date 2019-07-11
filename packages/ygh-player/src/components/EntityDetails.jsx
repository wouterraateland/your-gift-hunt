import React from "react"
import _ from "ygh-utils"

import Entities, * as YGHEntities from "ygh-entities"
import MultiDetail from "components/screens/MultiDetail"

import withEntityBehaviour from "containers/withEntityBehaviour"
import withSafeBehaviour from "containers/withSafeBehaviour"
import withContainedEntities from "containers/withContainedEntities"

export const DefaultEntityDetail = withEntityBehaviour(
  YGHEntities.DefaultEntityDetail
)

const detail = Entity => Entity.Detail || YGHEntities.DefaultEntityDetail

const entityDetailComponents = {
  ...Object.keys(Entities).reduce(
    (acc, key) => ({
      ...acc,
      [Entities[key].name || "Default"]: withEntityBehaviour(
        detail(Entities[key])
      )
    }),
    {}
  ),
  Computer: withContainedEntities(
    withEntityBehaviour(detail(Entities.Computer))
  ),
  Mailbox: withContainedEntities(
    withEntityBehaviour(detail(Entities.Mailbox), {
      detailScreen: MultiDetail
    })
  ),
  SafeWithCode: withContainedEntities(
    withSafeBehaviour(withEntityBehaviour(detail(Entities.SafeWithCode)))
  ),
  SafeWithKeyhole: withContainedEntities(
    withSafeBehaviour(withEntityBehaviour(detail(Entities.SafeWithKeyhole)))
  )
}

export const getEntityDetailComponent = templateName =>
  Object.values(entityDetailComponents).find(
    component => component.templateName === templateName
  )

export const GenericEntityDetail = props =>
  _.compose(
    Component => <Component {...props} />,
    _.maybe(() => DefaultEntityDetail, _.identity),
    getEntityDetailComponent
  )(props.template.name)

export default entityDetailComponents
