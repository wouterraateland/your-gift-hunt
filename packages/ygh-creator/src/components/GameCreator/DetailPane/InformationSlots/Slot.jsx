import React, { useCallback, useMemo } from "react"
import styled from "styled-components"

import useEntityGraph from "hooks/useEntityGraph"
import useGameMutations from "hooks/useGameMutations"

import { useAsync } from "ygh-hooks"

import { components } from "react-select"

import { FieldGroup, Message, Paper, Select } from "ygh-ui"
import FieldTag from "components/Primitives/FieldTag"

const Blockquote = styled.blockquote`
  margin: -0.5em 0 1.5em;
`

const Option = ({ data, ...otherProps }) => (
  <components.Option
    {...otherProps}
    cx={(a, b, c) =>
      `${Object.keys(b).reduce(
        (acc, key) => (b[key] ? `${acc} ${key}` : acc),
        a
      )} ${c}`
    }
  >
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
  const { nodes } = useEntityGraph()
  const {
    connectInformationSlotWithField,
    disconnectInformationSlotFromField
  } = useGameMutations()

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
      <FieldGroup block>
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
      </FieldGroup>
    </>
  )
}

export default Slot
