import React, { useCallback, useContext, useState } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"
import InspectorContext from "contexts/Inspector"

import { ActionButton, Button } from "your-gift-hunt/ui"
import { Pen } from "your-gift-hunt/icons"

import Hint from "./Hint"
import HintForm from "./HintForm"

const HintsContainer = styled.div`
  padding: 1em;
  margin-bottom: 1em;

  background-color: #0001;
`

const Label = styled.strong`
  display: block;
  margin: 0 0 0.5em;

  font-size: smaller;
`

const Ol = styled.ol`
  padding-left: 1em;
  counter-reset: ol;

  li {
    counter-increment: ol;
    display: block;

    margin-bottom: 0.5em;
  }

  li::before {
    content: counter(ol) ".";

    display: inline-block;
    width: 1em;
    margin-left: -1em;

    opacity: 0.5;
  }
`

const Em = styled.em`
  font-size: smaller;
`

const Hints = ({ id, defaultHints, customHints }) => {
  const [state, setState] = useState({
    selectedHint: null,
    isNewHint: false,
    isLoading: false,
    error: null
  })
  const { nodeId } = useContext(InspectorContext)
  const {
    getNodeById,
    createHint,
    deleteHint,
    connectActionRequirementToEntityInstance,
    disconnectActionRequirementFromEntityInstance
  } = useContext(GameContext)
  const { instance } = getNodeById(nodeId)

  const hasCustomHints = instance.actionRequirementsWithCustomHints.some(
    actionRequirement => actionRequirement.id === id
  )

  const hints = hasCustomHints ? customHints : defaultHints

  const generateCustomHints = useCallback(
    () =>
      hasCustomHints
        ? null
        : Promise.all([
            connectActionRequirementToEntityInstance(instance.id, id),
            ...defaultHints.map(hint => createHint(instance.id, id, hint))
          ]),
    [instance, hasCustomHints, defaultHints]
  )

  const restoreDefaults = async () => {
    setState(state => ({
      ...state,
      isLoading: true,
      error: null,
      selectedHint: null,
      isNewHint: false
    }))

    if (hasCustomHints) {
      try {
        await Promise.all([
          disconnectActionRequirementFromEntityInstance(instance.id, id),
          ...customHints.map(hint => deleteHint(hint.id))
        ])
      } catch (error) {
        setState(state => ({ ...state, error }))
      }
    }

    setState(state => ({ ...state, isLoading: false }))
  }

  const selectHint = hintId => {
    const hint = hints.find(({ id }) => hintId === id)
    setState(state => ({
      ...state,
      isLoading: false,
      error: null,
      selectedHint: hint ? hint.id : null,
      isNewHint: false
    }))
  }

  const addHint = () =>
    setState(state => ({
      ...state,
      selectedHint: null,
      isNewHint: true,
      isLoading: false,
      error: null
    }))

  return (
    <HintsContainer>
      <Label>
        Hints{" "}
        {hasCustomHints ? (
          <Button importance="tertiary" size="small" onClick={restoreDefaults}>
            Restore defaults
          </Button>
        ) : (
          <ActionButton onClick={generateCustomHints}>
            <Pen />
          </ActionButton>
        )}
      </Label>
      {hints.length ? (
        <Ol>
          {hints.map(hint => (
            <li key={hint.id}>
              {state.selectedHint === hint.id ? (
                <HintForm
                  hint={hint}
                  instanceId={instance.id}
                  actionRequirementId={id}
                  onClose={() => selectHint(null)}
                />
              ) : (
                <Hint
                  hint={hint}
                  isCustom={hasCustomHints}
                  onEditClick={() => selectHint(hint.id)}
                />
              )}
            </li>
          ))}
          {state.isNewHint && (
            <li>
              <HintForm
                instanceId={instance.id}
                actionRequirementId={id}
                onClose={() => selectHint(null)}
              />
            </li>
          )}
        </Ol>
      ) : (
        <p>
          <Em>None</Em>
        </p>
      )}
      {hasCustomHints && (
        <Button
          size="small"
          importance="primary"
          color="accent"
          onClick={addHint}
        >
          + Add hint
        </Button>
      )}
    </HintsContainer>
  )
}

export default Hints
