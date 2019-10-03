import React, { forwardRef, useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { darken } from "polished"
import _ from "ygh-utils"

import Entity from "../Entity"

const Screen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  border-radius: 0.25em;
  box-shadow: inset 0 -0.125em 0.375em -0.125em #0009;

  background-color: currentColor;
`

const Display = styled.div`
  position: absolute;
  top: 0.25em;
  left: 0.25em;
  right: 0.25em;
  bottom: 0.75em;

  overflow: hidden;

  border-radius: 0.25em;

  background: #000 url(${props => props.src}) no-repeat center / cover;
`

const Text = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;

  text-align: center;
  font-weight: bold;
  font-size: 0.65em;

  color: #fff;
`

const Leg = styled.div`
  position: absolute;
  top: 100%;

  width: 0.5em;
  height: 0.5em;

  border-radius: 0 0 0.25em 0.25em;
  box-shadow: inset 0 -0.125em 0.375em -0.125em #0009;

  background-color: ${props => props.color};

  &::after {
    content: "";

    position: absolute;
    left: 0;
    right: 0;
    top: 0;

    height: 1.5em;

    border-radius: 0 0 1em 1em;
    box-shadow: inset 0 -0.125em 0.375em -0.125em #0009;

    background-color: currentColor;

    transform-origin: top;
  }
`

const LeftLeg = styled(Leg)`
  left: 3em;

  &::after {
    transform: skewX(-45deg);
  }
`

const RightLeg = styled(Leg)`
  right: 3em;

  &::after {
    transform: skewX(45deg);
  }
`

const Show = styled.span`
  position: absolute;
  z-index: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;

  width: ${props => props.size - 2}em;
  height: ${props => props.size - 1}em;
  padding: 1em;

  font-weight: bold;

  color: #000;

  &::before {
    content: "Nu";

    margin-top: -1em;

    font-weight: normal;

    color: #fff;
  }

  &::after {
    content: "";
    position: absolute;
    top: ${props => props.size / 2 - 0.5}em;
    left: 1em;

    z-index: -1;

    width: ${props => props.size}em;
    height: ${props => props.size}em;

    border-radius: 1em;
    box-shadow: 0.5em -0.5em #ff7f3699, 1em -1em #ff7f3655;

    background: #ff7f36;

    transform: translate(-50%, -50%) rotate(45deg);
  }
`

const TV = forwardRef(({ dispatchInputAction, ...props }, ref) => {
  const inCommercial = _.hasState("Commercial")(props)
  const images = useMemo(
    () =>
      _.getFieldValue(inCommercial ? "Commercial Images" : "Program Images")(
        props
      ),
    [props]
  )
  const [src, setSrc] = useState(images[0])

  useEffect(() => {
    const date = new Date().getDate()
    if (_.hasState("Commercial")(props) && date > 11) {
      dispatchInputAction(props.state, "date", date)
    }
  }, [props.state.id])

  useEffect(() => {
    const nextImage = () =>
      setSrc(
        src =>
          images[(images.findIndex(img => img === src) + 1) % images.length]
      )
    const i = setInterval(nextImage, 2500)

    return () => {
      clearInterval(i)
    }
  }, [images])

  return (
    <Entity noVisual {...props} ref={ref}>
      <LeftLeg color={darken(0.1)(props.color)} />
      <RightLeg color={darken(0.1)(props.color)} />
      <Screen>
        <Display src={src}>
          {inCommercial ? null : (
            <Show size={props.height}>{_.getFieldValue("Program")(props)}</Show>
          )}
        </Display>
        <Text>TV</Text>
      </Screen>
    </Entity>
  )
})
TV.name = "TV"
TV.templateName = "TV"
TV.defaultProps = {
  ...Entity.defaultProps,
  width: 18,
  height: 10,
  color: "#3f3f3f",
  fields: [{ name: "Program", value: "TV Show" }]
}
TV.states = ["Commercial", "Program"]

export default TV
