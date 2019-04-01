import React, { useCallback, useContext, useMemo } from "react"

import GameContext from "contexts/Game"

import useAsync from "hooks/useAsync"

import { components } from "react-select"

import { Field, Select, Message } from "your-gift-hunt/ui"
import EntityTag from "components/Editor/EntityTag"
import FieldTag from "components/Editor/FieldTag"

const Option = ({ data, ...otherProps }) => (
  <components.Option {...otherProps}>
    <EntityTag entity={data.entity} /> (
    <FieldTag field={data.field} showInfo={false} />)
  </components.Option>
)

const SingleValue = ({ data, ...otherProps }) => (
  <components.SingleValue {...otherProps}>
    <EntityTag entity={data.entity} /> (
    <FieldTag field={data.field} showInfo={false} />)
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
                requiredActions.flatMap(({ payload }) => payload.requiredInputs)
              )
              .filter(({ field }) => field !== null)
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
    <Field block>
      <Select
        block
        components={{
          Option,
          SingleValue
        }}
        isClearable
        label={slot.name}
        info={slot.description}
        options={options}
        value={slot.field ? slot.field.id : null}
        onChange={onChange}
        disabled={isLoading}
      />
      {error && <Message.Error>{error.message}</Message.Error>}
    </Field>
  )
}

export default Slot
