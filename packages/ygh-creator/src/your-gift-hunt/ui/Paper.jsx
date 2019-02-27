import React from "react"
import styled from "styled-components"

export const PaperTitle = styled.h2`
  margin: 0 0 1em;
`

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
  margin: 0;

  & + & {
    margin-top: 1em;
  }

  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0 0.5em 1.5em -0.5em #0004;

  background: #fff;
`

Paper.Section = PaperSection
Paper.Title = ({ size, ...otherProps }) => (
  <PaperTitle as={`h${size}`} {...otherProps} />
)

export default Paper
