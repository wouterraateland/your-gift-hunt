import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import deepmerge from "deepmerge"

import { useTheme } from "ygh-hooks"
import { GoogleProvider } from "./GoogleContext"

import Map from "./Map"
import Circle from "./Circle"

import Paper from "../../Paper"
import Field from "../../Field"

const MapContainer = styled.div`
  position: relative;
  overflow: hidden;

  width: 20em;
  height: 15em;
  margin: ${props => props.theme.borderWidth};
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

  & > div {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`

const Fields = styled.div`
  padding: 0 0.25em;
`

const InlineField = styled.div`
  display: inline-block;
  width: calc(33.33% - 0.5em);
  margin: 0.5em 0.25em;
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

const GoogleMap = ({ center, value, onChange }) => {
  const theme = useTheme()
  const [isInputVisible, setInputVisibility] = useState(false)
  const onMapClick = useCallback(
    ({ zoom }, e) =>
      onChange &&
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
    [onChange]
  )

  const toggleInputVisibility = useCallback(
    () => setInputVisibility(v => !v),
    []
  )

  return (
    <MapContainer>
      <Map
        initialZoom={
          value && value.radius
            ? Math.log2((100 * Math.pow(2, 14)) / value.radius)
            : 14
        }
        initialCenter={
          center
            ? center
            : value && value.center && value.center.lat && value.center.lng
            ? value.center
            : { lat: 0, lng: 0 }
        }
        onClick={onMapClick}
        zoomControl={false}
        mapTypeControl={false}
        streetViewControl={false}
      >
        {value &&
          value.center &&
          value.center.lat &&
          value.center.lng &&
          value.radius && (
            <Circle
              center={value.center}
              radius={value.radius}
              strokeColor={theme.color.primary}
              strokeOpacity={1}
              strokeWeight={1}
              fillColor={theme.color.primary}
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
          <Fields>
            <InlineField>
              <Field
                type="number"
                label="Lat"
                suffix="°"
                disabled={!isInputVisible}
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
              <Field
                type="number"
                label="Lng"
                suffix="°"
                disabled={!isInputVisible}
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
              <Field
                type="number"
                label="Radius"
                disabled={!isInputVisible}
                value={value ? value.radius : null}
                min={1}
                suffix="m"
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
          </Fields>
        </Paper>
      </ValueControls>
    </MapContainer>
  )
}

const GoogleMapWithContext = props => (
  <GoogleProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
    <GoogleMap {...props} />
  </GoogleProvider>
)

export default GoogleMapWithContext
