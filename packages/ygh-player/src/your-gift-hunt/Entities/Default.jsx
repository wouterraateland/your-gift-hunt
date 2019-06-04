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

const Name = styled.span``

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
      {label}:{" "}
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
      <Name>
        {name}
        {state.name ? ` <${state.name}>` : null}
      </Name>
      {otherProps.isReachable && (
        <ToolTip>
          <strong>
            {name}&lt;{state.name}&gt; #{id}
          </strong>
          <br />
          <strong>Inputs:</strong>
          {inputs.length ? (
            inputs.map(({ key, value, isEnabled }) => (
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
            ))
          ) : (
            <>
              {" "}
              None
              <br />
            </>
          )}
          <strong>Fields:</strong>
          {fields.length ? (
            <>
              <br />
              {fields.map(({ id, name, value }) => (
                <li key={id}>
                  {name}: {value}
                </li>
              ))}
            </>
          ) : (
            <>
              {" "}
              None
              <br />
            </>
          )}
          <strong>InformationSlots:</strong>
          {informationSlots.length ? (
            <>
              <br />
              {informationSlots.map(({ id, name, value }) => (
                <li key={id}>
                  {name}: {value}
                </li>
              ))}
            </>
          ) : (
            <>
              {" "}
              None
              <br />
            </>
          )}
          <strong>useDestinations:</strong>
          {useDestinations.length ? (
            <>
              <br />
              {useDestinations.map(({ id }) => (
                <li key={id}>{id}</li>
              ))}
            </>
          ) : (
            <>
              {" "}
              None
              <br />
            </>
          )}
          <strong>useSources:</strong>
          {useSources.length ? (
            <>
              <br />
              {useSources.map(({ id }) => (
                <li key={id}>{id}</li>
              ))}
            </>
          ) : (
            " None"
          )}
        </ToolTip>
      )}
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
