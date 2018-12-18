import GoTrue from "gotrue-js"

const auth = new GoTrue({
  APIUrl: "https://yourgifthunt.com/.netlify/identity",
  setCookie: true
})

export default auth
