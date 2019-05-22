import React, { useCallback } from "react"
import styled from "styled-components"

import useEntities from "hooks/useEntities"
import useGameMutations from "hooks/useGameMutations"
import useTemplates from "hooks/useTemplates"
import useAsync from "hooks/useAsync"

import { components } from "react-select"

import { Field, Message, Paper, Select } from "your-gift-hunt/ui"
import EntranceTag from "components/Editor/EntranceTag"

const Blockquote = styled.blockquote`
  margin: -0.5em 0 1.5em;
`

const Option = ({ data, ...otherProps }) => (
  <components.Option {...otherProps}>
    <EntranceTag
      entity={data.entity}
      entrance={data.entrance}
      showInfo={false}
      showEntity
    />
  </components.Option>
)

const SingleValue = ({ data, ...otherProps }) => (
  <components.SingleValue {...otherProps}>
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
  const { getPortalTemplateById } = useTemplates()
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
      <Field block>
        <Select
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
        />
        {error && <Message.Error>{error.message}</Message.Error>}
      </Field>
    </>
  )
}

export default Portal
