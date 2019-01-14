import React, { useRef, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import Screen from './Screen'

const Computer = styled.div`
  position: relative;

  width: 24em;
  height: 13.5em;
  padding: 1em;
  border: .5em solid #eee;
  border-width: 1em .5em 2em .5em;
  border-radius: .5em;

  box-shadow: .4em .4em 2.4em -.2em #0004;

  font-family: monospace;

  background: ${props => props.isVisible ? '#030739' : '#111'};
  color: #fff;

  transition: background .5s .4s ease-out;

  &::before,
  &::after {
    content: '';

    position: absolute;
    left: 50%; top: 100%;
    z-index: -1;
  }

  &::before {
    width: 6em;
    height: 4em;
    border-radius: 1em 1em .25em .25em / 3.5em 3.5em .25em .25em;
    box-shadow: .4em .4em 2.4em -.2em #0004;

    background-image: linear-gradient(
      #ccc, #eee 3.25em, #ccc 3.5em, #eee 3.75em, #aaa 4em
    );

    transform: translate(-50%, 1.5em);
  }

  &::after {
    width: 3em;
    height: 3em;
    border-radius: 100%;

    box-shadow: inset .4em .4em 2.4em -.2em #0004;

    transform: translate(-50%, 1em);
  }
`

const AnswerInput = styled.input`
  opacity: 0;
  position: absolute;
`

const blink = keyframes`
  from { color: #fff0; }
  50% { color: #fff; }
`

const Cursor = styled.span`
  display: inline-block;
  height: 1em;
  border-bottom: .1em solid;

  color: #fff0;

  input:focus ~ & {
    width: 1ch;
    animation: ${blink} 1s infinite step-end;
  }
`

const Question = styled.span`color: #ff0;`
const AnswerMarker = styled.span`color: #0ff;`
const SuccessMarker = styled.span`color: #0f0;`
const ErrorMarker = styled.span`color: #f00;`

const ComputerScreen = ({
  isVisible,
  close,
  entities,
  onSubmitAnswer,
  error=null
}) => {
  const input = useRef(null)

  const entity = entities[0]
  const question = entity.fieldValues.question

  const [display, setDisplay] = useState('')
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    input.current && input.current.focus()
  }, [])

  useEffect(() => {
    setDisplay('')
    const i = setInterval(() => {
      setDisplay(display => question.substr(0, display.length + 2))
    }, 100)
    return () => {
      clearInterval(i)
    }
  }, [isVisible, entities])

  function handleOnSubmit(event) {
    event.preventDefault()

    onSubmitAnswer && onSubmitAnswer(answer)
  }

  return (
    <Screen isVisible={isVisible} onClick={close} centerContent>
      <Computer isVisible={isVisible}>
        <form onSubmit={handleOnSubmit}>
          <label>
            {entity.state === 'unanswered' && <AnswerInput
              ref={input}
              onChange={event => setAnswer(event.target.value)}
              value={answer}
            />}
            <Question>{display}</Question>
            <br /><br />
            {display.length === question.length && (
              <>
                <AnswerMarker>&gt;</AnswerMarker>
                {' '}
                {entity.state === 'answered'
                  ? entity.inputValues.answer
                  : answer}
                <Cursor />
                {' '}
                {entity.state === 'answered' && (
                  <SuccessMarker>✔</SuccessMarker>
                )}
                {entity.state === 'unanswered' && error !== null &&
                  entity.inputValues.answer === answer && (
                  <ErrorMarker>✘</ErrorMarker>
                )}
              </>
            )}
          </label>
        </form>
      </Computer>
    </Screen>
  )
}

export default ComputerScreen
