import React, { useContext, useState, useEffect } from "react"

import GameContext from "contexts/Game"
import useDebounce from "hooks/useDebounce"

import { Input, Field } from "your-gift-hunt/ui"

import _ from "utils"

const Property = ({ field }) => {
  const [newValue, setNewValue] = useState(
    field.value ? JSON.parse(field.value) : null
  )
  const { updateFieldValue } = useContext(GameContext)

  const debouncedValue = useDebounce(newValue, 1000)

  useEffect(
    () => {
      const newValue = JSON.stringify(debouncedValue)
      if (newValue !== field.value) {
        updateFieldValue(field.id, newValue)
      }
    },
    [field.id, field.value, debouncedValue]
  )

  return (
    <Field block>
      <Input
        block
        label={field.name}
        info={field.description}
        isSecret={field.isSecret}
        isMulti={field.type.isMulti}
        type={_.toInputType(field.type.type)}
        showType
        value={newValue}
        onChange={event => setNewValue(event.target.value)}
      />
    </Field>
  )
}

export default Property
