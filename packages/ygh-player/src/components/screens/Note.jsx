import React from 'react'
import styled from 'styled-components'

import Screen from './Screen'

const Note = styled.div`
  width: 30em;
  min-height: 45em;
  max-width: calc(100% - 4em);
  padding: 2em;
  margin: 2em auto;

  background-color: #f5f0d7;

  transform: translate(0, ${props => props.isVisible ? 0 : 100}vh);

  transition: transform .2s .2s ease-out;

  p {
    font-size: 1.5em;
    line-height: 1.58;
    word-wrap: break-word;
  }
`

const NoteScreen = ({
  isVisible,
  entity,
  onReadNote,
  close
}) => {
  const exit = () => {
    close && close()
    onReadNote && onReadNote()
  }

  return (
    <Screen isVisible={isVisible} onClick={exit}>
      <Note isVisible={isVisible} onClick={exit}>
        <p>{entity.fieldValues.text}</p>
      </Note>
    </Screen>
  )
}

export default NoteScreen
