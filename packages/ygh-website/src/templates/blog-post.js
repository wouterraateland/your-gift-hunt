import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'

import Layout from 'components/Layout'
import Content, { HTMLContent } from 'components/Content'
import Wrapper from 'components/ui/Wrapper'
import MailchimpForm from 'components/MailchimpForm'
import Disqus from 'components/Disqus'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  category,
  author,
  date,
  title,
  helmet,
  slug,
}) => {
  const PostContent = contentComponent || Content

  return (
    <Wrapper medium>
      {helmet || null}
      <article>
        <small>
          <span>By </span>
          <Link to={`/authors/${kebabCase(author)}`}>{author}</Link>
          <span> in </span>
          <Link to={`/categorys/${kebabCase(category)}`}>{category}</Link>
          <span> &bull; </span>
          {date}
        </small>
        <h1>{title}</h1>
        <PostContent content={content} />
      </article>
      <hr />
      <h2>Newsletter</h2>
      <MailchimpForm />
      <hr />
      <Disqus
        title={title}
        url={slug}
        category={category}
      />
    </Wrapper>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  author: PropTypes.string,
  category: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  helmet: PropTypes.object,
  slug: PropTypes.string,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet
            titleTemplate="%s | Blog"
          >
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.frontmatter.description}`} />
          </Helmet>
        }
        slug={post.fields.slug}
        category={post.frontmatter.category}
        author={post.frontmatter.author}
        date={post.frontmatter.date}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        author
        category
      }
    }
  }
`
