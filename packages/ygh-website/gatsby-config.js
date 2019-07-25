const config = require("./site-config")
const urljoin = require("url-join")
const dotenv = require("dotenv")

const activeEnv =
  process.env.ACTIVE_ENV || process.env.NODE_ENV || "development"

dotenv.config({ path: `.env` })
dotenv.config({ path: `.env.${activeEnv}` })

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    siteDescription: config.siteDescription,
    siteFBAppID: config.siteFBAppID,
    siteImage: config.siteImage,
    siteTitle: config.siteTitle,
    siteTitleAlt: config.siteTitleAlt,
    siteUrl: urljoin(config.siteUrl, config.pathPrefix),
    pathPrefix: config.pathPrefix,
    userTwitter: config.userTwitter,
    disqusShortname: config.disqusShortname,
    rssMetadata: {
      site_url: urljoin(config.siteUrl, config.pathPrefix),
      feed_url: urljoin(config.siteUrl, config.pathPrefix, config.siteRss),
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${urljoin(
        config.siteUrl,
        config.pathPrefix
      )}/android-chrome-512x512.png`,
      copyright: config.copyright
    }
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/favicons`,
        name: "favicons"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/images`,
        name: "images"
      }
    },
    {
      resolve: "gatsby-source-shopify",
      options: {
        shopName: process.env.SHOPIFY_STOREFRONT_SHOP_NAME,
        accessToken: process.env.SHOPIFY_STOREFRONT_API_KEY,
        verbose: activeEnv === "development"
      }
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        content: `${__dirname}/content`,
        components: `${__dirname}/src/components`,
        containers: `${__dirname}/src/containers`,
        contexts: `${__dirname}/src/contexts`,
        hooks: `${__dirname}/src/hooks`,
        images: `${__dirname}/src/images`,
        layout: `${__dirname}/src/layout`,
        templates: `${__dirname}/src/templates`,
        utils: `${__dirname}/src/utils`,
        "your-gift-hunt": `${__dirname}/src/your-gift-hunt`
      }
    },
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
        omitGoogleFont: true
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads"
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048
            }
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static"
            }
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: config.googleAnalyticsID
      }
    },
    {
      resolve: "gatsby-plugin-create-client-paths",
      options: { prefixes: ["/creator/*"] }
    },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: "minimal-ui",
        icons: [
          {
            src: "/favicons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/favicons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata
          ret.allMarkdownRemark = ref.query.allMarkdownRemark
          ret.generator = "GatsbyJS"
          return ret
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                copyright
              }
            }
          }
        }
      `,
        feeds: [
          {
            serialize(ctx) {
              const { rssMetadata } = ctx.query.site.siteMetadata
              return ctx.query.allMarkdownRemark.edges.map(edge => ({
                categories: edge.node.frontmatter.tags,
                date: edge.node.frontmatter.date,
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                author: "Your Gift Hunt", // Temporary
                url: rssMetadata.site_url + edge.node.fields.slug,
                guid: rssMetadata.site_url + edge.node.fields.slug,
                custom_elements: [{ "content:encoded": edge.node.html }]
              }))
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    timeToRead
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      category
                      tags
                    }
                  }
                }
              }
            }
          `,
            output: config.siteRss
          }
        ]
      }
    },
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ]
}
