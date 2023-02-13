import styled from "styled-components";

const PageButton = styled.button`
border:1px solid #cccccc;
background:#fff;
color:#bbbbbb;
height:28px;
min-width:28px;
margin:1px;
cursor:pointer;
transition: 0.3s;
border-radius:4px;
&:hover{  
    background : ${props => props.theme.color.background1}22;
  }
}
`
export default PageButton;