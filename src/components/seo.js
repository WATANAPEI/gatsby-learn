import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

export default props => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    description
                    lang
                    title
                    siteUrl
                }
            }
        }
    `)

    const title = props.pagetitle
        ? `${props.pagetitle} | ${data.site.siteMetadata.title}`
        :  data.site.siteMetadata.title
    const description = props.pagedesc || data.site.siteMetadata.description
    const url = props.pagepath
        ? `${data.site.siteMetadata.siteUrl}${props.pagepath}`
        : data.site.siteMetadata.siteUrl
    const imgurl = props.pageimg
        ? `${data.site.siteMetadata.siteUrl}${props.pageimg}`
        : `${data.site.siteMetadata.siteUrl}/thumb.jpg`

    const imgw = props.pageimgw || 1280
    const imgh = props.pageimgh || 640

    return (
        <Helmet>
            <html lang={data.site.siteMetadata.lang} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta property="og:image" content={imgurl} />
            <meta property="og:image:width" content={imgw} />
            <meta property="og:image:height" content={imgh} />

            <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
    )

}
