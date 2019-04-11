import React from "react"
import Theme from "containers/Theme"

const withTheme = story => <Theme>{story()}</Theme>

export default withTheme
