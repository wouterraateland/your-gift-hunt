import React, { useCallback } from "react"
import styled, { css } from "styled-components"
import _ from "utils"

import Screen from "./Screen"

export const Note = styled.div`
  position: relative;
  width: 30em;
  max-width: calc(100% - 4em);
  padding: 2em;
  margin: 2em auto;

  background-color: #f5f0d7;

  transform: translate(0, ${props => (props.isVisible ? 0 : 100)}vh);

  transition: transform 0.2s 0.2s ease-out;

  ${props =>
    props.isNew &&
    css`
      &::after {
        content: "New";

        position: absolute;
        left: 2em;
        top: 1.5em;

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

const NoteScreen = ({ isVisible, entity, onReadNote, close }) => {
  const isNew = _.hasState("unread")(entity)
  const text = _.getFieldValue("Text")(entity)

  const exit = useCallback(() => {
    close && close()
    onReadNote && onReadNote(entity.id)
  }, [entity.id, close, onReadNote])

  return (
    <Screen isVisible={isVisible} onClick={exit}>
      <Note isVisible={isVisible} onClick={exit} isNew={isNew}>
        <p>{text}</p>
      </Note>
    </Screen>
  )
}

export default NoteScreen
