import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Wrappers, Title, Content, Img, WrapDiv, SliderDiv, Row, Col, OneCard, OneThirdCard, OneCardImg, ViewerContainer } from '../../components/elements/UserContentTemplete';
import Loading from '../../components/Loading';
import theme from '../../styles/theme';
import { commarNumber, getIntroducePercentByUserTier, getRollUpBonusByUserTier, getTierByUserTier } from '../../functions/utils';
import defaultProfile from '../../assets/images/icon/default-profile.png';
import albumsOutline from '../../assets/images/icon/home/albums-outline.svg';
import box from '../../assets/images/icon/home/box.svg';
import cart from '../../assets/images/icon/home/cart.svg';
import downloadOutline from '../../assets/images/icon/home/download-outline.svg';
import kakaoTalk from '../../assets/images/icon/home/kakao-talk.svg';
import myPage from '../../assets/images/icon/home/my-page.svg';
import pigBank from '../../assets/images/icon/home/pig-bank.svg';
import point from '../../assets/images/icon/home/point.svg';
import event_game from '../../assets/images/icon/home/event_game.png';
import withdrawRequest from '../../assets/images/icon/home/withdraw-request.svg';
import yellowDot from '../../assets/images/icon/home/yellow-dot.svg';
import logoOutlet from '../../assets/images/icon/logo-white.svg';
import axios from 'axios';
import LoadingText from '../../components/LoadingText';
import { backUrl, badgeSrc } from '../../data/ContentData';
import { GiLaurelsTrophy } from 'react-icons/gi';
import { Viewer } from '@toast-ui/react-editor';
const OneTopCard = styled.div`
background:${(props => props.background) ?? ""};
color:${(props => props.color) ?? ""};
box-shadow:${props => props.theme.boxShadow};
padding:2%;
border-radius:8px;
display:flex;
flex-direction:column;
height:48px;
width:${(props => props.width) ?? "100"}%;
@media screen and (max-width:400px) { 
    height:56px;
}
`
const BottomMenuText = styled.div`
font-size: 11px;
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
const ProfileContainer = styled.div`
display:flex;
justify-content: space-between;
margin: auto 0;
@media screen and (max-width:600px) { 
    flex-direction:column;
}
`
const OutletImg = styled.img`
height: 54px;
width: auto; 
margin: auto;
@media screen and (max-width:500px) { 
    height: 42px;
}
`
const BannerImg = styled.img`
box-shadow:${props => props.theme.boxShadow};
border-radius:8px;
${(props => props.is_hover ? ('cursor:pointer') : '')};
height:180px;
width:100%;
transition-duration: 0.3s;
border:none;

@media screen and (max-width:1000px) { 
    height:18vw;
}
`
const WhiteButton = (props) => {
    let { title, content, unit, bottom_content, width, total_occurrence_title, total_occurrence, background, font_color, link } = props;
    const navigate = useNavigate();
    return (
        <>
            <OneCard style={{ marginBottom: '12px', width: `${width ? width : ''}%`, height: 'auto' }} color={font_color} background={background ?? '#fff'} is_hover={true} onClick={() => navigate(link)}>
                <div style={{ display: 'flex' }}>
                    <img src={yellowDot} />
                    <div style={{ marginLeft: '10px', fontSize: theme.size.font5, color: theme.color.font5, fontWeight: 'bold' }}>{title}</div>
                </div>
                <div style={{ fontSize: theme.size.font2, margin: `${width ? '0.15rem 1rem 0.15rem auto' : '0.15rem 43% 0.15rem auto'}`, display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                    <div>{commarNumber(content ?? 0)}</div>
                    {/* <div style={{ marginLeft: '8px' }}>{unit}</div> */}
                </div>
                <div style={{ fontSize: theme.size.font5, margin: '0 2rem 0 auto', display: 'flex', alignItems: 'center', height: '12px', fontWeight: 'bold' }}>
                    {typeof total_occurrence == 'number' ?
                        <>
                            <div style={{ color: theme.color.font3 }}>{total_occurrence_title}</div>
                            <div style={{ marginLeft: '12px' }}>{total_occurrence >= 0 ? commarNumber(total_occurrence) : <LoadingText width={12} />}</div>
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
    const navigate = useNavigate();
    let { title, content, bottom_content, width, img, link, background } = props;
    return (
        <>
            <OneCard style={{ marginBottom: '12px', width: `${width ? width : ''}%`, height: 'auto', display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'space-between' }} background={background} is_hover={true} onClick={() => navigate(link)}>
                {content?
                <>
                {content}
                </>
                :
                <>
                <OutletImg src={img} />

                </>}
            </OneCard>
        </>
    )
}

const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({});
    let bottom_menu_list = [[{ title: "출금신청", link: "/withdrawrequest", icon: withdrawRequest }, { title: "출금내역", link: "/exchange/history", icon: albumsOutline }, { title: "선물하기", link: "/gift", icon: downloadOutline }],
    [{ title: "ESGWP 구매", link: "/buyesgwpoint", icon: point }, { title: "청약예치금", link: "/subscriptiondeposit", icon: pigBank }, { title: "쇼핑몰", link: "shoppingmall", icon: cart }],
    [{ title: "랜덤박스변환", link: "/randombox/register", icon: box }, { title: "문의하기", link: 'kakaotalk', icon: kakaoTalk }, { title: "마이페이지", link: "/mypage", icon: myPage }]];

    useEffect(() => {
        async function fetchPosts() {
            const { data: response } = await axios.get('/api/gethomecontent');
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
            window.location.href = 'https://pf.kakao.com/_xgCPzxj';
        } else if (link == 'shoppingmall') {
            //window.location.href = 'kakaoopen://join?l=_xgCPzxj&r=EW'
            window.open('https://www.daogo.kr/');
        } else {
            navigate(link);
        }
    }
    const getPurchasePackageByList = (list_) => {
        let list = [...list_];
        let sum = 0;
        for (var i = 0; i < list.length; i++) {
            if (list[i].explain_obj && list[i].explain_obj.length > 2) {
                list[i].explain_obj = JSON.parse(list[i].explain_obj ?? "{}")
            } else {
                list[i].explain_obj = {};
            }
            if (list[i].explain_obj?.tier == 5) {
                sum += 360000;
            } else if (list[i].explain_obj?.tier == 10) {
                sum += 1200000;

            } else if (list[i].explain_obj?.tier == 15) {
                sum += 3600000;

            } else if (list[i].explain_obj?.tier == 20) {
                sum += 6000000;

            } else if (list[i].explain_obj?.tier == 25) {
                sum += 12000000;

            }
        }
        return sum / 100;
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
                            <ProfileContainer>
                                <Row>
                                    {/* <img src={post?.auth?.profile_img ? backUrl + post?.auth?.profile_img : defaultProfile} style={{ width: '34px', height: '34px', borderRadius: '50%' }} /> */}
                                    <Col style={{ textAlign: 'left', height: '20px', marginTop: 'auto' }}>
                                        <div style={{ fontSize: theme.size.font3, color: theme.color.font1, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>{post?.sell_outlet?.sell_outlet > 0 ? <img src={badgeSrc} style={{ width: '17px', height: 'auto', marginRight: '4px', marginTop: '2px', color: theme.color.gold }} /> : ''}<div>Hi, {post?.auth?.name}</div></div>
                                    </Col>
                                </Row>

                                <div style={{ fontSize: theme.size.font4, color: theme.color.background0, marginTop: '4px' }}>{`다오고 그린슈머스 소비경제 플랫폼  / ${getTierByUserTier(post?.user?.tier)} / ${post?.auth?.id}`}</div>
                            </ProfileContainer>
                        </Content>
                        <Content>
                            <OneTopCard style={{ marginBottom: '12px' }} background={theme.color.background0}>
                                <Row style={{ margin: 'auto 0', height: '85%', color: '#fff' }}>
                                    <Col style={{ margin: '0 auto', width: '25%', display: 'flex', flexDirection: 'column' }}>
                                        <HeaderContent><div>{commarNumber(getPurchasePackageByList(post?.purchase_package ?? [])) ?? <LoadingText color={"#fff"} width={15} />}</div></HeaderContent>
                                        <div style={{ fontSize: theme.size.font6, margin: 'auto auto 0 auto' }}>{"구매 패키지"}</div>
                                    </Col>
                                    <Col style={{ margin: '0 auto', width: '25%', borderLeft: '1px solid #fff' }}>
                                        <HeaderContent><div>{getIntroducePercentByUserTier(post?.user?.tier) ?? <LoadingText color={"#fff"} width={15} />}%</div></HeaderContent>
                                        <div style={{ fontSize: theme.size.font6, margin: 'auto auto 0 auto' }}>{"소개 수익 / 할인"}</div>
                                    </Col>
                                    <Col style={{ margin: '0 auto', width: '25%', borderLeft: '1px solid #fff', cursor: 'pointer' }} onClick={() => navigate('/randombox_rolling/history')}>
                                        <HeaderContent><div>{getRollUpBonusByUserTier(post?.user?.tier) ?? <LoadingText color={"#fff"} width={15} />}%</div></HeaderContent>
                                        <div style={{ fontSize: theme.size.font6, margin: 'auto auto 0 auto' }}>{"이벤트 보너스"}</div>
                                    </Col>
                                    <Col style={{ margin: '0 auto', width: '25%', borderLeft: '1px solid #fff', cursor: 'pointer' }} onClick={() => navigate('/recommendgenealogy')}>
                                        <HeaderContent><div>{commarNumber(post?.genealogy_score?.loss) ?? <LoadingText color={"#fff"} width={15} />} / {commarNumber(post?.genealogy_score?.great) ?? <LoadingText color={"#fff"} width={15} />}</div></HeaderContent>
                                        <div style={{ fontSize: theme.size.font6, margin: 'auto auto 0 auto' }}>{"내 파트너"}</div>
                                    </Col>
                                </Row>
                            </OneTopCard>
                        </Content>
                        <Content>
                            <WhiteButton title={'보유 RANDOM BOX POINT'} content={post?.randombox?.randombox} unit={`POINT`} link={'/randombox/history'} />
                            <WhiteButton title={'보유 STAR'} content={post?.star?.star} total_occurrence_title={'총 발생 스타'} total_occurrence={post?.generation_star?.generation_star ?? 0} unit={`STAR`} link={'/star/history'} />
                            <WhiteButton title={'보유 POINT'} content={post?.point?.point} total_occurrence_title={'총 발생 포인트'} total_occurrence={post?.generation_point?.generation_point} unit={`POINT`} link={'/point/history'} />
                            <WhiteButton title={'보유 ESGWP'} content={post?.esgw?.esgw} unit={`ESGWP`} link={'/esgw/history'} />
                            <Row>
                            <GreenButton width={45} img={event_game} link={'/eventgame'} background={theme.color.background0} />
                            <GreenButton width={45} content={<div style={{ fontSize: theme.size.font3, display: 'flex',margin:'auto', alignItems: 'center', fontWeight: 'bold' }}>보유자산 변동내역</div>} link={'/user_money/history'} background={"#fff"} />
                            </Row>
                        </Content>
                        <Content style={{ borderBottom: `1px solid #dddddd`, width: '86%' }} />
                        <Content style={{ marginTop: '12px' }}>
                            {bottom_menu_list.map((item, index) => (
                                <>
                                    <Row style={{ marginBottom: '12px' }}>
                                        {item.map((itm, idx) => (
                                            <>
                                                <OneThirdCard onClick={() => { onClickLink(itm.link) }} is_hover={true}>
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
                            <Title not_arrow={true} textIcon={'Read more'} textIconLink={'true'} texttextIconClick={() => { navigate('/noticelist') }}>공지사항</Title>
                            {post?.notice && post?.notice?.map((item, index) => (
                                <>
                                    <OneCard style={{ marginBottom: '12px' }} is_hover={true} onClick={() => { navigate(`/post/notice/${item.pk}`) }}>
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
                        <Content>
                            <Title not_arrow={true}>메인배너 콘텐츠</Title>
                            {post?.main_banner && post?.main_banner?.map((item, index) => (
                                <>
                                    <BannerImg style={{ marginBottom: '12px' }} src={backUrl + item?.img_src} is_hover={true} onClick={() => {
                                        if (item?.target === 0) {
                                            window.location.href = (item?.link.includes('http') ? '' : 'http://') + item?.link;
                                        } else {
                                            window.open((item?.link.includes('http') ? '' : 'http://') + item?.link);
                                        }
                                    }}>
                                    </BannerImg>
                                </>
                            ))}
                        </Content>
                    </>}


            </Wrappers>
        </>
    )
}
export default Home;