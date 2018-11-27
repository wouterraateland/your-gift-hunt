import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import StoreContext from 'context/Store'

const CodeBackground = styled.form`
  position: relative;

  height: 80vw;
  border-radius: 4vw;

  box-shadow:
    inset 1vw 1vw 2vw 0 rgba(255, 255, 255, .2),
    inset -1vw -1vw 2vw 0 rgba(0, 0, 0, .3);

  background-image: linear-gradient(#263238, #263238 4vw, transparent 4vw, transparent 76vw, #263238 76vw, #263238);
  background-color: #37474f;
  color: #fff;
`

const CodeLabel = styled.label`
  position: absolute;
  left: 10vw; top: 50%;
  right: 10vw;

  padding: 2vw;
  border-radius: 2vw;

  font-size: 15vw;
  font-family: monospace;
  text-align: center;

  box-shadow:
    inset 0 0 8vw rgba(0, 0, 0, .5),
    0.5vw 0.5vw 1vw 0 rgba(255, 255, 255, .2),
    -0.5vw -0.5vw 1vw 0 rgba(0, 0, 0, .3);

  background-color: #263238;
  color: #eceff1;

  transform: translate(0, -50%);
`

const Gray = styled.span`opacity: .5;`

const CodeInput = styled.input`
  opacity: 0;
  position: absolute;
`

const CodeButton = styled.button`
  position: absolute;
  right: 10vw; bottom: 10vw;

  width: 20vw;
  height: 10vw;

  border: none;
  border-radius: 2vw;

  box-shadow:
    inset 0.5vw 0.5vw 1vw 0 rgba(255, 255, 255, .2),
    inset -0.5vw -0.5vw 1vw 0 rgba(0, 0, 0, .3),
    0.5vw 0.5vw 1vw 0 rgba(255, 255, 255, .2),
    -0.5vw -0.5vw 1vw 0 rgba(0, 0, 0, .3);

  background-color: #455a64;
`

const Question = ({ pieceId, length }) => {
  const [value, setValue] = useState('')
  const { write } = useContext(StoreContext)

  function commitCode(event) {
    event.preventDefault()

    write('responses', responses => [
      ...(responses || []).filter(res => res.pieceId !== pieceId),
      { pieceId, response: value }
    ])

    setValue('')
  }

  function handleOnChange(event) {
    const regex = /^[0-9\b]+$/

    if (event.target.value === '' || regex.test(event.target.value)) {
      setValue(event.target.value.slice(0, length))
    }
  }

  return (
    <CodeBackground>
      <CodeLabel>
        <CodeInput
          value={value}
          onChange={handleOnChange}
        />
        {value}<Gray>{'0'.repeat(length - value.length)}</Gray>
      </CodeLabel>

      <CodeButton
        type="submit"
        onClick={commitCode}
      />
    </CodeBackground>
  )
}

export default Question
