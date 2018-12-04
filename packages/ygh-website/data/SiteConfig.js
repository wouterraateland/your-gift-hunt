module.exports = {
  siteTitle: "Your Gift Hunt", // Site title.
  siteTitleShort: "Your Gift Hunt", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Your Gift Hunt", // Alternative site title for SEO.
  siteLogo: "/logos/logo-512x512.png", // Logo used for SEO and manifest.
  siteUrl: "https://yourgifthunt.com", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "Make your gift a unique adventure with a personal scavenger gift hunt.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "314877482688772", // FB Application ID for using app insights
  googleAnalyticsID: "UA-130420308-1", // GA tracking ID.
  disqusShortname: "your-gift-hunt", // Disqus shortname.
  postDefaultCategoryID: "Tech", // Default category for posts.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD-MM-YYYY", // Date format for display.
  userName: "Wouter", // Username to display in the author segment.
  userTwitter: "", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "The Netherlands", // User location to display in the author segment.
  userAvatar: "https://secure.gravatar.com/avatar/5c2fdb585afc17c20db6841c03f06f2c?size=150", // User avatar to display in the author segment.
  userDescription: "", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    // {
    //   label: "GitHub",
    //   url: "https://github.com/Vagr9K/gatsby-advanced-starter",
    //   iconClassName: "fa fa-github"
    // },
    // {
    //   label: "Twitter",
    //   url: "https://twitter.com/Vagr9K",
    //   iconClassName: "fa fa-twitter"
    // },
    // {
    //   label: "Email",
    //   url: "mailto:vagr9k@gmail.com",
    //   iconClassName: "fa fa-envelope"
    // }
  ],
  copyright: `Copyright © ${new Date().getUTCFullYear()}. Your Gift Hunt`, // Copyright string for the footer of the website and RSS feed.
  themeColor: "#ffcc66", // Used for setting manifest and progress theme colors.
  backgroundColor: "#ffffff" // Used for setting manifest background color.
};
