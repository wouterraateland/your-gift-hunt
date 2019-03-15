import React from "react"

import { InputType } from "your-gift-hunt/ui"
import _ from "utils"

const FieldTag = ({ field, showInfo = true }) => {
  const { label, type, isSecret } = field

  return (
    <strong>
      {label}
      <InputType
        type={_.toInputType(type.type)}
        isMulti={type.isMulti}
        isSecret={isSecret}
        showInfo={showInfo}
      />
    </strong>
  )
}

export default FieldTag
