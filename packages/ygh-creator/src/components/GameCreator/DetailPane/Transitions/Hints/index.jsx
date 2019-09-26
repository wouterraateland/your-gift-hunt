import React, { useState } from "react"
import styled from "styled-components"

import { ActionButton, Float, ToolTip } from "ygh-ui"
import Icons from "ygh-icons"

import Hint from "./Hint"
import HintForm from "./HintForm"

const HintsContainer = styled.div`
  margin-right: 0.25rem;
`

const Label = styled.strong`
  display: block;
  line-height: 1.5rem;
`

const Placeholder = styled.p`
  margin: 0;
`

const Hints = ({ actionRequirement }) => {
  const { id, hints } = actionRequirement

  const [state, setState] = useState({
    selectedHint: null,
    isNewHint: false,
    isLoading: false,
    error: null
  })

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
        Hints
        <Float.Right>
          <ActionButton size="small" color="primary" onClick={addHint}>
            <Icons.Plus />
            <ToolTip>Add hint</ToolTip>
          </ActionButton>
        </Float.Right>
      </Label>
      {hints.length
        ? hints.map(hint =>
            state.selectedHint === hint.id ? (
              <HintForm
                key={hint.id}
                hint={hint}
                actionRequirementId={id}
                onClose={() => selectHint(null)}
              />
            ) : (
              <Hint
                key={hint.id}
                hint={hint}
                onEditClick={() => selectHint(hint.id)}
              />
            )
          )
        : !state.isNewHint && (
            <Placeholder>
              <em>None</em>
            </Placeholder>
          )}
      {state.isNewHint && (
        <HintForm actionRequirementId={id} onClose={() => selectHint(null)} />
      )}
    </HintsContainer>
  )
}

export default Hints
