import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"

import Button from "../Button"
import Float from "../Float"
import Paper from "../Paper"

import InputContainer from "./InputContainer"
import GoogleMap from "./GoogleMap"

const FloatingBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  padding: 1em;
  background: #0002;
`

const Prompt = styled.p`
  margin-top: 0;
`

const UseLocationPrompt = ({ onAcceptClick, onDenyClick }) => (
  <FloatingBox>
    <Paper>
      <Paper.Section>
        <Prompt>
          Do you allow Your Gift Hunt to use your current location?
        </Prompt>
        <Float.Right>
          <Button
            onClick={onDenyClick}
            importance="tertiary"
            color="error"
            size="small"
          >
            Deny
          </Button>{" "}
          <Button
            onClick={onAcceptClick}
            importance="primary"
            color="secondary"
            size="small"
          >
            Allow
          </Button>
        </Float.Right>
      </Paper.Section>
    </Paper>
  </FloatingBox>
)

const GeopointInput = props => {
  const mounted = useRef(false)
  const [geolocationStatus, setGeolocationStatus] = useState("denied")

  useEffect(() => {
    mounted.current = true

    navigator.permissions
      .query({ name: "geolocation" })
      .then(({ state }) => mounted.current && setGeolocationStatus(state))

    return () => {
      mounted.current = false
    }
  }, [])

  return (
    <InputContainer>
      {geolocationStatus === "granted" ? (
        <GoogleMap
          key={2}
          {...props}
          centerAroundCurrentLocation={!props.value}
        />
      ) : (
        <GoogleMap key={1} {...props} />
      )}
      {geolocationStatus === "prompt" && (
        <UseLocationPrompt
          onAcceptClick={() => setGeolocationStatus("granted")}
          onDenyClick={() => setGeolocationStatus("denied")}
        />
      )}
    </InputContainer>
  )
}

export default GeopointInput
