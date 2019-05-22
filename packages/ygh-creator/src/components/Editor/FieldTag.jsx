import React from "react"

import { InputType } from "your-gift-hunt/ui"
import EntityTag from "./EntityTag"
import _ from "utils"

const FieldTag = ({ entity, field, showEntity = false, showInfo = true }) => {
  return (
    <EntityTag entity={entity} showEntity={showEntity} showIcon={false}>
      .{field.name}
      <InputType
        type={_.toInputType(field.type.type)}
        isMulti={field.type.isMulti}
        showInfo={showInfo}
      />
    </EntityTag>
  )
}

export default FieldTag
