import React from 'react'
import ReactDisqusComments from 'react-disqus-comments'
import { StaticQuery, graphql } from 'gatsby'

const Disqus = ({ title, category, url }) => (
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
        category_id={category}
      />
    )}
  />
)

export default Disqus
