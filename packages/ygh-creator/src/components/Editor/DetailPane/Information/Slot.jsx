import React, { useCallback, useContext, useMemo } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"

import useAsync from "hooks/useAsync"

import { components } from "react-select"

import { Field, Message, Paper, Select } from "your-gift-hunt/ui"
import FieldTag from "components/Editor/FieldTag"

const Blockquote = styled.blockquote`
  margin: -0.5em 0 1.5em;
`

const Option = ({ data, ...otherProps }) => (
  <components.Option {...otherProps}>
    <FieldTag
      entity={data.entity}
      field={data.field}
      showInfo={false}
      showEntity
    />
  </components.Option>
)

const SingleValue = ({ data, ...otherProps }) => (
  <components.SingleValue {...otherProps}>
    <FieldTag
      entity={data.entity}
      field={data.field}
      showInfo={false}
      showEntity
    />
  </components.SingleValue>
)

const Slot = ({ slot }) => {
  const {
    nodes,
    connectInformationSlotWithField,
    disconnectInformationSlotFromField
  } = useContext(GameContext)

  const [{ error, isLoading }, runAsync] = useAsync()

  const options = useMemo(
    () =>
      nodes.flatMap(({ entity, state }) =>
        state
          ? state.outgoingTransitions
              .flatMap(({ requiredActions }) =>
                requiredActions.flatMap(({ payload }) => payload.requiredInput)
              )
              .filter(requiredInput => requiredInput && requiredInput.field)
              .map(({ field }) =>
                entity.fields.find(({ id }) => id === field.id)
              )
              .filter(field =>
                slot.allowedTypes.some(
                  ({ type, isMulti }) =>
                    field.type.type === type && field.type.isMulti === isMulti
                )
              )
              .map(field => ({
                entity,
                field,
                value: field.id
              }))
          : []
      ),
    [slot.allowedTypes, nodes]
  )

  const onChange = useCallback(
    runAsync(({ target: { value } }) =>
      value
        ? connectInformationSlotWithField(slot.id, value)
        : disconnectInformationSlotFromField(slot.id)
    ),
    [slot.id]
  )

  return (
    <>
      <Paper.Title as="h3">{slot.name}</Paper.Title>
      {slot.description && <Blockquote>{slot.description}</Blockquote>}
      <Field block>
        <Select
          block
          components={{
            Option,
            SingleValue
          }}
          isClearable
          label="Connected property"
          placeholder="None"
          options={options}
          value={slot.field ? slot.field.id : null}
          onChange={onChange}
          disabled={isLoading}
        />
        {error && <Message.Error>{error.message}</Message.Error>}
      </Field>
    </>
  )
}

export default Slot
