import React from "react"
import styled from "styled-components"

export const PaperTitle = styled.h2`
  margin: 0 0 1em;
`

export const PaperSection = styled.div`
  padding: 1em;

  & + & {
    border-top: 1px solid #0002;
  }

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
  box-shadow: ${props => props.theme.boxShadow.medium};

  background: #fff;
`

Paper.Section = PaperSection
Paper.Title = ({ size, ...otherProps }) => (
  <PaperTitle as={`h${size}`} {...otherProps} />
)

export default Paper
