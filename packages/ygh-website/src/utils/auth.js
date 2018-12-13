import GoTrue from "gotrue-js"

const auth = new GoTrue({
  APIUrl: "https://yourgifthunt.com/.netlify/identity",
  setCookie: false
})

export default auth
