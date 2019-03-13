import React from "react"
import styled, { css } from "styled-components"

import EntityTypeIcon from "../EntityTypeIcon"
import StateTag from "../StateTag"
import EntityInstancePreview from "../EntityInstancePreview"

const Card = styled.div`
  cursor: pointer;

  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 12em;
  height: 6em;
  padding: 0.5em;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow.medium};

  background-color: #fff;
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
        content: "";

        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        opacity: 0.8;

        border-radius: ${props => props.theme.borderRadius};

        background-color: ${props => props.theme.color.error};
      }
    `}

  ${props =>
    props.isFocussed &&
    css`
      &::before {
        content: "";

        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        border: 0.1em solid #39f;
        border-radius: ${props => props.theme.borderRadius};
      }
    `}
`

const InstanceName = styled.h2`
  margin: 0 ${props => (props.hasPreview ? 3.5 : 0)}rem 0.25rem 0;
  font-size: 1.25em;
  line-height: 1;
`

const FeaturedFieldValue = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;

  margin: 0.5em 3rem 0 0;
  max-height: 3em;

  font-size: 0.8em;
`

const PreviewContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 4em;
  height: 4em;
`

const InstanceCard = ({
  instance,
  state,
  position,
  onClick,
  mayBeDeleted,
  isFocussed
}) => {
  const { entity, fields } = instance

  const hasPreview = entity && (entity.isItem || entity.isObject)

  const featuredFieldValue = entity.featuredField
    ? fields.find(({ field }) => field.id === entity.featuredField.id).value
    : null

  return (
    <Card
      hasPreview={hasPreview}
      onClick={onClick}
      style={position}
      mayBeDeleted={mayBeDeleted}
      isFocussed={isFocussed}
    >
      <InstanceName hasPreview={hasPreview}>
        <EntityTypeIcon {...entity} /> {instance.name}
      </InstanceName>
      {state !== "default" && <StateTag name={state} />}
      {featuredFieldValue && (
        <FeaturedFieldValue>
          {JSON.parse(featuredFieldValue)}
        </FeaturedFieldValue>
      )}
      <PreviewContainer>
        <EntityInstancePreview
          entity={entity}
          state={state}
          maxWidth={2.5}
          maxHeight={2.5}
          rotateObjects
        />
      </PreviewContainer>
    </Card>
  )
}

export default InstanceCard
