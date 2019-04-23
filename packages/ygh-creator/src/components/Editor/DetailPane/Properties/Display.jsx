import React, { useCallback, useMemo } from "react"

import useGame from "hooks/useGame"

import useAsync from "hooks/useAsync"

import { components } from "react-select"

import { Field, Select, Message } from "your-gift-hunt/ui"
import InformationSlotTag from "components/Editor/InformationSlotTag"

const Option = ({ data, ...otherProps }) => (
  <components.Option {...otherProps}>
    <InformationSlotTag
      entity={data.entity}
      informationSlot={data.informationSlot}
    />
  </components.Option>
)

const MultiValue = ({ data, ...otherProps }) => (
  <components.SingleValue {...otherProps}>
    <InformationSlotTag
      entity={data.entity}
      informationSlot={data.informationSlot}
    />
  </components.SingleValue>
)

const Display = ({ field }) => {
  const {
    game,
    connectInformationSlotWithField,
    disconnectInformationSlotFromField
  } = useGame()

  const [{ error, isLoading }, runAsync] = useAsync()

  const options = useMemo(
    () =>
      game.entities.flatMap(entity =>
        entity.informationSlots
          .filter(
            ({ id, allowedTypes }) =>
              entity.states.some(({ availableInformationSlots }) =>
                availableInformationSlots.some(slot => id === slot.id)
              ) &&
              allowedTypes.some(
                ({ type, isMulti }) =>
                  type === field.type.type && isMulti === field.type.isMulti
              )
          )
          .map(informationSlot => ({
            value: informationSlot.id,
            informationSlot,
            entity
          }))
      ),
    [field.type, game.entities]
  )

  const onChange = useCallback(
    runAsync(({ target: { value } }) =>
      Promise.all([
        ...value
          .filter(
            slotId => !field.informationSlots.some(({ id }) => id === slotId)
          )
          .map(slotId => connectInformationSlotWithField(slotId, field.id)),
        ...field.informationSlots
          .filter(({ id }) => !value.includes(id))
          .map(({ id }) => disconnectInformationSlotFromField(id))
      ])
    ),
    [field.id, field.informationSlots]
  )

  return (
    <Field block>
      <Select
        block
        components={{
          Option,
          MultiValue
        }}
        isClearable
        isMulti
        label="Clues"
        info="Where this property is displayed"
        options={options}
        value={field.informationSlots.map(({ id }) => id)}
        onChange={onChange}
        placeholder="Player should find out by itself"
        disabled={isLoading}
      />
      {error && <Message.Error>{error.message}</Message.Error>}
    </Field>
  )
}

export default Display
