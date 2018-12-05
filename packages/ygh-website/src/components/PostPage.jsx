import 'utils/RHLFix'

import { kebabCase } from 'lodash'
import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

import Layout from 'components/Layout'
import Wrapper from 'components/ui/Wrapper'
import Column from 'components/ui/Column'
import Row from 'components/ui/Row'

import MailchimpForm from 'components/MailchimpForm'
import PostList from 'components/PostList'

const PostPageWithCategories = ({ postEdges, categories, filter }) => (
  <Layout>
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
          <p><strong>Newsletter</strong></p>
          <MailchimpForm />
          {!filter && (
            <>
              <p><strong>Categories</strong></p>
              {categories.map(category => (
                <h3 key={category.fieldValue}>
                  <Link to={`/categories/${kebabCase(category.fieldValue)}/`}>
                    {category.fieldValue}
                  </Link>
                </h3>
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
