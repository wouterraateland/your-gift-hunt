import React, { useRef, useState, useEffect } from "react"
import styled from "styled-components"

import SingleInput from "./SingleInput"

const MultiInputContainer = styled.span`
  display: inline-block;
  width: 15em;
  max-width: 100%;
  margin-bottom: -0.25em;
  margin-right: -0.25em;
`

const InputValue = styled.span`
  display: inline-block;
  padding: 0.25em;
  margin: 0 0.25em 0.25em 0;

  word-break: break-word;

  background: ${props => props.theme.color.accent};
`

const Close = styled.strong`
  cursor: pointer;
`

const setSize = el => {
  if (el) {
    el.style.width = "0"
    const offset = el.offsetWidth
    el.style.width = `${Math.max(offset, el.scrollWidth - el.clientWidth)}px`
  }
}

const MultiInput = ({ value, onChange }) => {
  const input = useRef(null)
  const [nextValue, setNextValue] = useState("")

  useEffect(
    () => {
      setSize(input.current)
    },
    [nextValue]
  )

  function updateNextValue(event) {
    setNextValue(event.target.value)
  }

  function removeValue(i) {
    setValue([...value.slice(0, i), ...value.slice(i + 1)])
  }

  function setValue(value) {
    onChange({ target: { value } })
  }

  function handleOnKeyUp(event) {
    if (["Tab", "Enter"].includes(event.key) && nextValue !== "") {
      setValue([...(value || []), nextValue])
      setNextValue("")
    }
  }

  return (
    <MultiInputContainer>
      {(value || []).map((v, i) => (
        <InputValue key={i}>
          {v} <Close onClick={() => removeValue(i)}>&times;</Close>
        </InputValue>
      ))}
      <SingleInput
        ref={input}
        value={nextValue}
        onChange={updateNextValue}
        onKeyUp={handleOnKeyUp}
        isSelect={false}
      />
    </MultiInputContainer>
  )
}

export default MultiInput
