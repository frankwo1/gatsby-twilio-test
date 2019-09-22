import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import StartForm from "./../components/startForm"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <StartForm></StartForm>
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
)

export default IndexPage
