import React from "react"
import { Theme } from "ygh-ui"

const withTheme = story => <Theme>{story()}</Theme>

export default withTheme
