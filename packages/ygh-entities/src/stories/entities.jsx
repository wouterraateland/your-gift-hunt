import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, radios, number } from "@storybook/addon-knobs"

import withTheme from "./decorators/withTheme"
import withCenter from "./decorators/withCenter"

import Entities from "../Entities"

const getProps = Entity => ({
  state: {
    name:
      Entity.states && Entity.states.length
        ? radios(
            "state",
            Entity.states.reduce((acc, name) => ({ ...acc, [name]: name }), {}),
            Entity.states[0]
          )
        : radios("state", { Default: "" }, "")
  },
  width: number("width", Entity.defaultProps.width),
  height: number("height", Entity.defaultProps.height),
  rotation: number("rotation", Entity.defaultProps.rotation)
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
