import React, { useMemo } from "react"
import styled, { css } from "styled-components"

import useEditor from "hooks/useEditor"
import useInspector from "hooks/useInspector"

import EntityTypeIcon from "components/EntityTypeIcon"
import EntityPreview from "components/Primitives/EntityPreview"
import Nodes from "components/GameCreator/EditorPane/Entity/Nodes"
import States from "./States"

import { getEntityComponent } from "ygh-entities"

const Outer = styled.div`
  cursor: pointer;
  position: relative;

  width: 100%;
  height: 100%;
  padding: 0.5em 0.5em 1em;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow.medium};

  background-color: #f9f9f9;

  &::before,
  &::after {
    pointer-events: none;

    content: "";

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    border-radius: ${props => props.theme.borderRadius};
  }

  ${props =>
    props.hasPreview &&
    css`
      background-image: radial-gradient(
        ellipse 6em 6em at 100% 0,
        #39f6,
        transparent
      );
    `}

  ${props =>
    props.mayBeDeleted &&
    css`
      &::after {
        opacity: 0.8;

        background-color: ${props => props.theme.color.error};
      }
    `}

  ${props =>
    props.isFocussed &&
    css`
      &::before {
        border: 0.1em solid ${props => props.theme.color.primary};
      }
    `}
`

const Warning = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 1.5em;
  height: 1.5em;
  padding: 0.25em;

  text-align: center;
  line-height: 1.1em;

  clip-path: polygon(
    45% 2%,
    50% 0%,
    55% 2%,
    100% 84%,
    100% 90%,
    96% 94%,
    4% 94%,
    0% 90%,
    0% 84%
  );
  background-color: ${props => props.theme.color.warning};
  color: #fff;

  transform: translate(50%, -50%);

  &::after {
    content: "!";
  }
`

const Name = styled.h2`
  margin: 0 ${props => (props.hasPreview ? 3.5 : 0)}rem 0.25rem 0;

  font-size: 1.25em;
  line-height: 1;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const FeaturedField = styled.p`
  height: 1.25rem;
  margin: 0.5rem 0 -0.5rem;

  font-size: 0.75em;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const PreviewOuter = styled.div`
  position: relative;

  width: 4em;
  height: 4em;
  padding: 0.75em;
  margin: -0.5em -0.5em 1em 0.5em;
  float: right;
`

const Meta = styled.div`
  height: 3em;
`

const StateContainer = styled.div`
  position: absolute;
  left: 2em;
  bottom: 1em;
  right: 2em;
`

const EntityNode = ({ entity }) => {
  const { ACTION_TYPES, upcomingAction } = useEditor()
  const { isOpen, inspectedEntity, inspectEntity } = useInspector()
  const hasPreview = useMemo(
    () =>
      entity &&
      (entity.isItem || entity.isObject) &&
      !!getEntityComponent(
        entity.template ? entity.template.name : entity.name
      ),
    [entity]
  )

  const featuredFieldValue = useMemo(
    () =>
      entity.featuredField
        ? entity.fields.find(field => field.id === entity.featuredField.id)
            .value
        : null,
    [entity]
  )

  const emptyFields = useMemo(
    () => entity.fields.filter(({ value }) => value === "null"),
    [entity]
  )
  // JSON.parse(value) === null

  const mayBeDeleted =
    upcomingAction &&
    upcomingAction.type === ACTION_TYPES.DELETE_NODE &&
    entity.states.every(state =>
      upcomingAction.payload.dependentStates.includes(state.id)
    )

  return (
    <Outer
      hasPreview={hasPreview}
      mayBeDeleted={mayBeDeleted}
      isFocussed={isOpen && inspectedEntity === entity.id}
      onClick={event => {
        event.stopPropagation()
        inspectEntity(entity.id)
      }}
    >
      {emptyFields.length > 0 && <Warning />}
      <Nodes entity={entity} />
      <Meta>
        {hasPreview && (
          <PreviewOuter>
            <EntityPreview
              entity={entity.template}
              maxWidth={2.5}
              maxHeight={2.5}
              rotateObjects
            />
          </PreviewOuter>
        )}
        <Name hasPreview={hasPreview}>
          <EntityTypeIcon {...entity} /> {entity.name}
        </Name>
        {featuredFieldValue && (
          <FeaturedField>{JSON.parse(featuredFieldValue)}</FeaturedField>
        )}
      </Meta>
      <StateContainer>
        <States entity={entity} />
      </StateContainer>
    </Outer>
  )
}

export default EntityNode
