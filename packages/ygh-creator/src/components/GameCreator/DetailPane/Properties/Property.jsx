import React, { useState, useEffect } from "react"
import styled from "styled-components"

import useGameMutations from "hooks/useGameMutations"
import useDebounce from "hooks/useDebounce"

import { Eye, Field, Input, Paper, ToolTip } from "your-gift-hunt/ui"

import Display from "./Display"

import _ from "utils"

const Blockquote = styled.blockquote`
  margin: -0.5em 0 1.5em;
`

const Property = ({ field }) => {
  const [newValue, setNewValue] = useState(
    field.value ? JSON.parse(field.value) : null
  )
  const { updateFieldValue } = useGameMutations()

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
    <>
      <Paper.Title as="h3">
        <Eye isOpen={!field.isSecret}>
          <ToolTip>{field.isSecret ? "Hidden" : "Visible"} for player</ToolTip>
        </Eye>
        {field.name}
      </Paper.Title>
      {field.description && <Blockquote>{field.description}</Blockquote>}
      <Field block>
        <Input
          block
          label={field.type.isMulti ? "Values" : "Value"}
          isMulti={field.type.isMulti}
          type={_.toInputType(field.type.type)}
          showType
          value={newValue}
          onChange={event => setNewValue(event.target.value)}
        />
      </Field>
      {field.isSecret && <Display field={field} />}
    </>
  )
}

export default Property
