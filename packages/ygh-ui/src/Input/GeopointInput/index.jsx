import React, { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"

import Button from "../../Button"
import Float from "../../Float"
import Paper from "../../Paper"

import InputContainer from "../InputContainer"
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
  const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const [geolocationStatus, setGeolocationStatus] = useState(null)

  const setCenterToCurrentLocation = useCallback(
    () =>
      new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(
          pos => {
            resolve(
              setCenter({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
              })
            )
          },
          () => resolve(setCenter({ lat: 0, lng: 0 }))
        )
      }),
    []
  )

  useEffect(() => {
    mounted.current = true

    navigator.permissions
      .query({ name: "geolocation" })
      .then(async ({ state }) => {
        if (mounted.current) {
          if (state === "granted") {
            await setCenterToCurrentLocation()
          }
          setGeolocationStatus(state)
        }
      })

    return () => {
      mounted.current = false
    }
  }, [])

  return (
    <InputContainer>
      {geolocationStatus ? (
        geolocationStatus === "prompt" ? (
          <UseLocationPrompt
            onAcceptClick={async () => {
              await setCenterToCurrentLocation()
              setGeolocationStatus("granted")
            }}
            onDenyClick={() => setGeolocationStatus("denied")}
          />
        ) : (
          <GoogleMap {...props} center={center} />
        )
      ) : (
        "Loading..."
      )}
    </InputContainer>
  )
}

export default GeopointInput
