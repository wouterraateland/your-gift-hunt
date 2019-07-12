import React, { useCallback } from "react"

import useEntities from "hooks/useEntities"
import useGameMutations from "hooks/useGameMutations"
import { useAsync } from "ygh-hooks"

import { components } from "react-select"

import { Field, Message, Select } from "ygh-ui"
import ClickableEntityTag from "components/GameCreator/ClickableEntityTag"
import EntityTag from "components/Primitives/EntityTag"

const Option = ({ data, ...otherProps }) => (
  <components.Option {...otherProps}>
    <EntityTag entity={data.entity} />
  </components.Option>
)

const MultiValue = ({ data, ...otherProps }) => (
  <components.MultiValue {...otherProps}>
    <ClickableEntityTag entity={data.entity} />
  </components.MultiValue>
)

const Container = ({ entity }) => {
  const { entities, getEntityById } = useEntities()
  const {
    updateEntityContainer,
    disconnectEntityFromContainer
  } = useGameMutations()
  const [{ error, isLoading }, runAsync] = useAsync()

  const options = entities
    .filter(({ id }) => id !== entity.id)
    .map(entity => ({
      value: entity.id,
      entity
    }))

  const onChange = useCallback(
    runAsync(({ target: { value } }) =>
      Promise.all([
        ...value.map(async entityId => {
          const containedEntity = getEntityById(entityId)
          if (
            !containedEntity.container ||
            containedEntity.container.id !== entity.id
          ) {
            await updateEntityContainer(containedEntity.id, entity.id)
          }
        }),
        ...entity.containedEntities
          .filter(({ id }) => !value.includes(id))
          .map(async ({ id }) => {
            await disconnectEntityFromContainer(id)
          })
      ])
    ),
    [getEntityById, entity.id]
  )

  return (
    <Field block>
      <Select
        block
        isMulti
        components={{
          Option,
          MultiValue
        }}
        label="Contained entities"
        placeholder="None"
        options={options}
        value={entity.containedEntities.map(({ id }) => id)}
        onChange={onChange}
        disabled={isLoading}
      />
      {error && <Message.Error>{error.message}</Message.Error>}
    </Field>
  )
}

export default Container
