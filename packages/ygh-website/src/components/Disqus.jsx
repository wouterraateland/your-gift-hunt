import React from 'react'
import ReactDisqusComments from 'react-disqus-comments'
import urljoin from 'url-join'

const Disqus = ({ postNode, config }) => {
  if (!config.disqusShortname) {
    return null
  }

  const post = postNode.frontmatter
  const url = urljoin(
    config.siteUrl,
    config.pathPrefix,
    postNode.fields.slug
  )

  return (
    <ReactDisqusComments
      shortname={config.disqusShortname}
      identifier={post.title}
      title={post.title}
      url={url}
      category_id={post.category_id}
      onNewComment={this.notifyAboutComment}
    />
  )
}

export default Disqus
