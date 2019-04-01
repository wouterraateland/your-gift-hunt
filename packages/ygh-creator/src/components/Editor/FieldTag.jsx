import React from "react"

import { InputType } from "your-gift-hunt/ui"
import EntityTag from "./EntityTag"
import _ from "utils"

const FieldTag = ({ entity, field, showEntity = false, showInfo = true }) => {
  return (
    <EntityTag
      name={
        <>
          {showEntity ? `${entity.name}.${field.name}` : field.name}
          <InputType
            type={_.toInputType(field.type.type)}
            isMulti={field.type.isMulti}
            showInfo={showInfo}
          />
        </>
      }
      showIcon={false}
    />
  )
}

export default FieldTag
