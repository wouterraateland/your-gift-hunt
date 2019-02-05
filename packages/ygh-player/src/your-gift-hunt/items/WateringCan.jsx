import React from "react"
import styled, { css } from "styled-components"
import _ from "utils"

import Item from "./Item"

const WateringCan = styled(Item)`
  width: 1em;
  height: 1.5em;
  margin-top: 0.5em;
  margin-left: 0.4em;
  border-radius: 20% 15% 10% 10% / 80% 40% 10% 10%;

  box-shadow: inset 0 0.2em 0.2em -0.1em #fff9,
    inset -0.3em -0.05em 0.5em -0.1em #0009;

  color: #1b74ad;
  background-color: currentColor;

  ${props =>
    props.isFilled &&
    css`
      background-image: linear-gradient(transparent 30%, #0004 30%);
    `}

  &::before {
    left: -0.25em;
    top: -0.5em;
    z-index: -1;

    border-radius: 100%;
    box-shadow: inset 0.02em 0.02em 0.02em 0 #fff9,
      inset -0.02em -0.02em 0.02em 0 #0009, inset 0 0 0 0.1em;

    width: 1em;
    height: 1em;
  }

  &::after {
    left: 0.8em;
    top: 0.4em;

    width: 1em;
    height: 0.3em;

    border-radius: 20% 50% 0 0 / 100% 50% 0 0;

    box-shadow: inset 0 0.1em 0.1em -0.1em #fff9;

    mask: radial-gradient(
      ellipse 60% 50% at 40% 100%,
      transparent 97%,
      #000 100%
    );

    background-color: currentColor;
    background-image: ${props =>
        props.isFilled
          ? `linear-gradient(45deg, #0006 58%, transparent 58%),`
          : ``}
      radial-gradient(ellipse 70% 80% at 40% 100%, #0009 60%, transparent);

    transform: rotate(-45deg);
  }
`

const StatefulWateringCan = props => {
  const isFilled = _.hasState("filled")(props)

  return <WateringCan isFilled={isFilled} />
}
StatefulWateringCan.entityName = "Watering can"

export default StatefulWateringCan
