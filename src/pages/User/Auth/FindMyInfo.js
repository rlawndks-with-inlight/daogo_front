import { useEffect, useState } from "react";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import styled from "styled-components";
import theme from "../../../styles/theme";
import FindMyInfoCard from "../../../components/FindMyInfoCard";
import { logoSrc } from "../../../data/ContentData";
const FindMyInfo = () =>{
    
    return (
        <>
        <Wrappers marginTop={'0px'} marginBottom={'32px'}>
        <img src={logoSrc} style={{width:'150px',margin:'2rem auto 1rem auto'}} />

            <FindMyInfoCard/>
        </Wrappers>
        </>
    )
}
export default FindMyInfo