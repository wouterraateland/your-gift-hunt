import React from "react"

import { Entrance } from "your-gift-hunt/icons"
import EntityTag from "./EntityTag"

const EntranceTag = ({ entity, entrance, showEntity = false }) => (
  <EntityTag entity={entity} showEntity={showEntity} showIcon={false}>
    {showEntity && "."}
    {entrance.name || "Default"} <Entrance />
  </EntityTag>
)

export default EntranceTag
