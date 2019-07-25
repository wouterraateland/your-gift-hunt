import React, { useCallback } from "react"
import styled from "styled-components"

import useEntities from "hooks/useEntities"
import useGameMutations from "hooks/useGameMutations"
import useGameTemplates from "hooks/useGameTemplates"
import { useAsync } from "ygh-hooks"

import { components } from "react-select"

import { Field, FieldGroup, Paper, SelectOptions } from "ygh-ui"
import EntranceTag from "components/Primitives/EntranceTag"

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
    <EntranceTag
      entity={data.entity}
      entrance={data.entrance}
      showInfo={false}
      showEntity
    />
  </components.Option>
)

const SingleValue = ({ data, ...otherProps }) => (
  <components.SingleValue
    {...otherProps}
    cx={(a, b, c) =>
      `${Object.keys(b).reduce(
        (acc, key) => (b[key] ? `${acc} ${key}` : acc),
        a
      )} ${c}`
    }
  >
    <EntranceTag
      entity={data.entity}
      entrance={data.entrance}
      showInfo={false}
      showEntity
    />
  </components.SingleValue>
)

const Portal = ({ portal }) => {
  const { entities } = useEntities()
  const {
    connectPortalWithEntrance,
    disconnectEntranceFromPortal
  } = useGameMutations()
  const { getPortalTemplateById } = useGameTemplates()
  const [{ error, isLoading }, runAsync] = useAsync()

  const portalTemplate = getPortalTemplateById(portal.template.id)
  const connectableEntranceTemplateIds = portalTemplate.connectableEntrances.map(
    ({ id }) => id
  )

  const options = entities.flatMap(entity =>
    entity.entrances
      .filter(({ template: { id } }) =>
        connectableEntranceTemplateIds.includes(id)
      )
      .map(entrance => ({
        value: entrance.id,
        entity,
        entrance
      }))
  )

  const onChange = useCallback(
    runAsync(({ target: { value } }) =>
      value
        ? connectPortalWithEntrance(portal.id, value)
        : disconnectEntranceFromPortal(portal.id)
    ),
    [portal.id]
  )

  return (
    <>
      <Paper.Title as="h3">{portal.name || "Default"}</Paper.Title>
      {portal.description && <Blockquote>{portal.description}</Blockquote>}
      <FieldGroup block>
        <Field
          block
          components={{
            Option,
            SingleValue
          }}
          isClearable
          label="Connected entrance"
          placeholder="None"
          options={options}
          value={portal.entrance ? portal.entrance.id : null}
          onChange={onChange}
          disabled={isLoading}
          error={error}
          component={SelectOptions}
        />
      </FieldGroup>
    </>
  )
}

export default Portal
