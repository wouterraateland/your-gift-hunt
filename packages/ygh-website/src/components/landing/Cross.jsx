import styled from 'styled-components'

const Cross = styled.div`
  position: relative;

  width: 1em;
  height: 1em;
  margin: .3em 0 -.3em;

  font-size: 13em;

  float: right;

  &::before,
  &::after {
    content: '';

    position: absolute;
    left: 0; top: 0;
    right: 0; bottom: 0;

    width: 1em;
    height: .2em;
    border-radius: 100% 4% 50% 5% / 40% 10% 40% 70%;

    background: #fa3946;
  }

  &::before { transform: rotate(45deg); }
  &::after { transform: rotate(-45deg); }
`

export default Cross
