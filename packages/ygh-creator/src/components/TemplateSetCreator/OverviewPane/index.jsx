import React, { useCallback } from "react"
import styled, { css } from "styled-components"
import firstBy from "thenby"

import useAsync from "hooks/useAsync"
import useSearchQuery from "hooks/useSearchQuery"
import useTemplateSet from "hooks/useTemplateSet"
import useTemplateInspector from "hooks/useTemplateInspector"
import useTemplateSetMutations from "hooks/useTemplateSetMutations"

import { Align, Button, Input, Message, Paper, VSpace } from "your-gift-hunt/ui"
import EntityTypeIcon from "components/EntityTypeIcon"

const ScrollablePaper = styled(Paper)`
  width: 17em;
  border-radius: 0;

  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: 30em) {
    width: 100vw;
    transition: margin-left 0.4s ease-in-out;
    margin-left: ${props => (props.isOpen ? -100 : 0)}vw;
  }
`

const HoverablePaperSection = styled(Paper.Section)`
  cursor: pointer;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  background-clip: padding-box;

  & svg {
    vertical-align: baseline;
  }

  ${props =>
    props.isActive
      ? css`
          background-color: #0002;
        `
      : css`
          &:hover {
            background-color: #0001;
          }
        `}
`

const OverviewPane = () => {
  const [{ isLoading, error }, runAsync] = useAsync()
  const { templateSet } = useTemplateSet()
  const { inspectTemplate, inspectedTemplate, isOpen } = useTemplateInspector()
  const { createEntityTemplate } = useTemplateSetMutations()
  const { query, setQuery, filteredData: entityTemplates } = useSearchQuery(
    templateSet.entityTemplates.sort(firstBy("name")),
    ["name"]
  )

  const onButtonClick = useCallback(runAsync(createEntityTemplate), [
    createEntityTemplate
  ])

  return (
    <ScrollablePaper isOpen={isOpen}>
      <Paper.Section>
        <Button
          block
          color="primary"
          size="medium"
          importance="primary"
          disabled={isLoading}
          onClick={onButtonClick}
        >
          Add template
        </Button>
        {error && (
          <Message.Error>{JSON.stringify(error.message)}</Message.Error>
        )}
        <VSpace.Medium />
        <Input
          block
          type="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </Paper.Section>
      {entityTemplates.length ? (
        entityTemplates.map(entityTemplate => (
          <HoverablePaperSection
            key={entityTemplate.id}
            onClick={() => inspectTemplate(entityTemplate.id)}
            isActive={isOpen && inspectedTemplate === entityTemplate.id}
          >
            <strong>
              <EntityTypeIcon {...entityTemplate} weight={2} />{" "}
              {entityTemplate.name || <em>Nameless</em>}
            </strong>
          </HoverablePaperSection>
        ))
      ) : (
        <Paper.Section>
          <Align.Center>
            <em>
              {query
                ? "No templates matching your query."
                : "No templates yet. Add one"}
            </em>
          </Align.Center>
        </Paper.Section>
      )}
    </ScrollablePaper>
  )
}

export default OverviewPane
