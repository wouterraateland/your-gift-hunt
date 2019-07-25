import React, { useCallback } from "react"
import styled from "styled-components"

import useEntities from "hooks/useEntities"
import useGameMutations from "hooks/useGameMutations"
import useGameTemplates from "hooks/useGameTemplates"
import { useAsync } from "ygh-hooks"

import { components } from "react-select"

import { Field, FieldGroup, Paper, SelectOptions } from "ygh-ui"
import PortalTag from "components/Primitives/PortalTag"

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
    <PortalTag
      entity={data.entity}
      portal={data.portal}
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
    <PortalTag
      entity={data.entity}
      portal={data.portal}
      showInfo={false}
      showEntity
    />
  </components.SingleValue>
)

const Entrance = ({ entrance }) => {
  const { entities } = useEntities()
  const {
    connectPortalWithEntrance,
    disconnectPortalFromEntrance
  } = useGameMutations()
  const { getEntranceTemplateById } = useGameTemplates()
  const [{ error, isLoading }, runAsync] = useAsync()

  const entranceTemplate = getEntranceTemplateById(entrance.template.id)
  const connectablePortalTemplateIds = entranceTemplate.connectablePortals.map(
    ({ id }) => id
  )

  const options = entities.flatMap(entity =>
    entity.portals
      .filter(({ template: { id } }) =>
        connectablePortalTemplateIds.includes(id)
      )
      .map(portal => ({
        value: portal.id,
        entity,
        portal
      }))
  )

  const onChange = useCallback(
    runAsync(({ target: { value } }) =>
      value
        ? connectPortalWithEntrance(value, entrance.id)
        : disconnectPortalFromEntrance(entrance.id)
    ),
    [entrance.id]
  )

  return (
    <>
      <Paper.Title as="h3">{entrance.name || "Default"}</Paper.Title>
      {entrance.description && <Blockquote>{entrance.description}</Blockquote>}
      <FieldGroup block>
        <Field
          block
          components={{
            Option,
            SingleValue
          }}
          isClearable
          label="Connected portal"
          placeholder="None"
          options={options}
          value={entrance.portal ? entrance.portal.id : null}
          onChange={onChange}
          disabled={isLoading}
          error={error}
          component={SelectOptions}
        />
      </FieldGroup>
    </>
  )
}

export default Entrance
