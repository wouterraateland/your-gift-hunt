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

const Actions = styled.div`
  float: right;
  margin: -0.25rem;
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

const PaperSection = styled(Paper.Section)`
  padding: 0.5em;
`

const Section = ({
  title,
  wrapChildren = false,
  noWrapper = false,
  actions = null,
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
        <Actions>
          {actions}
          <ActionButton>
            <Icons.Caret direction={isExpanded ? "down" : "right"} />
          </ActionButton>
        </Actions>
      </SectionTitle>
      <StyledPaper expanding isExpanded={isExpanded} {...otherProps}>
        {wrapChildren ? (
          children.map((child, i) => (
            <PaperSection key={i}>{child}</PaperSection>
          ))
        ) : noWrapper ? (
          children
        ) : (
          <PaperSection>{children}</PaperSection>
        )}
      </StyledPaper>
    </>
  )
}

export default Section
