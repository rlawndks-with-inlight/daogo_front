import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Wrappers, Title, Content, Img, WrapDiv, SliderDiv } from '../../components/elements/UserContentTemplete';
import Loading from '../../components/Loading';
import theme from '../../styles/theme';
import { commarNumber } from '../../functions/utils';
import defaultProfile from '../../assets/images/icon/default-profile.png'
import albumsOutline from '../../assets/images/icon/home/albums-outline.svg';
import box from '../../assets/images/icon/home/box.png';
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
import logoWhite from '../../assets/images/icon/logo-white.png'
const Row = styled.div`
display:flex;
justify-content: space-between;
margin: auto 0;
`
const Col = styled.div`
display:flex;
flex-direction:column;
text-align:center;
`
const OneThirdCard = styled.div`
width:28%;
background:#fff;
box-shadow:${props => props.theme.boxShadow};
padding:2%;
border-radius:8px;
height:24px;
display:flex;
align-items:center;
cursor:pointer;
`
const OneSecondCard = styled.div`
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
const Card = styled.div`
background:#fff;
box-shadow:${props => props.theme.boxShadow};
padding:2%;
border-radius:8px;
display:flex;
flex-direction:column;
cursor:pointer;
height:48px;
`
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
const Profile = (props) => {
    return (
        <>

        </>
    )
}

const WhiteButton = (props) => {
    let { title, content, bottom_content, width, total_occurrence } = props;
    return (
        <>
            <Card style={{ marginBottom: '12px', width: `${width ? width : ''}%` }}>
                <div style={{ display: 'flex' }}>
                    <img src={yellowDot} />
                    <div style={{ marginLeft: '10px', fontSize: theme.size.font5, color: theme.color.font3, fontWeight: 'bold' }}>{title}</div>
                </div>
                <div style={{ fontSize: theme.size.font4, margin: `${width ? '0.15rem 1rem 0.15rem auto' : '0.15rem 50% 0.15rem auto'}` }}>{content}</div>
                <div style={{ fontSize: theme.size.font6, margin: '0 2rem 0 auto', display: 'flex', alignItems: 'center', height: '12px' }}>{total_occurrence ?
                    <>
                        <div>Total occurrence</div>
                        <div style={{ marginLeft: '12px' }}>{total_occurrence.toFixed(2)}</div>
                    </>
                    :
                    <>
                    </>
                }</div>
            </Card>
        </>
    )
}
const GreenButton = (props) => {
    let { title, content, bottom_content, width, img } = props;
    return (
        <>
            <Card style={{ marginBottom: '12px', width: `${width ? width : ''}%`, background: theme.color.background1 }}>
                <img src={img} style={{ height: '100%', width: 'auto', margin: 'auto' }} />
            </Card>
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
    const [headerList, setHeaderList] = useState([]);
    const [topMenuList, setTopMenuList] = useState([])
    const [bottomMenuList, setBottomMenuList] = useState([])
    const [noticeList, setNoticeList] = useState([]);
    const [loading, setLoading] = useState(false);
    let bottom_menu_list = [[{ title: "출금신청", link: "/home", icon: withdrawRequest }, { title: "출금내역", link: "/home", icon: albumsOutline }, { title: "이체하기", link: "/home", icon: downloadOutline }],
    [{ title: "ESGW POINT 구매", link: "/home", icon: point }, { title: "청약예치금", link: "/home", icon: pigBank }, { title: "쇼핑몰", link: "/home", icon: cart }],
    [{ title: "랜덤박스변환", link: "/home", icon: box }, { title: "문의하기", link: "/home", icon: kakaoTalk }, { title: "마이페이지", link: "/mypage", icon: myPage }]];

    useEffect(() => {
        let header_list = [{ title: "구매 패키지", content: "60,000" }, { title: "소개 수익 / 할인", content: "9 %" }, { title: "롤업 보너스", content: "2 %" }, { title: "내 파트너", content: "4 / 10" }];
        setHeaderList(header_list);
        setBottomMenuList(bottom_menu_list);
        let notice_list = [{ title: "3분기 정기점검 및 추석 지급건 관련", date: "2022-09-02 15:34:12", views: 77020 }, { title: "2022 1분기 정기 서버점검일 안내", date: "2022-03-14 17:27:09", views: 49004 }, { title: "2022년도 재오픈후 일정", date: "2022-01-10 12:01:01", views: 28492 }];
        setNoticeList(notice_list);
    }, [])

    const onClickLink = (link) => {
        navigate(link);
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
                                <img src={defaultProfile} style={{ width: '34px', height: '34px', borderRadius: '50%' }} />
                                <Col style={{ marginLeft: '8px', textAlign: 'left', height: '34px' }}>
                                    <div style={{ fontSize: theme.size.font3, color: theme.color.font1, fontWeight: 'bold' }}>Hi, 민정환</div>
                                    <div style={{ fontSize: theme.size.font6, color: theme.color.background1, marginTop: '4px' }}>{`민들레플랫폼 / 회원 / 입금코드 ${commarNumber(13741)}`}</div>
                                </Col>
                            </Row>
                        </Content>

                        <Content >
                            <Card style={{ marginBottom: '12px', background: theme.color.background1 }}>
                                <Row>
                                    {headerList.map((item, idx) => (
                                        <>
                                            <Col style={{ margin: '0 auto', borderLeft: `${idx != 0 ? '1px solid #fff' : ''}`, width: '25%' }}>
                                                <div style={{ fontSize: theme.size.font4, fontWeight: 'bold', color: '#fff' }}>{item.content}</div>
                                                <div style={{ fontSize: theme.size.font6, marginTop: '8px', color: '#fff' }}>{item.title}</div>
                                            </Col>
                                        </>
                                    ))}
                                </Row>
                            </Card>
                        </Content>
                        <Content >
                            <WhiteButton title={'보유 RANDOM BOX POINT'} content={'4000.00 STAR'} />
                            <WhiteButton title={'보유 STAR'} content={'1000.00 POINT'} total_occurrence={8000.00} />
                            <WhiteButton title={'보유 POINT'} content={'145000.00 R.B.P'} total_occurrence={2000.00} />
                            <Row>
                                <WhiteButton width={45} title={'보유 ESGW POINT'} content={'500 ESGW'} />
                                <GreenButton width={45} img={logoWhite} />
                            </Row>
                        </Content>
                        <Content style={{ borderBottom: `1px solid #dddddd`, width: '86%' }} />
                        <Content style={{ marginTop: '12px' }}>
                            {bottomMenuList.map((item, index) => (
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
                            {noticeList.map((item, index) => (
                                <>
                                    <Card style={{ marginBottom: '12px' }}>
                                        <Row>
                                            <div style={{ fontSize: theme.size.font5, color: theme.color.background1, textAlign: 'center', width: '15%', margin: 'auto' }}>필독</div>
                                            <Col style={{ width: '85%', textAlign: 'left' }}>
                                                <div style={{ color: theme.color.background1, fontWeight: 'bold', fontSize: theme.size.font5 }}>{item.title}</div>
                                                <div style={{ fontSize: theme.size.font6, marginTop: '8px' }}>{`${item.date} / ${commarNumber(item.views ?? 0)} Views`}</div>
                                            </Col>
                                        </Row>
                                    </Card>
                                </>
                            ))}
                        </Content>
                    </>}


            </Wrappers>
        </>
    )
}
export default Home;