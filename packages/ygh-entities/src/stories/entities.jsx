import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, radios, number, color } from "@storybook/addon-knobs"

import withTheme from "./decorators/withTheme"
import withCenter from "./decorators/withCenter"

import Entities from "../Entities"

const getProps = Entity => ({
  state: {
    name:
      Entity.states && Entity.states.length
        ? radios(
            "State",
            Entity.states.reduce((acc, name) => ({ ...acc, [name]: name }), {}),
            Entity.states[0]
          )
        : radios("State", { Default: "" }, "")
  },
  width: number("Width", Entity.defaultProps.width),
  height: number("Height", Entity.defaultProps.height),
  rotation: number("Rotation", Entity.defaultProps.rotation),
  color: color("Color", Entity.defaultProps.color)
})

let stories = storiesOf("Entities", module)
  .addDecorator(withCenter)
  .addDecorator(withTheme)
  .addDecorator(withKnobs)

Object.keys(Entities).forEach(key => {
  const Entity = Entities[key]
  stories = stories.add(Entity.name || "Default", () => (
    <Entity {...getProps(Entity)} />
  ))
})
