import React, { useCallback, useContext } from "react"

import GameContext from "contexts/Game"
import EntitiesContext from "contexts/Entities"

import { Field, Select } from "your-gift-hunt/ui"

const Slot = ({ id, name, description, allowedTypes, information }) => {
  const { nodes } = useContext(GameContext)
  const { getFieldById } = useContext(EntitiesContext)

  const options = nodes.flatMap(({ state }) =>
    state
      ? state.state.outgoingTransitions
          .flatMap(({ requiredActions }) =>
            requiredActions.flatMap(({ payload }) => payload.requiredValues)
          )
          .filter(({ field }) => field !== null)
          .map(({ field }) => getFieldById(field.id))
          .filter(field =>
            allowedTypes.some(
              ({ type, isMulti }) =>
                field.type.type === type && field.type.isMulti === isMulti
            )
          )
          .map(field => ({ label: field.label, value: field.id }))
      : []
  )

  const onChange = useCallback(event => console.log(event.target.value), [])

  return (
    <Field block>
      <Select block label={name} options={options} onChange={onChange} />
    </Field>
  )
}

export default Slot
