const SparkPost = require("sparkpost")
const client = new SparkPost(process.env.SPARKPOST_API_KEY, {
  origin: "https://api.eu.sparkpost.com:443"
})

exports.handler = async (event, context) => {
  console.log(event, context)

  try {
    const data = await client.transmissions.send({
      content: {
        from: "info@yourgifthunt.com",
        subject: "Hello, World!",
        html: "<html><body><p>My cool email.</p></body></html>"
      },
      recipients: [{ address: "wouterraateland@gmail.com" }]
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "ok", ...data })
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
