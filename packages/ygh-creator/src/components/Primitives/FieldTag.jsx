import React from "react"

import { InputType } from "ygh-ui"
import EntityTag from "./EntityTag"
import _ from "utils"

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
