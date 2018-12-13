import { kebabCase } from 'lodash'
import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Header, Wrapper, Row, Column } from 'components/ui'

import MailchimpForm from 'components/MailchimpForm'

import Layout from 'components/landing/Layout'
import PostList from 'components/landing/PostList'

const PostPageWithCategories = ({ postEdges, categories, filter }) => (
  <Layout dark>
    <Helmet titleTemplate="%s | Your Gift Hunt Blog">
      <title>{filter ? filter : 'All stories'}</title>
    </Helmet>
    <Header>
      <article>
        <h1>Blog</h1>
        <p>We write about new features, incredible puzzles and amazing gifts. <a href="#subscribe">Subscribe to our newsletter</a> for early access and our latest stories.</p>
      </article>
    </Header>
    <Wrapper xlarge>
      <Row>
        <Column size={8} mSize={12}>
          <h1>
            {filter
              ? <><Link to="/blog">All stories</Link> / {filter}</>
              : "All stories"
            }</h1>
          <PostList postEdges={postEdges} detailed />
        </Column>
        <Column size={4} mSize={12}>
          <h3 id="#subscribe">Newsletter</h3>
          <MailchimpForm />
          {!filter && (
            <>
              <h3>Categories</h3>
              {categories.map(category => (
                <p key={category.fieldValue}>
                  <Link to={`/categories/${kebabCase(category.fieldValue)}/`}>
                    {category.fieldValue}
                  </Link>
                </p>
              ))}
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
          filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
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
