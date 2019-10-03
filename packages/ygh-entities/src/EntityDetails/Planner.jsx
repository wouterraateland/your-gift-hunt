import React, { forwardRef, useEffect } from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import Entity from "../Entity"

const Backdrop = styled(Entity)`
  border-radius: 1em;

  background: currentColor;
`

const Paper = styled.div`
  position: absolute;
  left: 1em;
  top: 1em;
  right: 1em;

  height: ${props => props.height}em;
  padding: 0.5em 1em;

  box-shadow: 0 0.5em 1.5em -0.5em #0006;

  background: #f5f0d7;
`

const Holder = styled.div`
  position: absolute;
  left: 50%;
  top: 0.5em;

  width: 6em;
  height: 1em;

  border-radius: 50% 50% 0 0 / 200% 200% 0 0;
  box-shadow: 0.5em 0.25em 0.75em -0.25em #0004,
    -0.5em 0.25em 0.75em -0.25em #0004;

  background: linear-gradient(#ccc, #999);

  transform: translate(-50%, 0);

  &::before,
  &::after {
    content: "";
    position: absolute;

    left: 50%;

    transform: translate(-50%, 0);
  }

  &::before {
    bottom: 100%;

    width: 1.5em;
    height: 2em;

    border-radius: 5em 5em 0 0;

    background: radial-gradient(
      circle 10em at 50% 0.75em,
      transparent 0.25em,
      #999 0.3em,
      #ccc 0.5em
    );
  }

  &::after {
    top: -0.375em;

    width: 0.25em;
    height: 0.25em;

    border-radius: 100%;
    box-shadow: inset 0 0 0.125em #0009;

    background: #999;
  }
`

const Text = styled.p`
  margin: 0.5em 0;

  -webkit-touch-callout: none;
  user-select: none;

  color: #000c;
`

const Checkbox = styled.span`
  display: inline-block;
  width: 1em;
  height: 1em;

  border: 0.1em solid #0006;
  border-radius: 0.125em;

  &::before {
    content: ${props =>
      props.isChecked ? '"✓"' : props.isCrossed ? '"✗"' : '""'};

    line-height: 0.5;
    font-size: 1.5em;
    text-align: center;

    color: ${props =>
      props.isChecked ? "#05f" : props.isCrossed ? "#f23" : ""};
  }
`

const Planner = forwardRef(({ dispatchInputAction, ...props }, ref) => {
  const isDay3 = _.hasState("Day 3")(props)

  useEffect(() => {
    const date = new Date().getDate()
    if (
      (_.hasState("Day 1")(props) && date > 10) ||
      (_.hasState("Day 2")(props) && date > 11)
    ) {
      dispatchInputAction(props.state, "date", date)
    }
  }, [props.state.id])

  return (
    <Backdrop noVisual {...props} ref={ref}>
      <Paper height={props.height - 2} />
      <Paper height={props.height - 2.5} />
      <Paper height={props.height - 3}>
        <Text>Planning:</Text>
        <Text>
          10-10:{" "}
          <span role="img" aria-label="Cake">
            🎂
          </span>
          <br />
          <Checkbox isChecked /> Wandeling
        </Text>
        <Text>
          11-10:
          <br />
          <Checkbox isChecked={isDay3} /> Squash
          <br />
          <Checkbox isCrossed={isDay3} /> Chillen
        </Text>
        <Text>
          12-10:
          <br />
          <Checkbox isCrossed={isDay3} /> Studeren
        </Text>
      </Paper>
      <Holder />
    </Backdrop>
  )
})
Planner.name = "Planner"
Planner.templateName = "Planner"
Planner.defaultProps = {
  ...Entity.defaultProps,
  width: 12,
  height: 16,
  color: "#754C3D"
}
Planner.states = ["Day 1", "Day 2", "Day 3"]

export default Planner
