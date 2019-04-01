import React from "react"

import EntityTag from "./EntityTag"

const InformationSlotTag = ({ entity, informationSlot, showEntity = true }) => {
  return (
    <EntityTag
      name={
        showEntity
          ? `${entity.name}.${informationSlot.name}`
          : informationSlot.name
      }
    />
  )
}

export default InformationSlotTag
