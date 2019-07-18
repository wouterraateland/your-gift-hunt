import React, { forwardRef, useEffect, useState } from "react"
import styled from "styled-components"

import { Field, Button } from "ygh-ui"

import Entity from "../Entity"

const Container = styled(Entity)`
  overflow-x: hidden;
  overflow-y: auto;

  padding: 0.5em;
  border-radius: ${props => props.theme.borderRadius};

  background-color: #fff;
  color: ${props => props.theme.color.text};
`

const Form = styled.form`
  margin: 1.5em 0 0.5em;
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
      <Field
        label={label}
        value={state === undefined || state === null ? "" : state}
        onChange={event => setState(event.target.value)}
      />
      <Button type="submit" color="primary" size="medium">
        &rarr;
      </Button>
    </Form>
  )
}

const DefaultEntityDetail = forwardRef(
  (
    {
      id,
      name,
      state,
      fields = [],
      inputs = [],
      informationSlots = [],
      useDestinations = [],
      useSources = [],
      dispatchInputAction,
      ...otherProps
    },
    ref
  ) => (
    <Container {...otherProps} ref={ref} noVisual>
      <strong>
        {name}
        {state.name ? ` <${state.name}>` : null}
      </strong>
      <br />#{id}
      <br />
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
    </Container>
  )
)

DefaultEntityDetail.defaultProps = {
  ...Entity.defaultProps,
  width: 22,
  height: 22
}

export default DefaultEntityDetail
