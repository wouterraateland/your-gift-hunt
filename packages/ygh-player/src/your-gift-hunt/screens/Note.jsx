import React from 'react'
import styled, { css } from 'styled-components'

import Screen from './Screen'

export const Note = styled.div`
  position: relative;
  width: 30em;
  max-width: calc(100% - 4em);
  padding: 2em;
  margin: 2em auto;

  background-color: #f5f0d7;

  transform: translate(0, ${props => props.isVisible ? 0 : 100}vh);

  transition: transform .2s .2s ease-out;

  ${props => props.isNew && css`
    &::after {
      content: 'New';

      position: absolute;
      left: 2em; top: 1.5em;

      text-transform: uppercase;
      font-weight: bold;

      color: #f129;
    }
  `}

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
    onReadNote && onReadNote(entity.id)
  }

  return (
    <Screen isVisible={isVisible} onClick={exit}>
      <Note
        isVisible={isVisible}
        onClick={exit}
        isNew={entity.state === 'unread'}
      >
        <p>{entity.fieldValues.text}</p>
      </Note>
    </Screen>
  )
}

export default NoteScreen
