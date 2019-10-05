const fs = require("fs")

const buffer = fs.readFileSync("./build/index.html")
const htmlString = buffer.toString()

const modifiedHtmlString = htmlString
  .replace(/href="\//g, 'href="/player/')
  .replace(/src="\//g, 'src="/player/')

fs.writeFileSync("./build/index.html", modifiedHtmlString)
