import React from "react"
import PropTypes from "prop-types"
import { kebabCase } from "lodash"
import Helmet from "react-helmet"
import { graphql, Link } from "gatsby"
import urljoin from "url-join"

import Content, { HTMLContent } from "components/Content"
import MailchimpForm from "components/MailchimpForm"
import { Wrapper, Article } from "ygh-ui"

import Layout from "components/Layout"
import Disqus from "components/Disqus"

export const BlogPostTemplate = ({
  content,
  contentComponent,
  category,
  author,
  date,
  title,
  helmet,
  slug
}) => {
  const PostContent = contentComponent || Content

  return (
    <Wrapper medium>
      {helmet || null}
      <Article>
        <small>
          <span>By </span>
          <Link to={`/authors/${kebabCase(author)}`}>{author}</Link>
          <span> in </span>
          <Link to={`/categories/${kebabCase(category)}`}>{category}</Link>
          <span> &bull; </span>
          {date}
        </small>
        <h1>{title}</h1>
        <PostContent content={content} />
      </Article>
      <hr />
      <h2>Newsletter</h2>
      <p>
        Liked this story? Subscribe to our newsletter for early access and our
        latest stories.
      </p>
      <MailchimpForm />
      <hr />
      <Disqus title={title} url={slug} />
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
  slug: PropTypes.string
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post, site } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Your Gift Hunt Blog">
            <title>{post.frontmatter.title}</title>
            <meta
              name="description"
              content={
                post.frontmatter.description
                  ? post.frontmatter.description
                  : post.excerpt
              }
            />
          </Helmet>
        }
        slug={urljoin(site.siteMetadata.siteUrl, post.fields.slug)}
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
    markdownRemark: PropTypes.object
  })
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
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
