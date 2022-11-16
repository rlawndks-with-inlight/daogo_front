import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { zUserRoute } from '../routes/route';
const MetaTag = props => {
    const [title, setTitle] = useState("");
    const { pathname } = useLocation();
    useEffect(() => {
        for (var i = 0; i < zUserRoute.length; i++) {
            if (pathname.includes(zUserRoute[i].link.replace(":pk", "")) && zUserRoute[i].link != "/") {
                setTitle("daogo - 다오고 " + zUserRoute[i].title)
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
           <meta property="og:url" content={"https://daogo.co.kr"} /> 
            <meta name="twitter:title" content={props.title ? props.title : title} />
             <link rel="canonical" href={"https://daogo.co.kr"} /> 
        </Helmet>
    );
};

export default MetaTag;