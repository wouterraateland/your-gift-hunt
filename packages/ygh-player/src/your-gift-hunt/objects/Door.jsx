import React from "react"
import styled from "styled-components"

import _ from "utils"

import PhysicalObject from "./PhysicalObject"

const Frame = styled(PhysicalObject.Part)`
  width: 100%;
  height: 100%;

  &::before {
    width: 100%;
    height: 100%;

    border-radius: 60% 40% 50% 80% / 0.15em 0.1em 0.15em 0.1em;

    box-shadow: inset 0 0.2em 0.4em -0.1em #fff4,
      inset 0 -0.2em 0.4em -0.1em #0004;

    background: #859756; /* #856a46; */
  }

  &::after {
    left: -0.5em;
    top: -0.25em;
    bottom: -0.25em;

    width: 0.5em;
    border-radius: 0.2em 0.1em 0.1em 0.1em / 0.3em 0.2em 0.1em 0.5em;

    box-shadow: 5.5em 0 #000;

    background: #000;
  }
`

const DoorPart = styled(PhysicalObject.Part)`
  top: 0.25em;
  bottom: 0.25em;
  width: 100%;
  height: 0.5em;
  margin: auto;
  border-radius: 60% 40% 0.2em 80% / 0.2em 0.2em 0.3em 0.1em;

  background: #584630;

  transform-origin: left bottom;
  transform: rotate(${props => (props.isOpen ? 60 : 0)}deg);

  transition: transform 1s ease-in-out;

  &::before {
    left: 0;
    bottom: 0;

    width: 0.5em;
    height: 0.5em;
    border-radius: 100% 90% 90% 110%;

    background: #000;

    transform: translate(-50%, 50%) rotate(344deg);
  }
`

const Door = props => {
  const isOpen = _.hasState("open")(props)

  return (
    <PhysicalObject width={5} height={1} {...props}>
      <Frame z={0} />
      <DoorPart isOpen={isOpen} z={2} />
    </PhysicalObject>
  )
}

Door.entityName = "Door"

export default Door
