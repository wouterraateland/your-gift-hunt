import React from "react"

import { storiesOf } from "@storybook/react"
import { Align } from "ygh-ui"

import withTheme from "./decorators/withTheme"

storiesOf("Overview", module)
  .addDecorator(withTheme)
  .add("Getting started", () => (
    <Align.Center>
      <small>Your Gift Hunt</small>
      <h1>Entity library</h1>
    </Align.Center>
  ))
