import styled from "styled-components"

const Section = styled.div`
  display: flex;
  padding: 0.25em;

  & + & {
    border-left: 0.1em solid #fff1;
  }
`

export default Section
