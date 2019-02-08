import styled from "styled-components"

export const PaperSection = styled.div`
  padding: 1em;

  &::after {
    content: "";
    display: block;
    clear: both;
  }
`

export const Paper = styled.div`
  position: relative;

  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0 0.5em 1.5em -0.5em #0004;

  background: #fff;
`

Paper.Section = PaperSection

export default Paper
