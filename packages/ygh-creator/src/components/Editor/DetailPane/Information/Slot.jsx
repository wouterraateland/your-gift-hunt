import React, { useCallback, useContext } from "react"

import GameContext from "contexts/Game"

import useAsync from "hooks/useAsync"

import { components } from "react-select"

import { Field, Select, Message } from "your-gift-hunt/ui"
import EntityTag from "components/Editor/EntityTag"
import FieldTag from "components/Editor/FieldTag"

const Option = ({ data, ...otherProps }) => (
  <components.Option {...otherProps}>
    <EntityTag entity={data.instance.entity} /> (
    <FieldTag field={data.field} showInfo={false} />)
  </components.Option>
)

const SingleValue = ({ data, ...otherProps }) => (
  <components.SingleValue {...otherProps}>
    <EntityTag entity={data.instance.entity} /> (
    <FieldTag field={data.field} showInfo={false} />)
  </components.SingleValue>
)

const Slot = ({ name, description, allowedTypes, information }) => {
  const {
    nodes,
    connectInformationWithFieldValue,
    disconnectInformationFromFieldValue
  } = useContext(GameContext)

  const [{ error, isLoading }, runAsync] = useAsync()

  const options = nodes.flatMap(({ instance, state }) =>
    state
      ? state.state.outgoingTransitions
          .flatMap(({ requiredActions }) =>
            requiredActions.flatMap(({ payload }) => payload.requiredValues)
          )
          .filter(({ field }) => field !== null)
          .map(({ field }) =>
            instance.fieldValues.find(({ field: { id } }) => id === field.id)
          )
          .filter(fieldValue =>
            allowedTypes.some(
              ({ type, isMulti }) =>
                fieldValue.field.type.type === type &&
                fieldValue.field.type.isMulti === isMulti
            )
          )
          .map(({ id, field }) => ({
            instance,
            field,
            value: id
          }))
      : []
  )

  const onChange = useCallback(
    runAsync(({ target: { value } }) =>
      value
        ? connectInformationWithFieldValue(information.id, value)
        : disconnectInformationFromFieldValue(information.id)
    ),
    [information]
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
        label={name}
        info={description}
        options={options}
        value={information.fieldValue ? information.fieldValue.id : null}
        onChange={onChange}
        disabled={isLoading}
      />
      {error && <Message.Error>{error.message}</Message.Error>}
    </Field>
  )
}

export default Slot
