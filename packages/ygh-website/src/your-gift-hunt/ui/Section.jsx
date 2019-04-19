import styled from "styled-components"

const Section = styled.section`
  &::after {
    content: "";
    display: block;
    clear: both;
  }

  position: relative;
  margin: 4em 0;
`

export default Section
