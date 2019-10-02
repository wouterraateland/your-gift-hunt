import React, { useCallback } from "react"
import styled, { css } from "styled-components"
import firstBy from "thenby"

import { useAsync, useSearchQuery } from "ygh-hooks"
import useTemplateSet from "hooks/useTemplateSet"
import useTemplateInspector from "hooks/useTemplateInspector"
import useTemplateSetMutations from "hooks/useTemplateSetMutations"

import Icons from "ygh-icons"
import { Align, ActionButton, Field, Message, Paper, ToolTip } from "ygh-ui"
import EntityTypeIcon from "components/EntityTypeIcon"

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 17em;
  border-right: 1px solid #0002;

  background-color: #fcfcfc;

  @media (max-width: 30em) {
    width: 100vw;
    transition: margin-left 0.4s ease-in-out;
    margin-left: ${props => (props.isOpen ? -100 : 0)}vw;
  }
`

const Header = styled.div`
  flex-shrink: 0;
  padding: 0.5rem;
`

const Body = styled.div`
  flex-grow: 1;

  overflow-x: hidden;
  overflow-y: auto;
`

const Footer = styled.div`
  flex-shrink: 0;
  padding: 0.5rem;
`

const Label = styled.strong`
  display: block;
  & > * {
    float: right;
    margin: 0 -0.25rem;
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

  const onButtonClick = useCallback(
    runAsync(async () => {
      const { data } = await createEntityTemplate()
      inspectTemplate(data.createEntityTemplate.id)
    }),
    [createEntityTemplate]
  )

  return (
    <Container isOpen={isOpen}>
      <Header>
        <Label>
          Templates
          <ActionButton
            block
            color="primary"
            disabled={isLoading}
            onClick={onButtonClick}
          >
            <Icons.Plus />
            <ToolTip>Add new template</ToolTip>
          </ActionButton>
        </Label>
        {error && (
          <Message.Error>{JSON.stringify(error.message)}</Message.Error>
        )}
      </Header>
      <Body>
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
      </Body>
      <Footer>
        <Field
          block
          type="search"
          size="small"
          lead={<Icons.Loop />}
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </Footer>
    </Container>
  )
}

export default OverviewPane
