import React from "react"
import { Theme } from "../../"

const withTheme = story => <Theme>{story()}</Theme>

export default withTheme
