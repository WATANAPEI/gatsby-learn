import React from "react"
import {graphql, Link} from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

import SEO from "../components/seo"

export default ({ data, location }) => (
    <Layout>
        <SEO
            pagetitle="ブログ"
            pagedesc="ESSENTIALSのブログです"
            pagepath={location.pathname}
        />
        <section className="content bloglist">
        <div className="container">
            <h1 className="bar">RECENT POSTS</h1>
                {data.allContentfulBlogPost.edges.map(( { node }) => (
                    <div className="posts">
                        <article className="post" key={node.id}>
                            <Link to={`/blog/post/${node.slug}/`}>
                            <figure>
                                <Img
                                    fluid={node.eyecatch.fluid}
                                    alt={node.eyecatch.description}
                                    style={{ height: "100%" }}
                                />
                            </figure>
                            <h3>{node.title}</h3>
                            </Link>
                        </article>
                    </div>
                ))}
        </div>
        </section>
    </Layout>
)

export const query = graphql`
    query($skip: Int!, $limit: Int!) {
        allContentfulBlogPost(
            sort: {fields: publishDate, order: DESC}
            skip: $skip
            limit: $limit
        ) {
            edges {
                node {
                    title
                    id
                    slug
                    eyecatch {
                        fluid(maxWidth: 500) {
                            ...GatsbyContentfulFluid_withWebp
                        }
                    description
                    }
                }
            }
        }
    }
`
