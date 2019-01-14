import React, { useState } from 'react'
import styled from 'styled-components'

import Screen from './Screen'
import Safe from './Safe'

const CodeLabel = styled.label`
  position: absolute;
  left: 1em; top: 2em;
  right: 1em;

  padding: .25em;
  border-radius: .25em;

  font-size: 4em;
  font-family: monospace;
  text-align: center;

  box-shadow:
    inset 0 0 2em #0009,
    0.125em 0.125em .25em 0 #fff4,
    -0.125em -0.125em .25em 0 #0004;

  background-color: #263238;
  color: #eceff1;

  transform: translate(0, -50%);
`

const Gray = styled.span`
  opacity: .5;
`

const CodeInput = styled.input`
  opacity: 0;
  position: absolute;
`

const SafeButton = styled.button`
  position: absolute;
  right: 3em; bottom: 2.5em;

  width: 5em;
  height: 2.5em;

  border: none;
  border-radius: .5em;

  box-shadow:
    inset .125em .125em .25em 0 #fff4,
    inset -.125em -.125em .25em 0 #0004,
    .125em .125em .25em 0 #fff4,
    -.125em -.125em .25em 0 #0004;

  background-color: #455a64;
`

const Code = styled.span`
  color: ${({ correct, wrong }) => correct
    ? '#0f0' : (wrong ? '#f00' : '#fff')};
  text-shadow: 0 0 .4em;
`

const SafeWithCodeScreen = ({
  isVisible,
  entity,
  onSubmitCode,
  error=null,
}) => {
  const [code, setCode] = useState('')

  function handleOnChange(event) {
    const regex = /^[0-9\b]+$/

    if (event.target.value === '' || regex.test(event.target.value)) {
      setCode(event.target.value.slice(0, 4))
    }
  }

  function handleOnSubmit(event) {
    event.preventDefault()
    onSubmitCode && onSubmitCode(code)
  }

  return (
    <Screen isVisible={isVisible} centerContent>
      <Safe isVisible={isVisible}>
        <form onSubmit={handleOnSubmit}>
          <CodeLabel>
            <CodeInput
              value={code}
              onChange={handleOnChange}
            />
            <Code
              correct={entity.state === 'unlocked'}
              wrong={error !== null && code === entity.inputValues.code}
            >
              {entity.state === 'unlocked'
                ? entity.inputValues.code : code}
            </Code>
            <Gray>{'0'.repeat(4 - (entity.state === 'unlocked'
                ? entity.inputValues.code : code).length)}</Gray>
          </CodeLabel>
          <SafeButton type="submit" />
        </form>
      </Safe>
    </Screen>
  )
}

export default SafeWithCodeScreen
