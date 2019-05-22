import React, { useState } from "react"
import styled from "styled-components"

import { Button, VSpace } from "your-gift-hunt/ui"

import Hint from "./Hint"
import HintForm from "./HintForm"

const HintsContainer = styled.div`
  padding: 1em;
  margin-bottom: 1em;
  border-radius: ${props => props.theme.borderRadius};

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

    &:not(:last-child) {
      margin-bottom: 0.5em;
    }
  }

  li::before {
    content: counter(ol) ".";

    display: inline-block;
    width: 1em;
    margin-left: -1em;

    opacity: 0.5;
  }
`

const Em = styled.em``

const Placeholder = styled.p`
  margin: 0;
`

const Hints = ({ id, hints }) => {
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
      <Label>Hints</Label>
      {hints.length ? (
        <Ol>
          {hints.map(hint => (
            <li key={hint.id}>
              {state.selectedHint === hint.id ? (
                <HintForm
                  hint={hint}
                  actionRequirementId={id}
                  onClose={() => selectHint(null)}
                />
              ) : (
                <Hint hint={hint} onEditClick={() => selectHint(hint.id)} />
              )}
            </li>
          ))}
          {state.isNewHint && (
            <li>
              <HintForm
                actionRequirementId={id}
                onClose={() => selectHint(null)}
              />
            </li>
          )}
        </Ol>
      ) : state.isNewHint ? (
        <Ol>
          <li>
            <HintForm
              actionRequirementId={id}
              onClose={() => selectHint(null)}
            />
          </li>
        </Ol>
      ) : (
        <Placeholder>
          <Em>None</Em>
        </Placeholder>
      )}
      <VSpace />
      <Button
        size="small"
        importance="primary"
        color="primary"
        onClick={addHint}
      >
        + Add hint
      </Button>
    </HintsContainer>
  )
}

export default Hints
