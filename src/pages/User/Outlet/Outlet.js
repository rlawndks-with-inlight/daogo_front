import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { OneCard, Title, Wrappers, ViewerContainer } from "../../../components/elements/UserContentTemplete";
import styled from "styled-components";
import { backUrl } from "../../../data/ContentData";
import theme from "../../../styles/theme";
import { Viewer } from '@toast-ui/react-editor';
import { commarNumber, getIntroducePercentByUserTier, range } from "../../../functions/utils";
import AddButton from "../../../components/elements/button/AddButton";
import playFillIcon from '../../../assets/images/icon/play-fill.svg';
import $ from 'jquery';
const ItemImg = styled.img`
margin-bottom: 8px;
width:200px;
height:auto;
border-radius: 8px;
box-shadow:${props => props.theme.boxShadow};
@media screen and (max-width:700px) { 
    width:80%;
    height:auto;
    margin: 16px auto;
}
`
const Row = styled.div`
display:flex;
justify-content: space-between;
margin: 0 auto;
width:600px;
@media screen and (max-width:700px) { 
    flex-direction: column;
    width:100%;
}
`
const ExplainContainer = styled.div`
display: flex;
flex-direction: column;
width: 370px;
font-weight: bold;
font-size: ${props => props.theme.size.font5};
line-height: 30px;
@media screen and (max-width:700px) { 
    width:80%;
    margin: 16px auto;
}
`
const SelectCountList = styled.div`
    position: absolute;
    display: ${props=>props.display};
    flex-direction: column;
    background: rgb(255, 255, 255);
    bottom: -201px;
    line-height: 20px;
    width: 150px;
    left: 0;
    text-align: center;
    box-shadow:${props=>props.theme.boxShadow};
    border-radius:8px;
`
const SelectCountIndex = styled.div`
transition: 0.2s;
&:hover{  
    color:#fff;
    background : ${props => props.theme.color.background1};
  }
`
const Outlet = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [post, setPost] = useState({})
    const [count, setCount] = useState(1);
    const [display, setDisplay] = useState('none')
    const [auth, setAuth] = useState({});
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.get(`/api/item?table=outlet&pk=${params?.pk}`);
            setPost(response?.data);
            const { data: user_response } = await axios.get('/api/getusermoney');
            setAuth(user_response?.data);
        }
        fetchPost();
    }, [pathname])
    useEffect(() => {
        $('body').on('click', function () {
            
        })
    }, [])
    useEffect(() => {
        $('html').on('click', function (e) {
            // if ($(e.target).class('.select-count-list')) {
            //     console.log(1)
            //     $('.select-count-list').attr('style', 'display: none !important')
            // }
        });

    }, [])
    return (
        <>
            <Wrappers>
                <Title>{'아울렛쇼핑'}</Title>
                <OneCard width={96} style={{ height: 'auto', cursor: 'default', marginBottom: '32px', display: 'flex' }}>
                    <Row>
                        <ItemImg src={backUrl + post?.img_src} />
                        <ExplainContainer>
                            <div>{post?.name} {post?.randombox_point ? `- ${commarNumber(post?.randombox_point)}P (랜덤박스 적립)` : ''}</div>
                            <div style={{ fontSize: theme.size.font4 }}>{commarNumber(post?.sell_star)} 스타 <strong style={{ color: theme.color.red, fontSize: theme.size.font5 }}>{(getIntroducePercentByUserTier(auth?.user?.tier??0) / 100) * post?.sell_star}포인트 ({getIntroducePercentByUserTier(auth?.user?.tier??0)}%)</strong>사용가능</div>
                            <div style={{ fontSize: theme.size.font4, color: theme.color.background1 }}>{commarNumber(post?.sell_star * (100 - getIntroducePercentByUserTier(auth?.user?.tier??0)) / 100)} 스타 <strong style={{ fontSize: theme.size.font5 }}>판매가(포인트사용 시)</strong></div>
                            {post?.randombox_point > 0 ?
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <div>혜택 {commarNumber(post?.randombox_point)}P(랜덤박스 적립)</div>
                                        <AddButton style={{ width: '110px', fontSize: theme.size.font6, height: '24px', borderRadius: '12px', marginLeft: '8px' }} onClick={() => { window.location.href = post?.link }}>구매상담 바로가기</AddButton>
                                    </div>
                                </>
                                :
                                <>
                                </>}
                            <div>구매상담(상품문의, 배송문의 등등)</div>
                            <div style={{
                                height: '12px', width: '142px', border: `1px solid ${theme.color.background1}`, padding: '4px', display: 'flex', justifyContent: 'space-between'
                                , alignItems: 'center', fontSize: theme.size.font6, color: theme.color.background1, lineHeight: '10px', position: 'relative'
                            }}
                                className='select-count'
                                onClick={() => {setDisplay(display=='none'?'flex':'none')}}>
                                <div style={{ lineHeight: '10px' }}>구매수량선택</div>
                                <div>{count}</div>
                                <SelectCountList className='select-count-list' display={display}>
                                    {range(1, 10).map((item, idx) => (
                                        <>
                                            <SelectCountIndex onClick={()=>{setCount(item);setDisplay('none')}}>{item}</SelectCountIndex>
                                        </>
                                    ))}
                                </SelectCountList>
                                <img src={playFillIcon} />
                            </div>
                            <AddButton style={{ width: '105px', marginTop: '16px' }} onClick={()=>{navigate(`/item/outlet/order/${post?.pk}`,{state:{count:count}})}}>주문하기</AddButton>
                        </ExplainContainer>
                    </Row>
                </OneCard>
                <OneCard width={96} style={{ cursor: 'default', height: 'auto' }}>
                <div style={{ textAlign: 'center', borderBottom: `1px solid ${theme.color.font3}`, width: '90%', margin: '0 auto', paddingBottom: '2%', fontSize: theme.size.font4, fontWeight: 'bold' }}>상품상세정보</div>
                    <ViewerContainer className="viewer" style={{ margin: `0 auto` }}>
                        <Viewer initialValue={post?.note ?? `<body></body>`} />
                    </ViewerContainer>
                </OneCard>
            </Wrappers>
        </>
    )
}
export default Outlet; 