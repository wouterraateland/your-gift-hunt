import React, { useCallback, useState } from "react"
import styled from "styled-components"
import { Map, Circle, GoogleApiWrapper } from "google-maps-react"
import * as deepmerge from "deepmerge"

import Paper from "../Paper"
import Input from "./"

const MapContainer = styled.div`
  position: relative;
  overflow: hidden;

  width: 100%;
  height: 15em;
  border-radius: 0.15em;
`

const ValueControls = styled.div`
  position: absolute;
  left: 0.5em;
  bottom: 0;
  right: 0.5em;

  will-change: transform;

  transform: translate(
    0,
    ${props => (props.isVisible ? 0 : "calc(100% - 1em)")}
  );

  transition: transform 0.2s ease-out;
`

const InlineField = styled.div`
  display: inline-block;
  width: calc(33% - 1em);
  margin: 1.5em 0.5em 0.5em;

  & > div {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
`

const VisibilityToggle = styled.div`
  cursor: pointer;

  position: relative;

  height: 1em;

  transform: scale(1, ${props => (props.isVisible ? 1 : -1)});

  &::after {
    content: "›";
    position: absolute;
    left: 50%;
    top: 50%;

    font-size: 2em;
    color: #0004;

    transform: translate(-50%, -50%) rotate(90deg);
  }
`

const GoogleMap = ({
  google,
  centerAroundCurrentLocation = false,
  value,
  onChange
}) => {
  const [isInputVisible, setInputVisibility] = useState(false)
  const onMapClick = useCallback(
    (_1, { zoom }, e) =>
      onChange({
        target: {
          value: {
            center: {
              lat: e.latLng.lat(),
              lng: e.latLng.lng()
            },
            radius: 100 * Math.pow(2, 14 - zoom)
          }
        }
      }),
    []
  )

  const toggleInputVisibility = useCallback(
    () => setInputVisibility(v => !v),
    []
  )

  return (
    <MapContainer>
      <Map
        google={google}
        zoom={
          value && value.radius
            ? Math.log2((100 * Math.pow(2, 14)) / value.radius)
            : 14
        }
        onClick={onMapClick}
        initialCenter={
          value && value.center && value.center.lat && value.center.lng
            ? value.center
            : {
                lat: 37.774929,
                lng: -122.419416
              }
        }
        zoomControl={false}
        mapTypeControl={false}
        streetViewControl={false}
        centerAroundCurrentLocation={centerAroundCurrentLocation}
      >
        {value &&
          value.center &&
          value.center.lat &&
          value.center.lng &&
          value.radius && (
            <Circle
              center={value.center}
              radius={value.radius}
              strokeColor="#39f"
              strokeOpacity={1}
              strokeWeight={1}
              fillColor="39f"
              fillOpacity={0.5}
            />
          )}
      </Map>
      <ValueControls isVisible={isInputVisible}>
        <Paper>
          <VisibilityToggle
            isVisible={isInputVisible}
            onClick={toggleInputVisibility}
          />
          <InlineField>
            <Input
              type="number"
              label="Lat"
              value={value && value.center ? value.center.lat : null}
              onChange={event =>
                onChange({
                  target: {
                    value: deepmerge(value || {}, {
                      center: { lat: event.target.value }
                    })
                  }
                })
              }
            />
          </InlineField>
          <InlineField>
            <Input
              type="number"
              label="Lng"
              value={value && value.center ? value.center.lng : null}
              onChange={event =>
                onChange({
                  target: {
                    value: deepmerge(value || {}, {
                      center: { lng: event.target.value }
                    })
                  }
                })
              }
            />
          </InlineField>
          <InlineField>
            <Input
              type="number"
              label="Radius"
              value={value ? value.radius : null}
              min={1}
              onChange={event =>
                onChange({
                  target: {
                    value: deepmerge(value || {}, {
                      radius: event.target.value
                    })
                  }
                })
              }
            />
          </InlineField>
        </Paper>
      </ValueControls>
    </MapContainer>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(GoogleMap)
