import { kebabCase } from 'lodash'
import React from 'react'
import styled from 'styled-components'

import { Link } from 'gatsby'

const StyledPostSummary = styled.div`
  margin: 2em 0;

  p {
    color: ${props => props.theme.color.text};
  }
`

const PostSummary = ({ detailed, excerpt, fields, frontmatter }) => (
  <StyledPostSummary>
    <Link to={fields.slug}>
      {detailed
        ? <h2>{frontmatter.title}</h2>
        : <h3>{frontmatter.title}</h3>
      }
      {detailed && <p>{excerpt}</p>}
    </Link>
    <article>
      <small>
        {detailed && (
          <>
            <span>By </span>
            <Link to={`/authors/${kebabCase(frontmatter.author)}`}>
              {frontmatter.author}
            </Link>
            <span> in </span>
            <Link to={`/categories/${kebabCase(frontmatter.category)}`}>
              {frontmatter.category}
            </Link>
            <span> &bull; </span>
          </>
        )}
        {frontmatter.date}
      </small>
    </article>
  </StyledPostSummary>
)

export default ({ detailed, postEdges }) => {
  return postEdges
    .map(edge => edge.node)
    .map(post =>
      <PostSummary
        key={post.id}
        detailed={detailed}
        {...post}
      />
    )
}
