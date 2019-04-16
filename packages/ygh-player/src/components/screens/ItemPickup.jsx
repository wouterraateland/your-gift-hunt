import React from "react"
import styled from "styled-components"

import BaseScreen from "./Base"
import { GenericEntity } from "components/entities"

const ItemPickupScreen = styled(BaseScreen)``

export default ({ entity, ...props }) => (
  <ItemPickupScreen {...props}>
    <GenericEntity {...entity} />
    {entity.name}
  </ItemPickupScreen>
)
