import React from "react"
import Helmet from "react-helmet"

const SEO = ({ config, postNode }) => {
  const url = postNode ? postNode.fields.slug : config.siteUrl

  const title = postNode ? postNode.frontmatter.title : config.siteTitle

  const description = postNode
    ? postNode.frontmatter.description
      ? postNode.frontmatter.description
      : postNode.excerpt
    : config.siteDescription

  const image =
    postNode && postNode.frontmatter.cover
      ? postNode.frontmatter.cover
      : `${config.siteUrl}${config.siteImage}`

  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: config.siteUrl,
      name: config.siteTitle,
      alternateName: config.siteTitleAlt,
      image: `${config.siteUrl}${config.siteImage}`
    }
  ]
  if (postNode) {
    schemaOrgJSONLD.push(
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": url,
              name: title,
              image: image
            }
          }
        ]
      },
      {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        url: config.siteUrl,
        name: title,
        alternateName: config.siteTitleAlt,
        headline: title,
        image: {
          "@type": "ImageObject",
          url: image
        },
        description
      }
    )
  }

  return (
    <Helmet>
      <html lang="en" />
      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#ffd65a"
      />
      <meta name="msapplication-TileColor" content="#000" />
      <meta name="theme-color" content="#000" />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      {postNode ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta
        property="fb:app_id"
        content={config.siteFBAppID ? config.siteFBAppID : ""}
      />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:creator"
        content={config.userTwitter ? config.userTwitter : ""}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO
