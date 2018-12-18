import React from 'react'
import ReactDisqusComments from 'react-disqus-comments'
import { StaticQuery, graphql } from 'gatsby'

const Disqus = ({
  title,
  categoryId = process.env.DISQUS_DEFAULT_CATEGORY_ID,
  url
}) => (
  <StaticQuery
    query={graphql`
      query DisqusQuery {
        site {
          siteMetadata {
            disqusShortname
          }
        }
      }
    `}
    render={data => (
      <ReactDisqusComments
        shortname={data.site.siteMetadata.disqusShortname}
        identifier={title}
        title={title}
        url={url}
        category_id={categoryId}
      />
    )}
  />
)

export default Disqus
