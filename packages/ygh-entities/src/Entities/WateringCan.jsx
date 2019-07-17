import styled, { css } from "styled-components"
import Entity from "../Entity"
import _ from "ygh-utils"

const WateringCan = styled(Entity)`
  border-radius: 20% 15% 10% 10% / 80% 40% 10% 10%;

  box-shadow: inset 0 0.2em 0.2em -0.1em #fff9,
    inset -0.3em -0.05em 0.5em -0.1em #0009 !important;

  color: #009688;
  background-color: currentColor;

  ${props =>
    _.hasState("filled")(props) &&
    css`
      background-image: linear-gradient(transparent 30%, #0e314e88 30%);
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
        _.hasState("filled")(props)
          ? `linear-gradient(45deg, #0e314e88 58%, transparent 58%),`
          : ``}
      radial-gradient(ellipse 70% 80% at 40% 100%, #0009 60%, transparent);

    transform: rotate(-45deg);
  }
`
WateringCan.name = "WateringCan"
WateringCan.templateName = "Watering can"
WateringCan.defaultProps = {
  ...Entity.defaultProps,
  width: 1,
  height: 1.5,
  origin: { left: 0.7, top: 0.5 }
}
WateringCan.states = ["Empty", "Filled"]
WateringCan.Detail = WateringCan

export default WateringCan
