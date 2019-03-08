import React, { useContext, useState, useEffect } from "react"

import GameContext from "contexts/Game"
import useDebounce from "hooks/useDebounce"

import { Paper, Input, Field } from "your-gift-hunt/ui"

const toInputType = type => {
  switch (type) {
    case "STRING":
      return "textarea"
    case "NUMBER":
      return "number"
    default:
      return type
  }
}

const EntityInstanceField = ({ id, value, field }) => {
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
        type={toInputType(field.type)}
        showType
        value={newValue}
        onChange={event => setNewValue(event.target.value)}
      />
    </Field>
  )
}

const FieldsForm = ({
  node: {
    instance: { fields }
  }
}) =>
  fields.length ? (
    <Paper>
      <Paper.Section>
        <Paper.Title size={3}>Properties</Paper.Title>
        {fields.map(field => (
          <EntityInstanceField key={field.id} {...field} />
        ))}
      </Paper.Section>
    </Paper>
  ) : null

export default FieldsForm
