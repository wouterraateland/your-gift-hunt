import React, { useCallback } from "react"
import styled, { css } from "styled-components"

import useEditor from "hooks/useEditor"
import useInspector from "hooks/useInspector"

const Card = styled.div`
  cursor: pointer;

  position: relative;

  padding: 0.5rem;
  margin: 2rem 0 0;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow.medium};

  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75em;
  line-height: 1rem;
  white-space: nowrap;

  background-color: #fff;

  &::before,
  &::after {
    pointer-events: none;
    content: "";

    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    border-radius: ${props => props.theme.borderRadius};
  }

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
        border: 0.1rem solid ${props => props.theme.color.primary};
      }
    `}
`

const StateCard = ({ state }) => {
  const { upcomingAction, ACTION_TYPES } = useEditor()
  const { isOpen, inspectState, inspectedState } = useInspector()

  const mayBeDeleted =
    upcomingAction &&
    upcomingAction.type === ACTION_TYPES.DELETE_NODE &&
    upcomingAction.payload.dependentStates.includes(state.id)

  const onClick = useCallback(
    event => {
      event.stopPropagation()
      inspectState(state.id)
    },
    [state.id]
  )

  return (
    <Card
      onClick={onClick}
      mayBeDeleted={mayBeDeleted}
      isFocussed={isOpen && inspectedState === state.id}
    >
      {state.name || "Default"}
    </Card>
  )
}

export default StateCard
