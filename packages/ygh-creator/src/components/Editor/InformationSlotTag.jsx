import React from "react"

import EntityTag from "./EntityTag"

const InformationSlotTag = ({ entity, informationSlot, showEntity = true }) => {
  return (
    <EntityTag entity={entity} showEntity={showEntity}>
      {informationSlot.name}
    </EntityTag>
  )
}

export default InformationSlotTag
