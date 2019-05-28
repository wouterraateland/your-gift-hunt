import React from "react"

import EntityTag from "./EntityTag"

const InformationSlotTag = ({
  entity,
  informationSlot,
  showEntity = false
}) => {
  return (
    <EntityTag entity={entity} showEntity={showEntity} showIcon={false}>
      {showEntity && "."}
      {informationSlot.name || "Default"}
    </EntityTag>
  )
}

export default InformationSlotTag
