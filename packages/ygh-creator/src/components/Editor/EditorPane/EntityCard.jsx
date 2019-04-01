import React from "react"
import styled, { css } from "styled-components"

import EntityTypeIcon from "../EntityTypeIcon"
import StateTag from "../StateTag"
import EntityPreview from "../EntityPreview"

const Card = styled.div`
  cursor: pointer;

  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 12em;
  height: 6em;
  padding: 0.5em 0.5em 0;
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
    props.hasWarning &&
    !props.hasError &&
    !props.mayBeDeleted &&
    css`
      &::after {
        content: "!";

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
      }
    `}

  ${props =>
    props.hasError &&
    !props.mayBeDeleted &&
    css`
      &::after {
        content: "!";

        position: absolute;
        top: 0;
        right: 0;

        width: 1.5em;
        height: 1.5em;
        padding: 0.25em;
        border-radius: 100%;

        text-align: center;
        line-height: 1em;

        background-color: ${props => props.theme.color.error};
        color: #fff;

        transform: translate(50%, -50%);
      }
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

const Name = styled.h2`
  margin: 0 ${props => (props.hasPreview ? 3.5 : 0)}rem 0.25rem 0;
  font-size: 1.25em;
  line-height: 1;
`

const FeaturedField = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;

  margin: 0.5em 0 0;
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

const EntityCard = ({
  entity,
  state,
  position,
  onClick,
  mayBeDeleted,
  isFocussed
}) => {
  const hasPreview = entity && (entity.isItem || entity.isObject)

  const featuredFieldValue = entity.featuredField
    ? entity.fields.find(field => field.id === entity.featuredField.id).value
    : null

  // const unmatchedFields = entity.fields.filter(
  //   ({ id, isSecret, informationSlots }) =>
  //     isSecret &&
  //     informationSlots.length === 0 &&
  //     state.outgoingTransitions.some(({ requiredActions }) =>
  //       requiredActions.some(({ payload: { requiredInputs } }) =>
  //         requiredInputs.some(({ field }) => field && field.id === id)
  //       )
  //     )
  // )

  const emptyFields = entity.fields.filter(({ value }) => value === "null") // JSON.parse(value) === null

  return (
    <Card
      hasPreview={hasPreview}
      onClick={onClick}
      style={position}
      mayBeDeleted={mayBeDeleted}
      hasWarning={emptyFields.length > 0}
      hasError={false} // unmatchedFields.length > 0
      isFocussed={isFocussed}
    >
      <Name hasPreview={hasPreview}>
        <EntityTypeIcon {...entity} /> {entity.name}
      </Name>
      {state.name !== null && <StateTag name={state.name} />}
      {featuredFieldValue && (
        <FeaturedField>{JSON.parse(featuredFieldValue)}</FeaturedField>
      )}
      <PreviewContainer>
        <EntityPreview
          entity={entity}
          state={state.name}
          maxWidth={2.5}
          maxHeight={2.5}
          rotateObjects
        />
      </PreviewContainer>
    </Card>
  )
}

export default EntityCard
