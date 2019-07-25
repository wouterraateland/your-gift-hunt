import styled from "styled-components"

const Section = styled.div`
  display: flex;

  & + & {
    border-left: 1px solid #0002;
  }
`

export default Section
