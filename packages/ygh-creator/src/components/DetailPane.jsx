import React from "react"
import styled from "styled-components"

import { Paper } from "your-gift-hunt/ui"

const StyledDetailPane = styled(Paper)`
  width: 20em;
`

const DetailPane = ({ children }) => {
  return <StyledDetailPane>{children}</StyledDetailPane>
}

export default DetailPane
