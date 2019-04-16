import React from "react"
import styled from "styled-components"

import BaseScreen from "./Base"
import { GenericEntityDetail } from "components/EntityDetails"

const SingleDetailScreen = styled(BaseScreen)``

export default ({ entity, ...props }) => (
  <SingleDetailScreen {...props}>
    <GenericEntityDetail {...entity} />
  </SingleDetailScreen>
)
