import React, { useCallback } from "react"

import useEntities from "hooks/useEntities"
import useEntityAreas from "hooks/useEntityAreas"
import useGameMutations from "hooks/useGameMutations"
import useAsync from "hooks/useAsync"

import { components } from "react-select"

import { Field, Message, Select } from "your-gift-hunt/ui"
import EntityTag from "components/Primitives/EntityTag"
import ClickableEntityTag from "components/GameCreator/ClickableEntityTag"

const Option = ({ data, ...otherProps }) => (
  <components.Option {...otherProps}>
    <EntityTag entity={data.entity} />
  </components.Option>
)

const SingleValue = ({ data, ...otherProps }) => (
  <components.SingleValue {...otherProps}>
    <ClickableEntityTag entity={data.entity} />
  </components.SingleValue>
)

const Container = ({ entity }) => {
  const { entities } = useEntities()
  const { syncEntityGraphPosition } = useEntityAreas()
  const {
    updateEntityContainer,
    disconnectEntityFromContainer
  } = useGameMutations()
  const [{ error, isLoading }, runAsync] = useAsync()

  const options = entities
    .filter(({ id, isContainer }) => isContainer && id !== entity.id)
    .map(entity => ({
      value: entity.id,
      entity
    }))

  const onChange = useCallback(
    runAsync(async ({ target: { value } }) => {
      if (value) {
        await updateEntityContainer(entity.id, value)
      } else {
        await disconnectEntityFromContainer(entity.id)
      }

      syncEntityGraphPosition(
        entity.id,
        entity.container ? entity.container.id : null,
        value ? value : null
      )
    }),
    [entity.id, syncEntityGraphPosition]
  )

  return (
    <Field block>
      <Select
        block
        components={{
          Option,
          SingleValue
        }}
        label="Container"
        placeholder="None"
        isClearable
        options={options}
        value={entity.container ? entity.container.id : null}
        onChange={onChange}
        disabled={isLoading}
      />
      {error && <Message.Error>{error.message}</Message.Error>}
    </Field>
  )
}

export default Container
