import React, { forwardRef } from "react"
import styled, { css } from "styled-components"

import Entity from "../Entity"
import GameEntity from "../GameEntity"
import _ from "ygh-utils"

const Exclamation = styled.strong`
  position: absolute;
  left: calc(50% + 5rem);
  bottom: calc(50% + 5rem);

  width: 3rem;
  height: 3rem;
  border-radius: 100%;

  font-size: 2rem;
  line-height: 3rem;
  font-weight: 900;
  text-align: center;

  background-color: #f12;
  color: #fff;

  transform: scale(${props => (props.isVisible ? 1 : 0)});

  transition: transform cubic-bezier(0.175, 0.885, 0.32, 1.275);
`

const Letter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 20rem;
  height: 12rem;
  border-radius: 0.5rem;

  box-shadow: 0 0.5em 1.5em -0.5em #0009;

  background: #fff;

  transform: translate(-50%, -50%);

  transition: transform 0.5s ease-out;

  &::before {
    content: "";

    position: absolute;
    top: 0.5rem;
    left: 50%;

    width: 11.7rem;
    height: 11.7rem;

    border-radius: 1rem;

    box-shadow: 0.15em 0.15em 0.75em -0.25em #0006;
    background-color: #fff;

    clip-path: polygon(50% 50%, 110% -10%, 110% 110%, -10% 110%);

    transform: translate(-50%, -50%) rotate(45deg) skewX(-12deg) skewY(-15.5deg);

    transition-property: box-shadow, background-color, clip-path, transform;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
  }

  ${props =>
    !props.isVisible &&
    css`
      transform: translate(-50%, 100vh);

      &::before {
        box-shadow: inset -0.15em -0.15em 0.75em -0.25em #0006;

        background-color: #cfd6e6;

        clip-path: polygon(-10% -10%, 110% -10%, 110% 110%, -10% 110%);

        transform: translate(-50%, -50%) rotate(45deg) skewX(-11.5deg)
          skewY(-15.5deg);
      }
    `}
`

const Prize = styled.img`
  position: absolute;
  top: calc(50% - 2.5rem);
  left: 50%;

  max-width: calc(100vw - 4rem);
  max-height: calc(100vh - 9rem);

  box-shadow: 0 0.5em 1.5em -0.5em #0009;

  transform: translate(-50%, ${props => (props.isVisible ? "-50%" : "100vh")});

  transition: transform 0.5s ease-out;
`

const Outro = forwardRef(({ dispatchInputAction, ...props }, ref) => {
  const letterOpened = _.hasState("Letter Opened")(props)
  const letterReceived = letterOpened || _.hasState("Letter Received")(props)
  const prize = _.getFieldValue("Prize")(props)

  return (
    <GameEntity
      ref={ref}
      backgroundImage={
        "https://storage.googleapis.com/your-gift-hunt/mailbox.jpg"
      }
      shouldBlur={letterReceived}
      action={{
        type: "click",
        label: letterOpened
          ? "Tik om door te gaan"
          : letterReceived
          ? "Tik om te openen"
          : ""
      }}
      act={() => dispatchInputAction(props.state, "act", "click")}
    >
      <Exclamation isVisible={!letterReceived}>!</Exclamation>
      <Letter isVisible={letterReceived && !letterOpened} />
      <Prize isVisible={letterOpened} src={prize} />
    </GameEntity>
  )
})
Outro.name = "Outro"
Outro.templateName = "Outro"
Outro.defaultProps = Entity.defaultProps

export default Outro
