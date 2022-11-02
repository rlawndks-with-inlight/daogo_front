import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { zRoute } from '../routes/route';
const MetaTag = props => {
    const [title, setTitle] = useState("");
    const { pathname } = useLocation();
    useEffect(() => {
        for (var i = 0; i < zRoute.length; i++) {
            if (pathname.includes(zRoute[i].link.replace(":pk", "")) && zRoute[i].link != "/") {
                setTitle("daogo - 다오고 " + zRoute[i].title)
            }
        }
        if(pathname=="/"){
            setTitle("daogo - 다오고 ")
        }
    }, [pathname])
    return (
        <Helmet>
            <title>{props.title ? props.title : title}</title>
            <meta property="og:type" content="website" />
            <meta property="og:title" content={props.title ? props.title : title} />
            <meta property="og:site_name" content={props.title ? props.title : title} />
            {/* <meta property="og:url" content={"https://weare-first.com"} /> */}
            <meta name="twitter:title" content={props.title ? props.title : title} />
            {/* <link rel="canonical" href={"https://weare-first.com"} /> */}
        </Helmet>
    );
};

export default MetaTag;