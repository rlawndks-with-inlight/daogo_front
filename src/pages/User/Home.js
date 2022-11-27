import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Wrappers, Title, Content, Img, WrapDiv, SliderDiv, OneCard, OneThirdCard, Row, Col } from '../../components/elements/UserContentTemplete';
import Loading from '../../components/Loading';
import theme from '../../styles/theme';
import { commarNumber } from '../../functions/utils';
import defaultProfile from '../../assets/images/icon/default-profile.png'
import albumsOutline from '../../assets/images/icon/home/albums-outline.svg';
import box from '../../assets/images/icon/home/box.svg';
import cart from '../../assets/images/icon/home/cart.svg';
import downloadOutline from '../../assets/images/icon/home/download-outline.svg';
import hamburger from '../../assets/images/icon/home/hamburger.svg';
import kakaoTalk from '../../assets/images/icon/home/kakao-talk.svg';
import myPage from '../../assets/images/icon/home/my-page.svg';
import pigBank from '../../assets/images/icon/home/pig-bank.svg';
import point from '../../assets/images/icon/home/point.svg';
import share from '../../assets/images/icon/home/share.svg';
import withdrawRequest from '../../assets/images/icon/home/withdraw-request.svg';
import yellowDot from '../../assets/images/icon/home/yellow-dot.svg';
import logoWhite from '../../assets/images/icon/logo-white.svg'
import axios from 'axios';
import LoadingText from '../../components/LoadingText';
import { backUrl } from '../../data/ContentData';


const BottomMenuText = styled.div`
font-size: ${theme.size.font6};
color: ${theme.color.font2};
font-weight: bold;
margin: auto auto auto 2rem; 
width: 70%; 
text-align: left;
@media screen and (max-width:700px) { 
margin: auto auto auto 0.5rem; 
}
`
const HeaderContent = styled.div`
font-size: ${props => props.theme.size.font4};
font-weight: bold;
margin: 0 auto auto auto;
align-items: center;
display: flex;
flex-direction: column;
`
const Profile = (props) => {
    return (
        <>

        </>
    )
}

const WhiteButton = (props) => {
    let { title, content, unit, bottom_content, width, total_occurrence } = props;
    return (
        <>
            <OneCard style={{ marginBottom: '12px', width: `${width ? width : ''}%` }}>
                <div style={{ display: 'flex' }}>
                    <img src={yellowDot} />
                    <div style={{ marginLeft: '10px', fontSize: theme.size.font5, color: theme.color.font3, fontWeight: 'bold' }}>{title}</div>
                </div>
                <div style={{ fontSize: theme.size.font4, margin: `${width ? '0.15rem 1rem 0.15rem auto' : '0.15rem 50% 0.15rem auto'}`, display: 'flex', alignItems: 'center' }}><div>{content ? commarNumber(content) : <LoadingText width={15} />}</div><div style={{ marginLeft: '8px' }}>{unit}</div></div>
                <div style={{ fontSize: theme.size.font6, margin: '0 2rem 0 auto', display: 'flex', alignItems: 'center', height: '12px' }}>{total_occurrence ?
                    <>
                        <div>Total occurrence</div>
                        <div style={{ marginLeft: '12px' }}>{total_occurrence > 0 ? total_occurrence.toFixed(2) : <LoadingText width={12} />}</div>
                    </>
                    :
                    <>
                    </>
                }</div>
            </OneCard>
        </>
    )
}
const GreenButton = (props) => {
    let { title, content, bottom_content, width, img } = props;
    return (
        <>
            <OneCard style={{ marginBottom: '12px', width: `${width ? width : ''}%`, background: theme.color.background1 }}>
                <img src={img} style={{ height: '100%', width: 'auto', margin: 'auto' }} />
            </OneCard>
        </>
    )
}
const SmallButton = (props) => {
    return (
        <>
        </>
    )
}
const NoticeContent = (props) => {
    return (
        <>
        </>
    )
}
const Home = () => {
    const navigate = useNavigate();
    const [bottomMenuList, setBottomMenuList] = useState([])
    const [noticeList, setNoticeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({});

    let bottom_menu_list = [[{ title: "출금신청", link: "/withdrawrequest", icon: withdrawRequest }, { title: "출금내역", link: "/withdraw/history", icon: albumsOutline }, { title: "이체하기", link: "/gift", icon: downloadOutline }],
    [{ title: "ESGW POINT 구매", link: "/buyesgwpoint", icon: point }, { title: "청약예치금", link: "/home", icon: pigBank }, { title: "쇼핑몰", link: "/shoppingmall/outlet", icon: cart }],
    [{ title: "랜덤박스변환", link: "/randombox/register", icon: box }, { title: "문의하기", link: 'kakaotalk', icon: kakaoTalk }, { title: "마이페이지", link: "/mypage", icon: myPage }]];

    useEffect(() => {
        async function fetchPosts() {
            const { data: response } = await axios.get('/api/gethomecontent');
            console.log(response)
            console.log(response.data.notice)
            if (response?.result > 0) {
                setPost(response?.data);
            } else {
                alert(response?.message);
                if (response?.result === -150) {
                    navigate('/login');
                }
            }
        }
        fetchPosts();
    }, [])

    const onClickLink = (link) => {
        if (link == 'kakaotalk') {
            //window.location.href = 'kakaoopen://join?l=_xgCPzxj&r=EW'
            window.location.href = 'https://pf.kakao.com/_xgCPzxj'
        } else {
            navigate(link);
        }
    }
    return (
        <>
            <Wrappers className='wrappers'>
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <Content style={{ marginBottom: '12px' }}>
                            <Row style={{ justifyContent: 'flex-start' }}>
                                <img src={post?.auth?.profile_img ? backUrl + post?.auth?.profile_img : defaultProfile} style={{ width: '34px', height: '34px', borderRadius: '50%' }} />
                                <Col style={{ marginLeft: '8px', textAlign: 'left', height: '34px' }}>
                                    <div style={{ fontSize: theme.size.font3, color: theme.color.font1, fontWeight: 'bold' }}>Hi, {post?.auth?.name}</div>
                                    <div style={{ fontSize: theme.size.font6, color: theme.color.background1, marginTop: '4px' }}>{`민들레플랫폼 / 회원 / 입금코드 ${commarNumber(13741)}`}</div>
                                </Col>
                            </Row>
                        </Content>

                        <Content>
                            <OneCard style={{ marginBottom: '12px', background: theme.color.background1 }}>
                                <Row style={{ margin: 'auto 0', height: '85%', color: '#fff' }}>
                                    <Col style={{ margin: '0 auto', width: '25%', display: 'flex', flexDirection: 'column' }}>
                                        <HeaderContent><div>{post?.header?.purchase_package ?? <LoadingText color={"#fff"} width={15} />}</div></HeaderContent>
                                        <div style={{ fontSize: theme.size.font6, margin: 'auto auto 0 auto' }}>{"구매 패키지"}</div>
                                    </Col>
                                    <Col style={{ margin: '0 auto', width: '25%', borderLeft: '1px solid #fff' }}>
                                        <HeaderContent><div>{post?.header?.discount_percent ?? <LoadingText color={"#fff"} width={15} />}</div></HeaderContent>
                                        <div style={{ fontSize: theme.size.font6, margin: 'auto auto 0 auto' }}>{"소개 수익 / 할인"}</div>
                                    </Col>
                                    <Col style={{ margin: '0 auto', width: '25%', borderLeft: '1px solid #fff' }}>
                                        <HeaderContent><div>{post?.header?.rollup_bonus ?? <LoadingText color={"#fff"} width={15} />}</div></HeaderContent>
                                        <div style={{ fontSize: theme.size.font6, margin: 'auto auto 0 auto' }}>{"롤업 보너스"}</div>
                                    </Col>
                                    <Col style={{ margin: '0 auto', width: '25%', borderLeft: '1px solid #fff' }}>
                                        <HeaderContent><div>{post?.header?.my_partner ?? <LoadingText color={"#fff"} width={15} />}</div></HeaderContent>
                                        <div style={{ fontSize: theme.size.font6, margin: 'auto auto 0 auto' }}>{"내 파트너"}</div>
                                    </Col>
                                </Row>
                            </OneCard>
                        </Content>
                        <Content>
                            <WhiteButton title={'보유 RANDOM BOX POINT'} content={post?.randombox_point} unit={`STAR`} />
                            <WhiteButton title={'보유 STAR'} content={post?.star} total_occurrence={post?.star_total ?? -1} unit={`STAR`} />
                            <WhiteButton title={'보유 POINT'} content={post?.point} total_occurrence={post?.point_total ?? -1} unit={`POINT`} />
                            <Row>
                                <WhiteButton width={45} title={'보유 ESGW POINT'} content={post?.esgw_point} unit={`ESGW`} />
                                <GreenButton width={45} img={logoWhite} />
                            </Row>
                        </Content>
                        <Content style={{ borderBottom: `1px solid #dddddd`, width: '86%' }} />
                        <Content style={{ marginTop: '12px' }}>
                            {bottom_menu_list.map((item, index) => (
                                <>
                                    <Row style={{ marginBottom: '12px' }}>
                                        {item.map((itm, idx) => (
                                            <>
                                                <OneThirdCard onClick={() => { onClickLink(itm.link) }}>
                                                    <div style={{ width: '30%', textAlign: 'end', margin: 'auto', display: 'flex' }}>
                                                        <img src={itm.icon} style={{ height: '20px', margin: '0 0 0 auto' }} />
                                                    </div>
                                                    <BottomMenuText>{itm.title}</BottomMenuText>
                                                </OneThirdCard>
                                            </>
                                        ))}
                                    </Row>
                                </>
                            ))}
                        </Content>
                        <Content>
                            <Title not_arrow={true} textIcon={'Read more'}>공지사항</Title>
                            {post?.notice && post?.notice?.map((item, index) => (
                                <>
                                    <OneCard style={{ marginBottom: '12px' }}>
                                        <Row>
                                            <div style={{ fontSize: theme.size.font5, color: theme.color.background1, textAlign: 'center', width: '15%', margin: 'auto' }}>필독</div>
                                            <Col style={{ width: '85%', textAlign: 'left' }}>
                                                <div style={{ color: theme.color.background1, fontWeight: 'bold', fontSize: theme.size.font5 }}>{item.title}</div>
                                                <div style={{ fontSize: theme.size.font6, marginTop: '8px' }}>{`${item.date} / ${commarNumber(item.views ?? 0)} Views`}</div>
                                            </Col>
                                        </Row>
                                    </OneCard>
                                </>
                            ))}
                        </Content>
                    </>}


            </Wrappers>
        </>
    )
}
export default Home;