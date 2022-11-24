import styled from "styled-components";

export const Wrappers = styled.div`
position:relative;
display:flex;
flex-direction:column;
width:100%;
max-width:900px;

margin:0 auto;
background:#fff;
margin-top:4rem;
box-shadow: 0 -4px 16px #cccccc;
@media screen and (max-width:900px) { 
    margin-top:3.5rem;
}
`