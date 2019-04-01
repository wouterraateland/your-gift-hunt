import React from "react"

import { InputType } from "your-gift-hunt/ui"
import _ from "utils"

const FieldTag = ({ field, showInfo = true }) => {
  const { name, type, isSecret } = field

  return (
    <strong>
      {name}
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
