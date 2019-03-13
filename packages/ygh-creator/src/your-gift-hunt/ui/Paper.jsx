import React, { useEffect, useRef } from "react"
import styled, { css } from "styled-components"

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

export const PaperContainer = styled.div`
  position: relative;
  margin: 0;

  & + & {
    margin-top: 1em;
  }

  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow.medium};

  background: #fff;
`

export const ExpandingPaperContainer = styled(PaperContainer)`
  ${PaperSection} {
    transition: opacity 0.2s ease-out;
  }

  ${props =>
    !props.isExpanded &&
    css`
      overflow: hidden;

      ${PaperSection} {
        opacity: 0;
      }
    `}

  transition: max-height 0.2s ease-out;
`

const ExpandingPaper = ({ isExpanded, ...otherProps }) => {
  const ref = useRef(null)

  useEffect(
    () => {
      const el = ref.current
      if (el) {
        el.style.maxHeight = "0"
        if (isExpanded) {
          const offset = el.offsetHeight
          el.style.maxHeight = `${Math.max(offset, el.scrollHeight)}px`
        }
      }
    },
    [isExpanded, otherProps.children]
  )

  return (
    <ExpandingPaperContainer
      ref={ref}
      isExpanded={isExpanded}
      {...otherProps}
    />
  )
}

const Paper = ({ expanding, ...otherProps }) =>
  expanding ? (
    <ExpandingPaper {...otherProps} />
  ) : (
    <PaperContainer {...otherProps} />
  )

Paper.Container = PaperContainer
Paper.Section = PaperSection
Paper.Title = ({ size, ...otherProps }) => (
  <PaperTitle as={`h${size}`} {...otherProps} />
)

export default Paper
