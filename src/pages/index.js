import React, { useState } from "react"
import Video from "../components/Video"
import Layout from "../components/layout"
import SEO from "../components/seo"
import StartForm from "./../components/startForm"

const IndexPage = () => {
  const [token, setToken] = useState(false)
  return (
    <Layout>
      <SEO title="Home" />
      {!token ? (
        <StartForm storeToken={setToken}></StartForm>
      ) : (
        <Video token={token} />
      )}
      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  )
}

export default IndexPage
