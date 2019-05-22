import React from "react"

import { Entrance } from "your-gift-hunt/icons"
import EntityTag from "./EntityTag"

const EntranceTag = ({
  entity,
  entrance,
  showEntity = false,
  showInfo = true
}) => (
  <EntityTag entity={entity} showEntity={showEntity} showIcon={false}>
    .{entrance.name || "Default"} <Entrance />
  </EntityTag>
)

export default EntranceTag
