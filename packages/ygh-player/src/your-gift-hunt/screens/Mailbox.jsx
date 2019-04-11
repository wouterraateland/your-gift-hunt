import React, { useCallback, useState } from "react"
import styled, { keyframes } from "styled-components"
import _ from "utils"

import { Float } from "your-gift-hunt/ui"
import Screen from "./Screen"
import { Note } from "./Note"

const Mailbox = styled.div`
  position: relative;
  width: 20em;
  height: 18em;

  border-radius: 12em 12em 0.5em 0.5em;
  box-shadow: inset 0.2em 0.2em 0.4em -0.1em #fff8,
    inset -0.2em -0.2em 0.4em -0.1em #0004, inset 0em 0em 0em 0.5em #fa300c;

  background-color: #7c2617;

  &::before,
  &::after {
    content: "";

    position: absolute;
  }

  &::before {
    left: 0.5em;
    top: 0.5em;
    right: 0.5em;
    bottom: 0.5em;

    border-radius: 12em 12em 0.5em 0.5em;
    box-shadow: 0.2em 0.2em 0.4em -0.1em #fff8, -0.2em -0.2em 0.4em -0.1em #0004;
  }

  &::after {
    left: 0;
    top: calc(100% - 0.5em);
    right: 0;

    height: 2em;
    border-radius: 0.5em;

    box-shadow: inset 0.2em 0.2em 0.4em -0.1em #fff8,
      inset -0.2em -0.2em 0.4em -0.1em #0004;

    background-color: #fa300c;
    background-image: radial-gradient(
        ellipse 2% 40% at 30% 45%,
        #fff9,
        transparent
      ),
      linear-gradient(90deg, #0006, #0002, #0000 40%, #0002, #0006);
  }
`

const Pole = styled.div`
  position: absolute;
  left: -2em;
  top: 10em;

  width: 2em;
  height: 15em;
  border-radius: 1em;
  border-bottom-left-radius: 0.5em 100%;

  box-shadow: inset 0.4em 0.2em 0.4em -0.1em #0003,
    inset -0.6em -0.2em 1em -0.1em #0008;

  background-color: #b38d5c;

  &::before,
  &::after {
    content: "";

    position: absolute;
  }

  &::before {
    top: 3em;
    right: 0;

    width: 2.2em;
    height: 3em;
    border-radius: 0.2em 0 0 0.2em;

    box-shadow: inset -0.4em 0 0.4em -0.2em #0004,
      inset 0.8em 0.1em 0.8em -0.2em #fff9;

    background-color: #999;
  }

  &::after {
    left: 4em;
    top: 6em;

    width: 2em;
    height: 8em;

    border-bottom-left-radius: 2em 1.4em;
    border-top-left-radius: 2em;
    border-top-right-radius: 0.5em 60%;

    box-shadow: inset 0.4em 0.2em 0.4em -0.1em #0003,
      inset -0.6em -0.2em 1em -0.1em #0008;

    background-color: #b38d5c;

    transform: rotate(65deg);
  }
`

const flagWave = keyframes`
  from { transform: scale(-.4, 1); color: #2c1198; }
  to { transform: scale(.4, 1); color: #2352e0; }
`

const Flag = styled.div`
  position: absolute;
  right: -0.5em;
  bottom: 3em;

  width: 0.5em;
  height: 15em;
  border-radius: 0.25em;

  background-color: #1427a2;

  &::before,
  &::after {
    content: "";
    position: absolute;
  }

  &::before {
    left: 0;
    bottom: 2em;

    width: 0.7em;
    height: 2em;

    border-radius: 0 0.2em 0.2em 0;
    box-shadow: inset -0.2em -0.2em 0.4em -0.1em #0004;

    background-color: #999;
  }

  &::after {
    left: 0.25em;
    top: 0.5em;

    border: 2em solid;
    border-right-color: transparent;

    transform-origin: left;

    animation: ${flagWave} 2s ease-in-out infinite alternate;
  }
`

const Letter = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.5em;

  width: 10em;
  height: 0.4em;
  margin: auto;

  border-radius: 100% / 50%;

  box-shadow: inset 0 -0.1em 0.2em -0.05em #0004, 0.2em 0.2em 0.4em -0.1em #0004;

  background: #fff;

  &:nth-child(1) {
    transform: translate(0, 0) rotate(0deg);
  }
  &:nth-child(2) {
    transform: translate(-4em, -0.4em) rotate(-6deg);
  }
  &:nth-child(3) {
    transform: translate(3em, -0.9em) rotate(11deg);
  }
  &:nth-child(4) {
    transform: translate(2.2em, -1.5em) rotate(9deg);
  }
  &:nth-child(5) {
    transform: translate(-2.9em, -2.5em) rotate(-26deg);
  }
`

const MailView = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`

const MailNavigation = styled.div`
  padding: 2em;

  color: #fff;

  & span {
    cursor: pointer;
  }
`

const MailboxScreen = ({ isVisible, onReadNote, entities, close }) => {
  const [entityIndex, setEntityIndex] = useState(-1)

  const readNote = useCallback(() => {
    if (entityIndex !== -1) {
      onReadNote(entities[entityIndex].id)
    }
  }, [entities, entityIndex, onReadNote])

  const goToNote = useCallback(
    i => {
      readNote()
      setEntityIndex(i)
    },
    [entities, entityIndex, onReadNote]
  )

  const exit = useCallback(() => {
    readNote()
    close()
  }, [entities, entityIndex, onReadNote])

  const entity = entityIndex === -1 ? null : entities[entityIndex]

  return (
    <Screen isVisible={isVisible} onClick={exit} centerContent>
      <Mailbox
        isVisible={isVisible}
        onClick={() => {
          const firstUnreadIndex = entities.findIndex(_.hasState("unread"))
          setEntityIndex(
            firstUnreadIndex === -1 && entities.length ? 0 : firstUnreadIndex
          )
        }}
      >
        {entities.slice(0, 5).map((_, i) => (
          <Letter key={i} />
        ))}
        <Pole />
        <Flag />
      </Mailbox>
      {entity !== null && (
        <MailView>
          <MailNavigation>
            <Float.Left>
              <span onClick={() => goToNote(entityIndex - 1)}>Previous</span>
            </Float.Left>
            {entityIndex < entities.length - 1 && (
              <Float.Right>
                <span onClick={() => goToNote(entityIndex + 1)}>Next</span>
              </Float.Right>
            )}
          </MailNavigation>
          <Note isVisible entity={entity} isNew={_.hasState("unread")(entity)}>
            <p>{_.getFieldValue("Text")(entity)}</p>
          </Note>
        </MailView>
      )}
    </Screen>
  )
}

export default MailboxScreen