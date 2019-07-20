import React from "react"
import { configure, addDecorator } from "@storybook/react"

import { withKnobs } from "@storybook/addon-knobs"
import withTheme from "../src/stories/decorators/withTheme"
import withToolTipRoot from "../src/stories/decorators/withToolTipRoot"

const req = require.context("../src/stories", true, /.jsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
addDecorator(Story => <Story />)
addDecorator(withTheme)
addDecorator(withToolTipRoot)
addDecorator(withKnobs)
