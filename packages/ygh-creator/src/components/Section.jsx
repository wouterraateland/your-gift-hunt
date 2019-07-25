import React, { useCallback, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import { useDebounce } from "ygh-hooks"

import { ActionButton, Paper } from "ygh-ui"
import Icons from "ygh-icons"

const SectionTitle = styled.strong`
  cursor: pointer;
  position: relative;

  display: block;
  margin: 0.5em;

  line-height: 1;
`

const StyledActionButton = styled(ActionButton)`
  position: absolute;
  top: 0;
  right: 0;

  margin: 0;
`

const StyledPaper = styled(Paper)`
  background-color: #fcfcfc;

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
      <SectionTitle onClick={toggleExpanded}>
        {title}
        <StyledActionButton>
          <Icons.Caret direction={isExpanded ? "down" : "right"} />
        </StyledActionButton>
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
