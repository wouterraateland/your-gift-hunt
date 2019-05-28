import React, { forwardRef, useEffect, useState } from "react"
import styled from "styled-components"
import Entity from "./Entity"
import { ToolTip } from "your-gift-hunt/ui"

const DefaultEntityContainer = styled(Entity)`
  border: 1px solid #f00;
  background-color: #fff;
  color: #000;
`

const Form = styled.form`
  & input,
  & button {
    background: #fff;
  }
`

const InputForm = ({ value, label, isEnabled, onSubmit }) => {
  const [state, setState] = useState(value)

  useEffect(() => {
    if (!isEnabled) {
      setState(value)
    }
  }, [isEnabled])

  return (
    <Form
      disabled={isEnabled}
      onSubmit={event => {
        event.preventDefault()
        onSubmit(state)
      }}
    >
      {label}:
      <input
        value={state === undefined || state === null ? "" : state}
        onChange={event => setState(event.target.value)}
      />
      <button type="submit">&rarr;</button>
    </Form>
  )
}

const DefaultEntity = forwardRef(
  (
    {
      children,
      id,
      name,
      state,
      fields,
      inputs,
      informationSlots,
      useDestinations,
      useSources,
      dispatchInputAction,
      ...otherProps
    },
    ref
  ) => (
    <DefaultEntityContainer {...otherProps} ref={ref} noVisual>
      <span>
        {name}&lt;{state.name}&gt;
      </span>
      <ToolTip>
        <strong>
          {name}&lt;{state.name}&gt; #{id}
        </strong>
        <br />
        <strong>Inputs:</strong>
        {inputs.map(({ key, value, isEnabled }) => (
          <InputForm
            key={key}
            label={key}
            value={value}
            isEnabled={isEnabled}
            onSubmit={value =>
              dispatchInputAction(
                state,
                key,
                isNaN(parseInt(value, 10)) ? value : parseInt(value, 10)
              )
            }
          />
        ))}
        <strong>Fields:</strong>
        <br />
        {JSON.stringify(fields)}
        <br />
        <strong>InformationSlots:</strong>
        <br />
        {JSON.stringify(informationSlots)}
        <br />
        <strong>useDestinations:</strong>
        <br />
        {JSON.stringify(useDestinations)}
        <br />
        <strong>useSources:</strong>
        <br />
        {JSON.stringify(useSources)}
      </ToolTip>
      {children}
    </DefaultEntityContainer>
  )
)
DefaultEntity.defaultProps = {
  ...Entity.defaultProps,
  width: 4,
  height: 4
}

export default DefaultEntity
