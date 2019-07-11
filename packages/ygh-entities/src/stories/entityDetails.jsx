import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, radios, number } from "@storybook/addon-knobs"

import withTheme from "./decorators/withTheme"
import withCenter from "./decorators/withCenter"

import Entities from "../Entities"
import DefaultDetail from "../EntityDetails/Default"

const getProps = Entity => {
  const EntityDetail = Entity.Detail || DefaultDetail
  return {
    state: {
      name:
        Entity.states && Entity.states.length
          ? radios(
              "state",
              Entity.states.reduce(
                (acc, name) => ({ ...acc, [name]: name }),
                {}
              ),
              Entity.states[0]
            )
          : radios("state", { Default: "" }, "")
    },
    width: number("width", EntityDetail.defaultProps.width),
    height: number("height", EntityDetail.defaultProps.height),
    rotation: number("rotation", EntityDetail.defaultProps.rotation),
    containedEntities: []
  }
}

let stories = storiesOf("Entity Details", module)
  .addDecorator(withCenter)
  .addDecorator(withTheme)
  .addDecorator(withKnobs)

Object.keys(Entities).forEach(key => {
  const Entity = Entities[key]
  const EntityDetail = Entity.Detail || DefaultDetail
  stories = stories.add(Entity.name || "Default", () => (
    <EntityDetail {...getProps(Entity)} />
  ))
})
