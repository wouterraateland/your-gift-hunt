const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              category
              author
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      const frontmatter = edge.node.frontmatter
      createPage({
        path: edge.node.fields.slug,
        tags: frontmatter.tags,
        category: frontmatter.category,
        author: frontmatter.author,
        component: path.resolve(
          `src/templates/${String(frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Tag pages:
    // Iterate through each post, putting all found tags into `tags`
    // Eliminate duplicate tags
    const tags = _.uniq(posts.reduce((tags, edge) =>
      _.get(edge, `node.frontmatter.tags`)
        ? [...tags, ...edge.node.frontmatter.tags]
        : tags
      , []))

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })

    // Category pages:
    // Iterate through each post, putting all found categories into `categories`
    // Eliminate duplicate categories
    const categories = _.uniq(posts.reduce((categories, edge) =>
      _.get(edge, `node.frontmatter.category`)
        ? [...categories, edge.node.frontmatter.category]
        : categories
      , []))

    // Make category pages
    categories.forEach(category => {
      const categoryPath = `/categories/${_.kebabCase(category)}/`

      createPage({
        path: categoryPath,
        component: path.resolve(`src/templates/categories.js`),
        context: {
          category,
        },
      })
    })

    // Author pages:
    // Iterate through each post, putting all found authors into `authors`
    // Eliminate duplicate authors
    const authors = _.uniq(posts.reduce((authors, edge) =>
      _.get(edge, `node.frontmatter.category`)
        ? [...authors, edge.node.frontmatter.author]
        : authors
      , []))

    // Make author pages
    authors.forEach(author => {
      const authorPath = `/authors/${_.kebabCase(author)}/`

      createPage({
        path: authorPath,
        component: path.resolve(`src/templates/authors.js`),
        context: {
          author,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
