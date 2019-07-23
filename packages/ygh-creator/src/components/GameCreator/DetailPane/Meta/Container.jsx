import React, { useCallback } from "react"

import useEntities from "hooks/useEntities"
import useGameMutations from "hooks/useGameMutations"
import { useAsync } from "ygh-hooks"

import { components } from "react-select"

import { Field, FieldGroup, SelectOptions } from "ygh-ui"
import EntityTag from "components/Primitives/EntityTag"
import ClickableEntityTag from "components/GameCreator/ClickableEntityTag"

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
    .filter(
      containerEntity =>
        containerEntity.isContainer &&
        containerEntity.id !== entity.id &&
        !isContainedIn(containerEntity, entity.id)
    )
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
    }),
    [entity.id]
  )

  return (
    <FieldGroup block>
      <Field
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
        error={error}
        component={SelectOptions}
      />
    </FieldGroup>
  )
}

export default Container
