import React from "react"
import styled, { css } from "styled-components"

import EntityPreview from "../EntityPreview"
import EntityDetails from "./EntityDetails"

const EntityEntryContainer = styled.div`
  position: relative;
  padding: 0.5em 1em;

  ${props =>
    props.isDisabled
      ? css`
          pointer-events: none;
        `
      : css`
          cursor: pointer;

          &:hover {
            background-color: #0004;
          }
        `}

  &:first-child {
    border-radius: ${props => props.theme.borderRadius}
      ${props => props.theme.borderRadius} 0 0;
  }

  &:last-child {
    border-radius: 0 0 ${props => props.theme.borderRadius}
      ${props => props.theme.borderRadius};
  }

  &:nth-child(2n) {
    background-color: #0002;
  }
`

const Name = styled.h2`
  color: #fff;
  margin: 0 0 0.25em;
`

const StatusLabel = styled.small`
  margin: 0;
  opacity: 0.5;
`

const ProLabel = styled.span`
  display: inline-block;
  padding: 0.25em 0.5em;
  margin-left: 0.5em;
  border-radius: ${props => props.theme.borderRadius};

  font-family: ${props => props.theme.font.copy};
  font-weight: 900;
  font-size: 1rem;
  text-transform: uppercase;
  vertical-align: middle;

  background: ${props => props.theme.color.accent};
  color: ${props => props.theme.color.emphasis};
`

const PreviewContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 4em;
  height: 4em;
  padding: 0.75em;

  opacity: ${props => (props.isDisabled ? 0.5 : 1)};
`

const Info = styled.em`
  ${"" /* pointer-events: auto; */}
  cursor: pointer;

  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  margin-left: 0.5em;
  border-radius: 100%;

  font-size: 1rem;
  line-height: 1.2;
  text-align: center;
  vertical-align: middle;

  background-color: #fff2;
`

const EntityEntry = ({
  entity,
  isPro,
  isUpcoming,
  isAvailable,
  isExpanded,
  onClick,
  onInfoClick
}) => (
  <EntityEntryContainer
    isDisabled={!isAvailable || isUpcoming}
    onClick={onClick}
    isExpanded={isExpanded}
  >
    <Name>
      {entity.name}
      {isPro && <ProLabel>Pro</ProLabel>}
      <Info onClick={onInfoClick}>i</Info>
    </Name>
    <StatusLabel>
      {isAvailable
        ? isUpcoming
          ? "Upcoming"
          : "Available"
        : "Max instances reached"}
    </StatusLabel>
    <PreviewContainer isDisabled={!isAvailable || isUpcoming}>
      <EntityPreview
        rotateObjects
        entity={entity}
        state={
          (entity.defaultState
            ? entity.states.find(({ id }) => id === entity.defaultState.id)
            : entity.states[0]
          ).name
        }
        maxWidth={2.5}
        maxHeight={2.5}
      />
    </PreviewContainer>
    <EntityDetails isExpanded={isExpanded} entity={entity} />
  </EntityEntryContainer>
)

export default EntityEntry
