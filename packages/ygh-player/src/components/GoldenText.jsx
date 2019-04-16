import styled from "styled-components"

const GoldenText = styled.p`
  text-shadow: 0.05em 0.05em 0.1em #0009, 0 0 0 hsla(44, 100%, 70%, 0.5),
    -0.01em -0.01em 0.02em #fff9;

  background-color: hsla(44, 100%, 70%, 1);
  color: transparent;

  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
`

export default GoldenText
