import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { useDebounce } from "ygh-hooks"
import {
  FieldGroup,
  Field,
  Paper,
  ToolTip,
  DefaultInput,
  TagInput
} from "ygh-ui"
import Icons from "ygh-icons"
import _ from "ygh-utils"

import useGameMutations from "hooks/useGameMutations"

import Display from "./Display"

const Blockquote = styled.blockquote`
  margin: -0.5em 0 1.5em;
`

const Property = ({ field }) => {
  const [newValue, setNewValue] = useState(
    field.value ? JSON.parse(field.value) : null
  )
  const { updateFieldValue } = useGameMutations()

  const debouncedValue = useDebounce(newValue, 1000)

  useEffect(() => {
    const newValue = JSON.stringify(debouncedValue)
    if (newValue !== field.value) {
      updateFieldValue(field.id, newValue)
    }
  }, [field.id, field.value, debouncedValue])

  return (
    <>
      <Paper.Title as="h3">
        <Icons.Eye isOpen={!field.isSecret}>
          <ToolTip>{field.isSecret ? "Hidden" : "Visible"} for player</ToolTip>
        </Icons.Eye>
        {field.name}
      </Paper.Title>
      {field.description && <Blockquote>{field.description}</Blockquote>}
      <FieldGroup block>
        <Field
          block
          label={field.type.isMulti ? "Values" : "Value"}
          isMulti={field.type.isMulti}
          type={_.toInputType(field.type.type)}
          component={field.type.isMulti ? TagInput : DefaultInput}
          showType
          value={newValue}
          onChange={event => setNewValue(event.target.value)}
        />
      </FieldGroup>
      {field.isSecret && <Display field={field} />}
    </>
  )
}

export default Property
