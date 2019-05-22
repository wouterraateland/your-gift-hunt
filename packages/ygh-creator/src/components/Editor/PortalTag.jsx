import React from "react"

import { Portal } from "your-gift-hunt/icons"
import EntityTag from "./EntityTag"

const PortalTag = ({ entity, portal, showEntity = false, showInfo = true }) => (
  <EntityTag entity={entity} showEntity={showEntity} showIcon={false}>
    .{portal.name || "Default"} <Portal />
  </EntityTag>
)

export default PortalTag
