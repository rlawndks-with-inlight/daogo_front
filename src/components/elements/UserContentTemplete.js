import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import $ from 'jquery'
import { useState } from "react";
import { MdNavigateNext } from 'react-icons/md'
import theme from "../../styles/theme";

export const WrappersStyle = styled.div`
position:relative;
display:flex;
flex-direction:column;
width:90%;
max-width:900px;
margin-top:8rem;
margin-left:auto;
margin-right:auto;
margin-bottom:6rem;
min-height:58vh;
@media screen and (max-width:1050px) { 
    margin-top:4rem;
}
`

export const Wrappers = (props) => {
    const [minHeight, setMinHeight] = useState(500);
    const { pathname } = useLocation();
    useEffect(() => {
        setMinHeight($(window).height() - 300);
    }, [pathname])
    useEffect(() => {

    }, [])
    return (
        <>
            <WrappersStyle className="wrappers" style={{ minHeight: `${minHeight}px`, marginTop:`${props.marginTop?props.marginTop:''}`, marginBottom:`${props.marginBottom?props.marginBottom:''}` }}>
                {props.children ?? ""}
            </WrappersStyle>
        </>
    )
}
export const TitleContainer = styled.div`
display:flex;
align-items:center;
margin-top:16px;
margin-bottom:8px;
justify-content:space-between;
`
export const TitleStyle = styled.div`
font-size:${props => props.theme.size.font2};
font-weight:normal;
margin-right:16px;
cursor:pointer;
`
export const Title = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <TitleContainer className="title" onClick={() => { navigate(props.link) }}>
                <TitleStyle>
                    {props?.children ?? ""}
                </TitleStyle>
                {props.not_arrow ?
                    <>
                        {props.textIcon ?
                            <div style={{ fontSize: theme.size.font4, color: theme.color.background1,fontWeight:'bold' }}>{props.textIcon}</div>
                            :
                            <>
                            </>
                        }
                    </>
                    :
                    <>
                        <MdNavigateNext style={{ fontSize: `25px` }} />
                    </>
                }

                {/* <hr className="bar"/> */}

            </TitleContainer>

        </>
    )
}
export const Content = styled.div`
margin:0 auto;
width:100%;
font-size:${props => props.theme.size.font3};
display:flex;
flex-direction:column;
font-weight:normal;
@media screen and (max-width:700px) { 
    
}
`
export const Img = styled.img`
width: 100%;
height:320px;
background:#fff;
background-size: cover;
background-repeat: no-repeat;
background-position: center center;
background-blend-mode: multiply;
@media screen and (max-width:1100px) {
    height: 28.8vw;
}
@media screen and (max-width:600px) {
    height: 52.2222222222vw;
}
`
export const Card = styled.div`
width: 48%; 
margin-bottom:16px;
background: ${props => props.theme.color.background3};
cursor:pointer;
@media screen and (max-width:600px) {
    width:100%;
}
`
export const WrapDiv = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
@media screen and (max-width:600px) { 
    display:none;
}
`
export const SliderDiv = styled.div`
display:none;
@media screen and (max-width:602px) { 
    display:flex;
}
`
export const ViewerContainer = styled.div`
max-width:900px;
margin:0 auto;
`
export const SelectType = styled.div`
display:flex;
width:100%;
z-index:5;
margin:16px 0;
`
export const OneThirdCard = styled.div`
width:28%;
background:#fff;
box-shadow:${props => props.theme.boxShadow};
padding:2%;
border-radius:8px;
height:24px;
display:flex;
align-items:center;
cursor:pointer;
@media screen and (max-width:350px) { 
    height:36px;
}
`
export const OneSecondCard = styled.div`
width:44.5%;
background:#fff;
box-shadow:${props => props.theme.boxShadow};
padding:2%;
border-radius:8px;
height:48px;
display:flex;
flex-direction:column;
cursor:pointer;
`
export const OneCard = styled.div`
background:#fff;
box-shadow:${props => props.theme.boxShadow};
padding:2%;
border-radius:8px;
display:flex;
flex-direction:column;
cursor:pointer;
height:48px;
width:${(props => props.width)??"100"}%;
@media screen and (max-width:400px) { 
    height:56px;
}
`
export const Row = styled.div`
display:flex;
justify-content: space-between;
margin: auto 0;
`
export const Col = styled.div`
display:flex;
flex-direction:column;
text-align:center;
`
export const Table = styled.table`
font-size:12px;
width:95%;
margin:0 auto;
text-align:center;
border-collapse: collapse;
color:${props => props.theme.color.font1};
background:#fff;
`
export const Tr = styled.tr`
width:100%;
height:26px;
border-bottom:1px solid ${props => props.theme.color.font4};
`
export const Td = styled.td`
border-bottom:1px solid ${props => props.theme.color.font4};
`