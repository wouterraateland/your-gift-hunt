import React, { useContext, useState, useEffect } from "react"

import GameContext from "contexts/Game"
import useDebounce from "hooks/useDebounce"

import { Input, Field } from "your-gift-hunt/ui"

import _ from "utils"

const Property = ({ id, value, field }) => {
  const [newValue, setNewValue] = useState(value ? JSON.parse(value) : null)
  const { updateEntityInstanceField } = useContext(GameContext)

  const debouncedValue = useDebounce(newValue, 1000)

  useEffect(
    () => {
      const newValue = JSON.stringify(debouncedValue)
      if (newValue !== value) {
        updateEntityInstanceField(id, newValue)
      }
    },
    [id, debouncedValue]
  )

  return (
    <Field block>
      <Input
        block
        {...field}
        type={_.toInputType(field.type)}
        showType
        value={newValue}
        onChange={event => setNewValue(event.target.value)}
      />
    </Field>
  )
}

export default Property
