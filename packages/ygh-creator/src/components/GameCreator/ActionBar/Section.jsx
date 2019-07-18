import styled from "styled-components"

const Section = styled.div`
  display: flex;
  padding: 0.25em;

  & + & {
    border-left: 1px solid #fff1;
  }
`

export default Section
