const fs = require("fs")

const buffer = fs.readFileSync("./build/index.html")
const htmlString = buffer.toString()

const modifiedHtmlString = htmlString
  .replace(/href="\//g, 'href="/creator/')
  .replace(/src="\//g, 'src="/creator/')

fs.writeFileSync("./build/index.html", modifiedHtmlString)
