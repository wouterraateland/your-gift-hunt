import React from "react"
import styled from "styled-components"

import StateTag from "./StateTag"
import EntryState from "./EntryState"
import ExitState from "./ExitState"

const Arrow = styled.span`
  display: inline-block;
  width: 1rem;

  text-align: center;
  font-weight: bold;

  color: #f93;
`

const StyledEntryState = styled(EntryState)`
  display: inline-block;
  width: 1em;
  height: 1em;
  margin: 0.25rem 0;
`

const StyledExitState = styled(ExitState)`
  display: inline-block;
  width: 1em;
  height: 1em;
  margin: 0.25rem 0;
`

const Transition = ({ from, to, onStateClick = () => {} }) => (
  <>
    {from ? (
      <StateTag state={from} onClick={() => onStateClick(from.id)} />
    ) : (
      <StyledEntryState />
    )}
    <Arrow>&rarr;</Arrow>
    {to ? (
      <StateTag state={to} onClick={() => onStateClick(to.id)} />
    ) : (
      <StyledExitState />
    )}
  </>
)

export default Transition
