import React, { useCallback, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import { useDebounce } from "ygh-hooks"

import { Paper } from "ygh-ui"

const SectionTitle = styled.strong`
  cursor: pointer;
  position: relative;

  display: block;
  margin: 0.5em;

  line-height: 1;

  &::after {
    content: "›";

    position: absolute;
    right: 0;
    top: 60%;

    font-size: 2rem;
    font-weight: normal;
    font-family: ${props => props.theme.font.copy};

    color: ${props => props.theme.color.text};

    transform: translate(0, -50%)
      scale(1, ${props => (props.isExpanded ? 1 : -1)}) rotate(90deg);

    &:hover {
      color: ${props => props.theme.color.emphasis};
    }
  }
`

const StyledPaper = styled(Paper)`
  ${props =>
    !props.isFlat &&
    css`
      ${props.isExpanded &&
        css`
          border: 1px solid #0002;
          border-width: 1px 0;
        `}
      border-radius: 0;
      box-shadow: none;
    `}
`

const Section = ({
  title,
  wrapChildren = false,
  noWrapper = false,
  children,
  ...otherProps
}) => {
  const [isExpanded, setExpanded] = useState(
    (JSON.parse(window.localStorage.getItem("sectionPreferences")) || {})[title]
  )
  const toggleExpanded = useCallback(
    () => setExpanded(isExpanded => !isExpanded),
    []
  )
  const debouncedIsExpanded = useDebounce(isExpanded)

  useEffect(() => {
    const prefs = JSON.parse(window.localStorage.getItem("sectionPreferences"))

    window.localStorage.setItem(
      "sectionPreferences",
      JSON.stringify({
        ...prefs,
        [title]: debouncedIsExpanded
      })
    )
  }, [title, debouncedIsExpanded])

  return (
    <>
      <SectionTitle onClick={toggleExpanded} isExpanded={isExpanded}>
        {title}
      </SectionTitle>
      <StyledPaper expanding isExpanded={isExpanded} {...otherProps}>
        {wrapChildren ? (
          children.map((child, i) => (
            <Paper.Section key={i}>{child}</Paper.Section>
          ))
        ) : noWrapper ? (
          children
        ) : (
          <Paper.Section>{children}</Paper.Section>
        )}
      </StyledPaper>
    </>
  )
}

export default Section
