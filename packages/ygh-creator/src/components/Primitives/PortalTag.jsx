import React from "react"

import { Portal } from "ygh-icons"
import EntityTag from "./EntityTag"

const PortalTag = ({ entity, portal, showEntity = false }) => (
  <EntityTag entity={entity} showEntity={showEntity} showIcon={false}>
    {showEntity && "."}
    {portal.name || "Default"} <Portal />
  </EntityTag>
)

export default PortalTag
