import React, { useContext } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"
import InspectorContext from "contexts/Inspector"

import { ActionButton, Button } from "your-gift-hunt/ui"
import { Bin, Pen } from "your-gift-hunt/icons"

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
  margin-bottom: 1em;
  padding-left: 1em;
`

const Em = styled.em`
  opacity: 0.5;
`

const Hints = ({ id, defaultHints, customHints }) => {
  const { nodeId } = useContext(InspectorContext)
  const {
    getNodeById,
    createHint,
    updateHint,
    deleteHint,
    connectActionRequirementToEntityInstance,
    disconnectActionRequirementFromEntityInstance
  } = useContext(GameContext)
  const { instance } = getNodeById(nodeId)

  const hasCustomHints = instance.actionRequirementsWithCustomHints.some(
    actionRequirement => actionRequirement.id === id
  )

  const hints = hasCustomHints ? customHints : defaultHints

  const generateCustomHints = () =>
    hasCustomHints
      ? null
      : Promise.all([
          connectActionRequirementToEntityInstance(instance.id, id),
          ...defaultHints.map(hint => createHint(instance.id, id, hint))
        ])

  const restoreDefaults = () =>
    hasCustomHints
      ? Promise.all([
          disconnectActionRequirementFromEntityInstance(instance.id, id),
          ...customHints.map(hint => deleteHint(hint.id))
        ])
      : null

  const addHint = async () => {}

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
          {hints.map(({ id, text, delay }) => (
            <li key={id}>
              {text} <Em>After {delay}s</Em>{" "}
              {hasCustomHints && (
                <>
                  <ActionButton color="error" onClick={() => deleteHint(id)}>
                    <Bin />
                  </ActionButton>
                  <ActionButton onClick={() => updateHint(id, { text, delay })}>
                    <Pen />
                  </ActionButton>
                </>
              )}
            </li>
          ))}
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
