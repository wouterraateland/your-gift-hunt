import React from "react"

import { storiesOf } from "@storybook/react"
import { Align } from "../"

storiesOf("Overview", module).add("Getting started", () => (
  <Align.Center>
    <small>Your Gift Hunt</small>
    <h1>UI library</h1>
  </Align.Center>
))
