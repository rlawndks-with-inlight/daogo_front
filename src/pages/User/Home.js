import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Wrappers, Title, Content, Img, WrapDiv, SliderDiv } from '../../components/elements/UserContentTemplete';
import Loading from '../../components/Loading';
import theme from '../../styles/theme';
import { commarNumber } from '../../functions/utils';
import defaultProfile from '../../assets/images/icon/default-profile.png'

const Row = styled.div`
display:flex;
justify-content: space-between;
`
const Col = styled.div`
display:flex;
flex-direction:column;
text-align:center;
`
const OneThirdCard = styled.div`
width:28%;
background:#fff;
box-shadow:0px 2px 6px #00000012;
padding:2%;
border-radius:8px;
height:36px;
display:flex;
cursor:pointer;
`
const OneSecondCard = styled.div`
width:44.5%;
background:#fff;
box-shadow:0px 1px 3px #00000012;
padding:2%;
border-radius:8px;
height:48px;
display:flex;
flex-direction:column;
cursor:pointer;
`
const Card = styled.div`
background:#fff;
box-shadow:0px 1px 3px #00000012;
padding:2%;
border-radius:8px;
height:48px;
display:flex;
flex-direction:column;
cursor:pointer;
`
const Home = () => {
    const navigate = useNavigate();
    const [headerList, setHeaderList] = useState([]);
    const [topMenuList, setTopMenuList] = useState([])
    const [bottomMenuList, setBottomMenuList] = useState([])
    const [noticeList, setNoticeList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        let header_list = [{ title: "구매 패키지", content: "60,000" }, { title: "소개 수익 / 할인", content: "9 %" }, { title: "롤업 보너스", content: "2 %" }, { title: "내 파트너", content: "4 / 10" }];
        setHeaderList(header_list);
        let top_menu_list = [[{ title: "보유 STAR", content: "4000.00 STAR", background: `linear-gradient(to left, ${theme.color.background3} , ${theme.color.background1})`, fontColor: '#fff' }, { title: "총 발생 STAR", content: "8000.00 STAR", background: `linear-gradient(to left, ${theme.color.background3} , ${theme.color.background1})`, fontColor: '#fff' }],
        [{ title: "보유 POINT", content: "1000.00 POINT" }, { title: "총 발생 POINT", content: "2000.00 POINT" }],
        [{ title: "보유 RANDOM BOX POINT", content: "145000.00 R.B.P" }, { title: " 총 발생 RANDOM BOX", content: ["4000.00 STAR", "1000.00 POINT"] }],
        [{ title: "보유 ESGW POINT", content: "500   ESGW" }, { title: "daogo", content: "Outlet mall with Everrang" }]];
        setTopMenuList(top_menu_list);
        let bottom_menu_list = [[{ title: "출금 내역", link: "/" }, { title: "이체 하기", link: "/" }, { title: "ESGW POINT 구매", link: "/" }], [{ title: "계좌 등록", link: "/" }, { title: "문의 하기", link: "/" }, { title: "마이 페이지", link: "/mypage" }]];
        setBottomMenuList(bottom_menu_list);
        let notice_list = [{ title: "3분기 정기점검 및 추석 지급건 관련", date: "2022-09-02 15:34:12", views: 77020 }, { title: "2022 1분기 정기 서버점검일 안내", date: "2022-03-14 17:27:09", views: 49004 }, { title: "2022년도 재오픈후 일정", date: "2022-01-10 12:01:01", views: 28492 }];
        setNoticeList(notice_list);
    }, [])

    const onClickLink = (link) => {
        localStorage.removeItem('auth')
        if (link == '/mypage') {
            if (localStorage.getItem('auth')) {
                navigate('/mypage');
            } else {
                navigate('/login');
            }
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
                        <Content style={{ marginBottom: '16px' }}>
                            <Row style={{ justifyContent: 'flex-start' }}>
                                <img src={defaultProfile} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                                <Col style={{ marginLeft: '8px', textAlign: 'left' }}>
                                    <div style={{ fontSize: theme.size.font3, fontWeight: 'bold' }}>Hi, 민정환</div>
                                    <div style={{ fontSize: theme.size.font5, color: theme.color.font2, marginTop: '8px' }}>{`민들레플랫폼 / 회원 / 입금코드 ${commarNumber(13741)}`}</div>
                                </Col>
                            </Row>
                        </Content>
                        <Content style={{ background: `linear-gradient(to right, ${theme.color.background3}05, ${theme.color.background3} , ${theme.color.background3}05)`, padding: '16px 0' }}>
                            <Row>
                                {headerList.map((item, idx) => (
                                    <>
                                        <Col style={{ margin: '0 auto' }}>
                                            <div style={{ fontSize: theme.size.font3, fontWeight: 'bold' }}>{item.content}</div>
                                            <div style={{ fontSize: theme.size.font5, color: theme.color.font2, marginTop: '8px' }}>{item.title}</div>
                                        </Col>
                                    </>
                                ))}
                            </Row>
                        </Content>
                        <Content>
                            {topMenuList.map((item, index) => (
                                <>
                                    <Row style={{ margin: '6px 0' }}>
                                        {item.map((itm, idx) => (
                                            <>
                                                <OneSecondCard style={{ background: `${itm.background ? itm.background : '#fff'}`, color: `${itm.fontColor ? itm.fontColor : theme.color.font1}` }}>
                                                    <div style={{ fontSize: '10px' }}>{itm.title}</div>
                                                    <div style={{ fontSize: theme.size.font4, textAlign: 'center', fontWeight: 'bold', margin: 'auto' }}>{typeof itm.content == 'string' ? itm.content : itm.content.map((im => (<>
                                                        <div>{im}</div>
                                                    </>)))}</div>
                                                </OneSecondCard>
                                            </>
                                        ))}
                                    </Row>
                                </>
                            ))}
                        </Content>
                        <Content>
                            {bottomMenuList.map((item, index) => (
                                <>
                                    <Row style={{ margin: '6px 0' }}>
                                        {item.map((itm, idx) => (
                                            <>
                                                <OneThirdCard onClick={() => { onClickLink(itm.link) }}>
                                                    <div style={{ fontSize: theme.size.font5, color: theme.color.font2, margin: 'auto' }}>{itm.title}</div>
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
                                    <Card style={{ margin: '6px 0' }}>
                                        <Row>
                                            <div style={{ fontWeight: 'bold', fontSize: theme.size.font3, textAlign: 'center', width: '15%' }}>필독</div>
                                            <Col style={{ width: '85%', textAlign: 'left' }}>
                                                <div style={{ color: theme.color.background1, fontWeight: 'bold', fontSize: theme.size.font3 }}>{item.title}</div>
                                                <div style={{ fontSize: '10px', marginTop: '8px' }}>{`${item.date} / ${commarNumber(item.views ?? 0)} Views`}</div>
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