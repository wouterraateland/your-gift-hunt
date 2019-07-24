import React, { useState } from "react"
import styled from "styled-components"

import useEntities from "hooks/useEntities"
import useInspector from "hooks/useInspector"

import { ActionButton, ToolTip } from "ygh-ui"
import Icons from "ygh-icons"
import EntityTypeIcon from "components/EntityTypeIcon"

const Actions = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;

  padding: 0.5em 0.5em 0.5em 2em;

  background: linear-gradient(90deg, transparent, #f9f9f9);
`

const StyledEntityLeaf = styled.div`
  position: relative;
  cursor: pointer;

  padding: 0.5em;

  line-height: 1;
  white-space: nowrap;

  & ${Actions} {
    opacity: 0;
  }

  &:hover {
    background-color: #f9f9f9;

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

const EntityLeaf = ({ entity, children }) => {
  const [isExpanded, setExpanded] = useState(false)
  const { inspectEntity } = useInspector()
  return (
    <>
      <StyledEntityLeaf onClick={() => inspectEntity(entity.id)}>
        <EntityTypeIcon {...entity} />
        <HSpace />
        {entity.name}
        <Actions>
          <ActionButton>
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
