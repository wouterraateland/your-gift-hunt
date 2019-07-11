import React, { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"

import { Paper, Float, Button } from "ygh-ui"
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
          Do you allow Your Gift Hunt to use your current location as default?
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
            color="accent"
            size="small"
          >
            Allow
          </Button>
        </Float.Right>
      </Paper.Section>
    </Paper>
  </FloatingBox>
)

const GeopointInputWithCurrentLocation = props => (
  <GoogleMap {...props} centerAroundCurrentLocation={props.value === null} />
)

const GeopointInput = props => {
  const mounted = useRef(false)
  const [geolocationStatus, setGeolocationStatus] = useState(
    window.localStorage.getItem("geolocationStatus")
  )

  useEffect(() => {
    mounted.current = true

    navigator.permissions
      .query({ name: "geolocation" })
      .then(({ state }) => mounted.current && setGeolocationStatus(state))

    return () => {
      mounted.current = false
    }
  }, [])

  const updateGeolocationStatus = useCallback(status => {
    setGeolocationStatus(status)
    window.localStorage.setItem("geolocationStatus", status)
  }, [])

  switch (geolocationStatus) {
    case "granted":
      return <GeopointInputWithCurrentLocation {...props} />
    case "denied":
      return <GoogleMap {...props} />
    case "prompt":
    default:
      return (
        <>
          <GoogleMap {...props} />
          <UseLocationPrompt
            onAcceptClick={() => updateGeolocationStatus("granted")}
            onDenyClick={() => updateGeolocationStatus("denied")}
          />
        </>
      )
  }
}

export default GeopointInput
