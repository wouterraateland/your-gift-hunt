import React from "react"

import _ from "ygh-utils"
import { InputType } from "ygh-ui"
import EntityTag from "./EntityTag"

const FieldTag = ({ entity, field, showEntity = false, showInfo = true }) => {
  return (
    <EntityTag entity={entity} showEntity={showEntity} showIcon={false}>
      {showEntity && "."}
      {field.name || "Default"}
      <InputType
        type={_.toInputType(field.type.type)}
        isMulti={field.type.isMulti}
        showInfo={showInfo}
      />
    </EntityTag>
  )
}

export default FieldTag
