import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, color, number, radios } from "@storybook/addon-knobs"

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
              "State",
              Entity.states.reduce(
                (acc, name) => ({ ...acc, [name]: name }),
                {}
              ),
              Entity.states[0]
            )
          : radios("State", { Default: "" }, "")
    },
    width: number("Width", EntityDetail.defaultProps.width),
    height: number("Height", EntityDetail.defaultProps.height),
    rotation: number("Rotation", EntityDetail.defaultProps.rotation),
    containedEntities: [],
    color: color("Color", Entity.defaultProps.color)
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
