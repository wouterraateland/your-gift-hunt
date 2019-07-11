import { kebabCase } from "lodash"
import React from "react"
import styled from "styled-components"
import { Link, StaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"

import { Header, Wrapper, Row, Column } from "ygh-ui"

import MailchimpForm from "components/MailchimpForm"

import Layout from "components/Layout"
import PostList from "components/PostList"

const FormMargins = styled.div`
  margin-bottom: 2em;
`

const PostPageWithCategories = ({ postEdges, categories, filter }) => (
  <Layout>
    <Helmet titleTemplate="%s | Your Gift Hunt Blog">
      <title>{filter ? filter : "All stories"}</title>
    </Helmet>
    <Header>
      <article>
        <h1>Blog</h1>
        <p>
          We write about new features, incredible puzzles and amazing gifts.{" "}
          <a href="#subscribe">Subscribe to our newsletter</a> for early access
          and our latest stories.
        </p>
      </article>
    </Header>
    <Wrapper xlarge>
      <Row vAlign="top">
        <Column size={8} mSize={12}>
          <h1>
            {filter ? (
              <>
                <Link to="/blog">All stories</Link> / {filter}
              </>
            ) : (
              "All stories"
            )}
          </h1>
          <PostList postEdges={postEdges} detailed />
        </Column>
        <Column size={4} mSize={12}>
          <h3 id="#subscribe">Newsletter</h3>
          <FormMargins>
            <MailchimpForm />
          </FormMargins>
          {!filter && (
            <>
              <h3>Categories</h3>
              {categories.length
                ? categories.map(category => (
                    <p key={category.fieldValue}>
                      <Link
                        to={`/categories/${kebabCase(category.fieldValue)}/`}
                      >
                        {category.fieldValue}
                      </Link>
                    </p>
                  ))
                : "No categories yet"}
            </>
          )}
        </Column>
      </Row>
    </Wrapper>
  </Layout>
)

const PostPage = ({ filter, data }) => (
  <StaticQuery
    query={graphql`
      query CategoriesSummaryQuery {
        allMarkdownRemark(
          limit: 1000
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          group(field: frontmatter___category) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={categoryData => (
      <PostPageWithCategories
        postEdges={data.allMarkdownRemark.edges}
        categories={categoryData.allMarkdownRemark.group}
        filter={filter}
      />
    )}
  />
)

export default PostPage
