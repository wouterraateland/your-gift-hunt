import styled from 'styled-components'

const SafeKey = styled.div`
  position: relative;

  width: .5em;
  height: .5em;

  border-radius: 100%;

  box-shadow:
    0 0 0 .1em #7e6d63,
    .35em -.35em 0 .9em,
    .35em -.35em 0 1em #7e6d63;

  color: #9a8d7d;

  transform: translate(-.6em, .55em) scale(.46);

  &::before,
  &::after {
    content: '';

    position: absolute;
  }

  &::before {
    width: .5em;
    height: .5em;

    box-shadow:
      1.5em -1.7em 0 0.1em,
      2.1em -2.2em 0 0em,
      2.6em -2.8em 0 0em,
      3.2em -2.98em 0 0em;
  }

  &::after {
    left: 1.05em;
    top: -2.05em;

    width: 2.8em;
    height: .7em;

    border-bottom: .1em solid #7e6d63;

    background-color: currentColor;
    background-image:
      linear-gradient(90deg,
        #9a8d7d, transparent 30%
        ),
      linear-gradient(
        transparent 34%, #0004 34%,
        #0004 49%, transparent 49%,
        transparent 68%, #0004 68%,
        #0004 83%, transparent 83%
      );

    transform: rotate(-45deg);
  }
`

export default SafeKey

export const itemId = 'safe-key'
