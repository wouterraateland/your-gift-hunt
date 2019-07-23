import React, { useCallback } from "react"

import useEntities from "hooks/useEntities"
import useGameMutations from "hooks/useGameMutations"
import { useAsync } from "ygh-hooks"

import { components } from "react-select"

import { Field, FieldGroup, SelectOptions } from "ygh-ui"
import ClickableEntityTag from "components/GameCreator/ClickableEntityTag"
import EntityTag from "components/Primitives/EntityTag"

const Option = props => (
  <components.Option
    {...props}
    cx={(a, b, c) =>
      `${Object.keys(b).reduce(
        (acc, key) => (b[key] ? `${acc} ${key}` : acc),
        a
      )} ${c}`
    }
  >
    <EntityTag entity={props.data.entity} />
  </components.Option>
)

const MultiValueLabel = ({ data, ...otherProps }) => (
  <components.MultiValueLabel {...otherProps}>
    <ClickableEntityTag entity={data.entity} />
  </components.MultiValueLabel>
)

const Container = ({ entity }) => {
  const { entities, getEntityById } = useEntities()
  const {
    updateEntityContainer,
    disconnectEntityFromContainer
  } = useGameMutations()
  const [{ error, isLoading }, runAsync] = useAsync()

  const isContainedIn = (entity, containerId) =>
    entity.container &&
    (entity.container.id === containerId ||
      isContainedIn(
        entities.find(({ id }) => id === entity.container.id),
        containerId
      ))

  const options = entities
    .filter(({ id }) => id !== entity.id && !isContainedIn(entity, id))
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
    <FieldGroup block>
      <Field
        block
        isMulti
        components={{
          Option,
          MultiValueLabel
        }}
        label="Contained entities"
        placeholder="None"
        options={options}
        value={entity.containedEntities.map(({ id }) => id)}
        onChange={onChange}
        disabled={isLoading}
        error={error}
        component={SelectOptions}
      />
    </FieldGroup>
  )
}

export default Container
