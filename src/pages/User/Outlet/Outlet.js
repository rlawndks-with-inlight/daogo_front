import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { OneCard, Title, Wrappers, ViewerContainer } from "../../../components/elements/UserContentTemplete";
import styled from "styled-components";
import { backUrl } from "../../../data/ContentData";
import theme from "../../../styles/theme";
import { Viewer } from '@toast-ui/react-editor';
import { commarNumber, discountOutlet, discountOutletList, getDiscountPoint, getIntroducePercentByUserTier, range } from "../../../functions/utils";
import AddButton from "../../../components/elements/button/AddButton";
import playFillIcon from '../../../assets/images/icon/play-fill.svg';
import $ from 'jquery';
import { returnMoment } from "../../../functions/utils";
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
    display: ${props => props.display};
    flex-direction: column;
    background: rgb(255, 255, 255);
    top: 21px;
    line-height: 20px;
    width: 150px;
    left: 0;
    text-align: center;
    box-shadow:${props => props.theme.boxShadow};
    border-radius:8px;
`
const SelectCountIndex = styled.div`
transition: 0.2s;
display:flex;
justify-content:space-between;
padding: 0 6px;
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
    const [option, setOption] = useState("");
    const [display, setDisplay] = useState('none')
    const [auth, setAuth] = useState({});
    let introduce_percent_list = [0, 6, 7, 8, 9, 10];
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.get(`/api/item?table=outlet&pk=${params?.pk}`);
            let post_ = { ...response?.data };
            post_['option_obj'] = JSON.parse(post_?.option_obj ?? "{}");
            setOption(post_['option_obj'][0]?.name ?? "");
            setPost(post_);
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
    const onSaveBag = async () => {
        let option_obj = [...post?.option_obj];
        for (var i = 0; i < option_obj.length; i++) {
            if (option_obj[i]?.name == option) {
                break;
            }
        }
        if (window.confirm("저장 하시겠습니까?")) {
            let bag = await localStorage.getItem('bag') ?? "[]";
            bag = JSON.parse(bag);
            bag.push({
                pk: params?.pk,
                date: returnMoment(),
                option: option_obj[i]
            })
            bag = JSON.stringify(bag);
            await localStorage.setItem('bag', bag);
            navigate('/mypage');
        }
    }
    return (
        <>
            <Wrappers>
                <Title>{'아울렛쇼핑'}</Title>
                <OneCard width={96} style={{ height: 'auto', cursor: 'default', marginBottom: '32px', display: 'flex' }}>
                    <Row>
                        <ItemImg src={backUrl + post?.img_src} />
                        <ExplainContainer>
                            <div>{post?.name} {post?.randombox_point ? `- ${commarNumber(post?.randombox_point)}P (랜덤박스 적립)` : ''}</div>
                            <div style={{ fontSize: theme.size.font4 }}>{commarNumber(post?.sell_star - discountOutlet(post?.sell_star, auth?.user?.tier ?? 0))} 스타 ({discountOutletList(auth?.user?.tier ?? 0)}% 할인) <strong style={{ color: theme.color.red, fontSize: theme.size.font5 }}>{getDiscountPoint(post?.sell_star, post?.is_use_point, post?.point_percent, auth?.user?.tier ?? 0)}포인트 {post?.is_use_point == 2 ? `(${introduce_percent_list[auth?.user?.tier / 5]}%)` : ''}</strong>사용가능</div>
                            <div style={{ fontSize: theme.size.font4, color: theme.color.background1 }}>
                                {commarNumber(post?.sell_star - getDiscountPoint(post?.sell_star, post?.is_use_point, post?.point_percent, auth?.user?.tier ?? 0))} 스타 <strong style={{ fontSize: theme.size.font5 }}>판매가(포인트사용 시)</strong></div>
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
                                onClick={() => { setDisplay(display == 'none' ? 'flex' : 'none') }}>
                                <div style={{ lineHeight: '10px' }}>옵션선택</div>
                                <div>{option}</div>
                                <SelectCountList className='select-count-list' display={display}>
                                    {post?.option_obj && post?.option_obj.map((item, idx) => (
                                        <>
                                            <SelectCountIndex onClick={() => { setOption(item?.name); setDisplay('none') }}>
                                                <div>{item?.name}</div>
                                                <div>( {commarNumber(item?.price)} 스타 )</div>
                                            </SelectCountIndex>
                                        </>
                                    ))}
                                </SelectCountList>
                                <img src={playFillIcon} />
                            </div>
                            <AddButton style={{ width: '105px', marginTop: '16px' }}
                                // onClick={() => { navigate(`/item/outlet/order/${post?.pk}`, { state: { count: count, is_use_point: post?.is_use_point, point_percent: post?.point_percent } }) }}
                                onClick={onSaveBag}
                            >장바구니담기</AddButton>
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