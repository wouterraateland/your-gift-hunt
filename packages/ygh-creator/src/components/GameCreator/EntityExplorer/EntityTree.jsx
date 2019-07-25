import React, { useCallback, useLayoutEffect, useRef, useState } from "react"
import styled from "styled-components"

import { useClickOutside } from "ygh-hooks"
import useEntities from "hooks/useEntities"
import useInspector from "hooks/useInspector"
import useGameMutations from "hooks/useGameMutations"

import { ActionButton, Field, ToolTip } from "ygh-ui"
import Icons from "ygh-icons"
import EntityTypeIcon from "components/EntityTypeIcon"

const Actions = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;

  padding: 0.25em 0.25em 0.25em 2em;

  background: linear-gradient(90deg, transparent, #fcfcfc);
`

const StyledEntityLeaf = styled.div`
  position: relative;
  cursor: pointer;

  display: flex;
  padding: 0 0.5em;
  height: 2em;

  line-height: 1;
  white-space: nowrap;

  align-items: center;

  & ${Actions} {
    opacity: 0;
  }

  &:hover {
    background-color: #fcfcfc;

    & ${Actions} {
      opacity: 1;
    }
  }
`

const HSpace = styled.span`
  display: inline-block;
  width: 0.5em;
`

const Children = styled.div`
  padding-left: 1em;
`

const EditableEntityName = ({ entity, onSubmit }) => {
  const ref = useRef(null)
  const { updateEntityName } = useGameMutations()

  const [value, setValue] = useState(entity.name)

  const handleSubmit = useCallback(() => {
    updateEntityName(entity.id, value)
    onSubmit()
  }, [entity.id, onSubmit])

  const onKeyDown = useCallback(
    event => {
      if (event.key === "Enter") {
        handleSubmit()
      }
    },
    [handleSubmit]
  )

  useClickOutside({
    ref,
    onClickOutside: () => handleSubmit()
  })

  useLayoutEffect(() => {
    ref.current.focus()
  }, [])

  return (
    <Field
      ref={ref}
      block
      size="tiny"
      value={value}
      onKeyDown={onKeyDown}
      onClick={event => event.stopPropagation()}
      onChange={event => setValue(event.target.value)}
    />
  )
}

const EntityLeaf = ({ entity, children }) => {
  const [isExpanded, setExpanded] = useState(false)
  const [isEditable, setEditable] = useState(false)

  const { inspectEntity } = useInspector()
  return (
    <>
      <StyledEntityLeaf onClick={() => inspectEntity(entity.id)}>
        <EntityTypeIcon {...entity} />
        <HSpace />
        {isEditable ? (
          <EditableEntityName
            entity={entity}
            onSubmit={() => setEditable(false)}
          />
        ) : (
          <>
            {entity.name}
            <Actions>
              <ActionButton onClick={() => setEditable(true)}>
                <ToolTip>Rename</ToolTip>
                <Icons.Pen />
              </ActionButton>
              <ActionButton color="error">
                <ToolTip>Delete</ToolTip>
                <Icons.Bin />
              </ActionButton>
              {children && (
                <ActionButton
                  onClick={event => {
                    event.stopPropagation()
                    setExpanded(isExpanded => !isExpanded)
                  }}
                >
                  <Icons.Caret direction={isExpanded ? "down" : "right"} />
                  <ToolTip>{isExpanded ? "Collapse" : "Expand"}</ToolTip>
                </ActionButton>
              )}
            </Actions>
          </>
        )}
      </StyledEntityLeaf>
      {isExpanded && <Children>{children}</Children>}
    </>
  )
}

const EntityTree = ({ entities }) => {
  const { getEntityById } = useEntities()

  return entities.map(entity =>
    entity.isContainer ? (
      <EntityLeaf key={entity.id} entity={entity}>
        <EntityTree
          entities={entity.containedEntities.map(({ id }) => getEntityById(id))}
        />
      </EntityLeaf>
    ) : (
      <EntityLeaf key={entity.id} entity={entity} />
    )
  )
}

export default EntityTree
