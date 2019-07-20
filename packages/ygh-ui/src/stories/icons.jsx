import React from "react"
import styled from "styled-components"

import { storiesOf } from "@storybook/react"
import { boolean, color, number } from "@storybook/addon-knobs"

import { Social, UI, Logo, Present } from "ygh-icons"

const Checkerboard = styled.div`
  position: relative;
  float: left;
  margin-bottom: 1.5em;

  & span {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 1.5em;
    padding: 0.25em;

    background-color: #000c;
    color: #fff;
  }

  &:nth-of-type(2n) {
    background-color: #0001;
  }
`

const Grid = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  border: 1px solid;

  opacity: 0.5;

  transform: translate(-50%, -50%);
`

const GridSquare = styled(Grid)`
  width: 75%;
  height: 75%;
  color: #0f0;
`

const GridVertical = styled(Grid)`
  width: 62.5%;
  height: 87.5%;
  color: #f00;
`

const GridHorizontal = styled(Grid)`
  width: 87.5%;
  height: 62.5%;
  color: #00f;
`

storiesOf("Icons", module)
  .add("Social", () => {
    const size = number("Size", 8, { min: 0, max: 12 })
    const iconColor = color("Color", "#0009")
    const showGrid = boolean("Show grid", false)

    return Object.keys(Social).map(key => {
      const Icon = Social[key]
      return (
        <Checkerboard
          key={key}
          style={{
            color: iconColor,
            width: `${size}em`,
            height: `${size}em`
          }}
        >
          {showGrid && (
            <>
              <GridSquare />
              <GridHorizontal />
              <GridVertical />
            </>
          )}
          <Icon size={size} />
          <span>{key}</span>
        </Checkerboard>
      )
    })
  })
  .add("UI", () => {
    const size = number("Size", 8, { min: 0, max: 12 })
    const iconColor = color("Color", "#0009")
    const showGrid = boolean("Show grid", false)

    return Object.keys(UI).map(key => {
      const Icon = UI[key]
      return (
        <Checkerboard
          key={key}
          style={{
            color: iconColor,
            width: `${size}em`,
            height: `${size}em`
          }}
        >
          {showGrid && (
            <>
              <GridSquare />
              <GridHorizontal />
              <GridVertical />
            </>
          )}
          <Icon size={size} />
          <span>{key}</span>
        </Checkerboard>
      )
    })
  })
  .add("Other", () => {
    const size = number("Size", 8, { min: 0, max: 12 })
    const iconColor = color("Color", "#0009")
    const showGrid = boolean("Show grid", false)

    const Icons = { Logo, Present }

    return Object.keys(Icons).map(key => {
      const Icon = Icons[key]
      return (
        <Checkerboard
          key={key}
          style={{
            color: iconColor,
            width: `${size}em`,
            height: `${size}em`
          }}
        >
          {showGrid && (
            <>
              <GridSquare />
              <GridHorizontal />
              <GridVertical />
            </>
          )}
          <Icon size={size} />
          <span>{key}</span>
        </Checkerboard>
      )
    })
  })
