import React, { useState } from 'react'
import styled from 'styled-components'

const StyledEntry = styled.div`
  cursor: pointer;

  position: relative;

  &::after {
    content: '';

    position: absolute;
    right: 0; top: .5em;

    width: 1em;
    height: 1em;

    border-right: .1em solid;
    border-bottom: .1em solid;

    transition: transform .2s ease-out;

    transform-origin: 65% 65%;
    transform: rotate(${props => props.expanded ? -135 : 45}deg);
  }
`

const Entry = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false)

  function toggleExpanded() {
    setExpanded(expanded => !expanded)
  }

  return (
    <StyledEntry expanded={expanded} onClick={toggleExpanded}>
      <h2>{question}</h2>
      {expanded && <p>{answer}</p>}
    </StyledEntry>
  )
}

export default ({ questions }) => questions
  .map((entry, i) =>
    <Entry
      key={i}
      {...entry}
    />
  )
