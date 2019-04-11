import React, { forwardRef, useCallback, useState } from "react"
import styled from "styled-components"
import _ from "utils"

import Screen from "./Screen"
import Safe from "./Safe"

const CodeLabel = styled.label`
  position: absolute;
  left: 1em;
  top: 2em;
  right: 1em;

  padding: 0.25em;
  border-radius: 0.25em;

  font-size: 4em;
  font-family: monospace;
  text-align: center;

  box-shadow: inset 0 0 2em #0009, 0.125em 0.125em 0.25em 0 #fff4,
    -0.125em -0.125em 0.25em 0 #0004;

  background-color: #263238;
  color: #eceff1;

  transform: translate(0, -50%);
`

const Gray = styled.span`
  opacity: 0.5;
`

const CodeInput = styled.input`
  opacity: 0;
  position: absolute;
`

const SafeButton = styled.button`
  position: absolute;
  right: 3em;
  bottom: 2.5em;

  width: 5em;
  height: 2.5em;

  border: none;
  border-radius: 0.5em;

  box-shadow: inset 0.125em 0.125em 0.25em 0 #fff4,
    inset -0.125em -0.125em 0.25em 0 #0004, 0.125em 0.125em 0.25em 0 #fff4,
    -0.125em -0.125em 0.25em 0 #0004;

  background-color: #455a64;
`

const Code = styled.span`
  color: ${({ correct, wrong }) =>
    correct ? "#0f0" : wrong ? "#f00" : "#fff"};
  text-shadow: 0 0 0.4em;
`

const SafeWithCodeScreen = forwardRef(
  ({ isVisible, entity, dispatchInputAction, close }, ref) => {
    const [code, setCode] = useState("")

    const handleOnChange = useCallback(event => {
      const regex = /^[0-9\b]+$/

      if (event.target.value === "" || regex.test(event.target.value)) {
        setCode(event.target.value.slice(0, 4))
      }
    }, [])

    const handleOnSubmit = useCallback(
      event => {
        event.preventDefault()
        dispatchInputAction("code", code)
      },
      [code, dispatchInputAction]
    )

    const isUnlocked = _.hasState("unlocked")(entity)
    const codeInput = _.getInputValue("code")(entity)
    const displayedCode = isUnlocked ? codeInput : code

    return (
      <Screen isVisible={isVisible} onClick={close} centerContent>
        <Safe isVisible={isVisible} ref={ref}>
          <form onSubmit={handleOnSubmit}>
            <CodeLabel>
              <CodeInput value={code} onChange={handleOnChange} />
              <Code
                correct={isUnlocked}
                wrong={!isUnlocked && code === codeInput}
              >
                {displayedCode}
              </Code>
              <Gray>{"0".repeat(4 - displayedCode.length)}</Gray>
            </CodeLabel>
            <SafeButton type="submit" />
          </form>
        </Safe>
      </Screen>
    )
  }
)

export default SafeWithCodeScreen
