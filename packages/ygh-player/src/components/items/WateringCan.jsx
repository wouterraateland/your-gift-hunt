import styled, { css } from 'styled-components'

const WateringCan = styled.div`
  position: relative;

  width: 1em;
  height: 1.5em;
  margin-top: .5em;
  margin-left: .4em;
  border-radius: 20% 15% 10% 10% / 80% 40% 10% 10%;

  box-shadow:
    inset 0 .2em .2em -.1em #fff9,
    inset -.3em -.05em .5em -.1em #0009;

  color: #1b74ad;
  background-color: currentColor;

  ${props => props.state === 'filled' && css`
    background-image:
      linear-gradient(transparent 30%, #0004 30%);
  `}

  &::before,
  &::after {
    content: '';

    position: absolute;
  }

  &::before {
    left: -.25em;
    top: -.5em;
    z-index: -1;

    border-radius: 100%;
    box-shadow:
      inset .02em .02em .02em 0 #fff9,
      inset -.02em -.02em .02em 0 #0009,
      inset 0 0 0 .1em;

    width: 1em;
    height: 1em;
  }

  &::after {
    left: .8em;
    top: .4em;

    width: 1em;
    height: .3em;

    border-radius: 20% 50% 0 0 / 100% 50% 0 0;

    box-shadow: inset 0 .1em .1em -.1em #fff9;

    mask:
      radial-gradient(ellipse 60% 50% at 40% 100%, transparent 97%, #000 100%);

    background-color: currentColor;
    background-image:
      ${props => props.state === 'filled'
        ? `linear-gradient(45deg, #0006 58%, transparent 58%),`
        : ``}
      radial-gradient(ellipse 70% 80% at 40% 100%, #0009 60%, transparent);

    transform: rotate(-45deg);
  }
`

export default WateringCan

export const itemId = 'watering-can'
