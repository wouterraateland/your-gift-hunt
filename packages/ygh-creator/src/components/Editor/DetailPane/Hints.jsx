import React, { useContext } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"
import InspectorContext from "contexts/Inspector"

import { ActionButton, Button } from "your-gift-hunt/ui"
import { Bin, Pen } from "your-gift-hunt/icons"

const HintsContainer = styled.div`
  padding: 1em;

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
    deleteHint,
    connectActionRequirementToEntityInstance,
    disconnectActionRequirementFromEntityInstance
  } = useContext(GameContext)
  const { instance } = getNodeById(nodeId)

  const hasCustomHints = instance.actionRequirementsWithCustomHints.some(
    actionRequirement => actionRequirement.id === id
  )

  const hints = hasCustomHints ? customHints : defaultHints

  const makeEditable = () =>
    hasCustomHints
      ? null
      : Promise.all([
          connectActionRequirementToEntityInstance(instance.id, id),
          ...defaultHints.map(hint => createHint(instance.id, id, hint))
        ])

  const restoreDefaults = () =>
    Promise.all([
      disconnectActionRequirementFromEntityInstance(instance.id, id),
      ...customHints.map(hint => deleteHint(hint.id))
    ])

  const addHint = async () => {
    await makeEditable()
  }

  const deleteCustomHint = async id => {
    await makeEditable()
    await deleteHint(id)
  }

  const editCustomHint = async id => {
    await makeEditable()
    console.log(id)
  }

  return (
    <HintsContainer>
      <Label>
        Hints{" "}
        {hasCustomHints && (
          <Button importance="tertiary" size="small" onClick={restoreDefaults}>
            Restore defaults
          </Button>
        )}
      </Label>
      {hints.length ? (
        <Ol>
          {hints.map(({ id, text, delay }) => (
            <li key={id}>
              {text} <Em>After {delay}s</Em>{" "}
              <ActionButton color="error" onClick={() => deleteCustomHint(id)}>
                <Bin />
              </ActionButton>
              <ActionButton onClick={() => editCustomHint(id)}>
                <Pen />
              </ActionButton>
            </li>
          ))}
        </Ol>
      ) : (
        <p>
          <Em>None</Em>
        </p>
      )}
      <Button
        size="small"
        importance="primary"
        color="accent"
        onClick={addHint}
      >
        + Add hint
      </Button>
    </HintsContainer>
  )
}

export default Hints
