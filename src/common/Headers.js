import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import '../styles/style.css'
import { logoSrc } from '../data/Data';
import { AiOutlineBell, AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai'
import { zBottomMenu } from '../data/Data';
import theme from '../styles/theme';
import $ from 'jquery';
import { GiHamburgerMenu } from 'react-icons/gi'
import {BsFillShareFill}from 'react-icons/bs'
import { CSSTransition } from "react-transition-group";
const Header = styled.header`
position:fixed;
height:6rem;
width:100%;
top:0;
z-index:10;
background:#fff;
box-shadow: 5px 10px 10px rgb(0 0 0 / 3%);
@media screen and (max-width:1050px) { 
  box-shadow:none;
  height:3.5rem;
}
`

const HeaderMenuContainer = styled.div`
width:90%;
position:relative;
margin:0 auto;
display:flex;
align-items:center;
justify-content: space-between;
`
const HeaderMenuList = styled.div`
display: flex;
margin: 2rem 0;
height: 2rem;
@media screen and (max-width:1050px) { 
  display:none;
  opacity:0;
  left:-21vw;
  flex-direction:column;
  position:absolute;
  top:3.2rem;
  background:#fff;
  height:100vh;
  margin:0;
  box-shadow:5px 8px 12px #00000012;
}
`

const HeaderMenu = styled.div`
text-align:center;
font-size:${props => props.theme.size.font3};
padding:0.3rem;
margin-right:0.5rem;
font-weight:bold;
cursor:pointer;
&:hover{  
  color:${(props) => props.theme.color.background1};
}
@media screen and (max-width:1600px) { 
  font-size:${props => props.theme.size.font4};
  margin-right:0.3rem;
}
@media screen and (max-width:1350px) { 
  font-size:${props => props.theme.size.font5};
  margin-right:0.2rem;
}
@media screen and (max-width:1050px) { 
  padding:1rem 1.5rem;
}
`
const HeaderLogoContainer = styled.div`
position: absolute; 
right: 48%;
top: 0.5rem;
@media screen and (max-width:1250px) {
  right: 40%;
}
@media screen and (max-width:1050px) {
  position: relative; 
  right: 0;
  top: 0;
}
`
const HeaderLogo = styled.img`
height: 5rem;
@media screen and (max-width:1050px) { 
  height: 2.5rem;
  margin-top: 0.25rem;
}

`

const Headers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [type, setType] = useState(1)
  const [isModal, setIsModal] = useState(false);
  const [display, setDisplay] = useState('flex');
  const [isPost, setIsPost] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState('none')
  const [isAlarm, setIsAlarm] = useState(false);

  useEffect(() => {


    if (location.pathname.substring(0, 6) == '/post/' || location.pathname.substring(0, 7) == '/video/' || location.pathname == '/appsetting') {
      setIsPost(true);
    } else {
      setIsPost(false)
    }
    if (location.pathname.includes('/manager')) {
      setDisplay('none');
      $('html').addClass('show-scrollbar');
    } else {
      setDisplay('flex');
    }
    if (localStorage.getItem('dark_mode')) {
      $('body').addClass("dark-mode");
      $('p').addClass("dark-mode");
      $('.toastui-editor-contents p').addClass("dark-mode");
      $('.menu-container').addClass("dark-mode");
      $('.menu-container').css("border-top", "none");
      $('.header').addClass("dark-mode");
      $('.select-type').addClass("dark-mode");
      $('.footer').addClass("dark-mode");
    } else {

    }
  }, [location])
  const onChangeMenuDisplay = async () =>{
    if(menuDisplay=='flex'){
      $('.header-menu-list').animate({left:'-21vw',opacity:'0'},300);
      if(window.innerWidth<=1050){
        await new Promise((r) => setTimeout(r, 300));
        $('.header-menu-list').css("display","none");
        
      }
    }else{
      $('.header-menu-list').animate({left:'-5vw',opacity:'1'},300);
      if(window.innerWidth<=1050){
        $('.header-menu-list').css("display","flex");
      }
    }

    setMenuDisplay(menuDisplay=='flex'?'none':'flex');
    
  }
  setInterval(() => {
    if (localStorage.getItem('is_alarm') == '1') {
      setIsAlarm(true);
    }
  }, 1500);
  
  return (
    <>

      <Header style={{ display: `${display}` }} className='header'>
        <HeaderMenuContainer>{/* pc */}
          <GiHamburgerMenu className='hamburgur' style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} onClick={onChangeMenuDisplay}/>
          
          <HeaderMenuList display={menuDisplay} className="header-menu-list">
            {zBottomMenu.map((item, idx) => (
              <>
                <HeaderMenu key={idx} onClick={() => { navigate(item.link) }} style={{ color: `${item.allowList.includes(location.pathname) ? theme.color.background1 : ''}` }}>{item.name}</HeaderMenu>
              </>
            ))}
          </HeaderMenuList>
          
          <HeaderLogoContainer>
            <HeaderLogo src={logoSrc} alt="홈으로" onClick={() => { navigate('/') }} />
          </HeaderLogoContainer>
            <BsFillShareFill  style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
        </HeaderMenuContainer>
      </Header>
    </>
  )
}
export default Headers;