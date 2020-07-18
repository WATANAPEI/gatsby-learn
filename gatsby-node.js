const path = require("path")

exports.createPages = async({ graphql, actions, reporter}) => {
    const { createPage } = actions

    const blogresult = await graphql(`
        query {
            allContentfulBlogPost(sort: {fields: publishDate, order: DESC}) {
                edges {
                    node {
                        id
                        slug
                    }
                    previous {
                        id
                        slug
                    }
                    next {
                        id
                        slug
                    }
                }
            }
        }
    `)

    if (blogresult.errors) {
        reporter.panicOnBuild(`GraphQLのクエリでエラーが発生しました`)
        return
    }

    blogresult.data.allContentfulBlogPost.edges.forEach(({ node, next, previous }) => {
        createPage({
            path: `/blog/post/${node.slug}/`,
            component: path.resolve(`./src/templates/blogpost-template.js`),
            context: {
                id: node.id,
                next,
                previous
            },
        })
    })
}
