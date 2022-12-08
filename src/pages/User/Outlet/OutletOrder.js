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
import { Button, CategoryName, Input } from "../../../components/elements/AuthContentTemplete";
import { CgToggleOff, CgToggleOn } from "react-icons/cg";
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
    bottom: -201px;
    line-height: 20px;
    width: 150px;
    left: 0;
    text-align: center;
    box-shadow:${props => props.theme.boxShadow};
    border-radius:8px;
`
const SelectCountIndex = styled.div`
transition: 0.2s;
&:hover{  
    color:#fff;
    background : ${props => props.theme.color.background1};
  }
`
const OutletOrder = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [post, setPost] = useState({})
    const [display, setDisplay] = useState('none')
    const [count, setCount] = useState(1);
    const [auth, setAuth] = useState({});
    const [discountPoint, setDiscountPoint] = useState(0);
    const [isUsePoint, setIsUsePoint] = useState(false);
    useEffect(() => {
        async function fetchPost() {
            if (!location?.state) {
                alert('잘못된 접근입니다.');
                navigate(-1);
            } else {
                setCount(location?.state?.count)
            }
            const { data: response } = await axios.get(`/api/item?table=outlet&pk=${params?.pk}`);
            const { data: user_response } = await axios.get('/api/getusermoney');
            await new Promise((r) => setTimeout(r, 300));
            for (var i = 0; i < Object.keys(user_response?.data?.user).length; i++) {
                if (!Object.keys(user_response?.data?.user)[i].includes('pw')) {
                    $(`.${Object.keys(user_response?.data?.user)[i]}`).val(user_response?.data?.user[Object.keys(user_response?.data?.user)[i]]);
                }
            }
            setAuth(user_response?.data);
            setPost(response?.data);
        }
        fetchPost();
    }, [pathname])
    const onOutletOrder = async () => {
        if (!$('.name').val() || !$('.phone').val() || !$('.zip_code').val() || !$('.address').val() || !$('.address_detail').val() || !$('.payment_pw').val()) {
            alert('필수값이 비어있습니다.');
            return;
        }
        let obj = {
            request: $('.request').val(),
            name: $('.name').val(),
            phone: $('.phone').val(),
            zip_code: $('.zip_code').val(),
            address: $('.address').val(),
            address_detail: $('.address_detail').val(),
            refer: $('.refer').val(),
            payment_pw: $('.payment_pw').val(),
            item_pk: params?.pk,
            use_point: isUsePoint,
            item_count:count
        }
        if(window.confirm("정말 구매하시겠습니까?")){
            const { data: response } = await axios.post('/api/onoutletorder', obj);
            if (response?.result > 0) {
                alert("성공적으로 저장되었습니다.");
                navigate(-1)
            } else {
                alert(response?.message);
            }
        }
    }
    return (
        <>
            <Wrappers>
                <Title>{'아울렛 주문서 작성'}</Title>
                <OneCard width={96} style={{ height: 'auto', cursor: 'default', marginBottom: '32px', display: 'flex' }}>
                    <div style={{ textAlign: 'center', borderBottom: `1px solid ${theme.color.font3}`, width: '100%', margin: '0 auto 16px auto', paddingBottom: '2%', fontSize: theme.size.font4, fontWeight: 'bold' }}>
                        <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'left' }}>브랜드: {post?.brand_name}</CategoryName>
                        <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'left' }}>카테고리: {post?.category_name}</CategoryName>
                        <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'left' }}>상품명: {post?.name}</CategoryName>
                    </div>
                    <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'end', fontSize: theme.size.font5 }}>{commarNumber(post?.sell_star)} 스타 <strong style={{ color: theme.color.red }}>{count}</strong> 개 구매 신청</CategoryName>
                    <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'end', fontSize: theme.size.font5 }}>상품가격 <strong style={{ color: theme.color.blue, fontSize: theme.size.font4 }}>{commarNumber(post?.sell_star * count)}</strong> 스타</CategoryName>
                    <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'end', fontSize: theme.size.font5 }}>포인트 모두 사용시 <strong style={{ color: theme.color.red, fontSize: theme.size.font4 }}>{commarNumber(post?.sell_star * (100 - getIntroducePercentByUserTier(auth?.user?.tier)) / 100 * count)}</strong> 스타</CategoryName>
                    <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'end', fontSize: theme.size.font5}}>잔여 포인트: <strong style={{ color: theme.color.red, fontSize: theme.size.font4 }}>{commarNumber(auth?.point)}</strong></CategoryName>
                    <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'end', fontSize: theme.size.font5, display: 'flex', justifyContent: 'space-between' }}>
                        <div />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ margin: '0 8px' }}>포인트 사용하기</div>
                            {isUsePoint ?
                                <>
                                    <CgToggleOn style={{ color: `${theme.color.background1}`, cursor: 'pointer', fontSize: '25px' }} onClick={() => { setIsUsePoint(false); setDiscountPoint(0); }} />
                                </>
                                :
                                <>
                                    <CgToggleOff style={{ color: '#aaaaaa', cursor: 'pointer', fontSize: '25px' }} onClick={() => { setIsUsePoint(true); setDiscountPoint(auth?.point > (getIntroducePercentByUserTier(auth?.user?.tier) / 100 * post?.sell_star)*count ? (getIntroducePercentByUserTier(auth?.user?.tier) / 100 * post?.sell_star)*count : auth?.point) }} />
                                </>
                            }
                        </div>
                    </CategoryName>
                    <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'end', fontSize: theme.size.font5 }}>결제금액: <strong style={{ color: theme.color.red, fontSize: theme.size.font4 }}>{commarNumber(post?.sell_star * count - discountPoint)}</strong> 스타</CategoryName>

                    <CategoryName style={{ margin: '0.5rem auto 0 auto' }}>주문자 요청사항</CategoryName>
                    <Input className="request" placeholder="주문자 요청사항" onKeyPress={(e) => e.key == 'Enter' ? $('.name').focus() : null} />
                    <CategoryName>받는사람 이름(필수)</CategoryName>
                    <Input className="name" placeholder="받는사람 이름(필수)" onKeyPress={(e) => e.key == 'Enter' ? $('.phone').focus() : null} />
                    <CategoryName>받는사람 연락처(필수)	</CategoryName>
                    <Input className="phone" placeholder="받는사람 연락처(필수)" onKeyPress={(e) => e.key == 'Enter' ? $('.zip_code').focus() : null} />
                    <CategoryName>우편번호(필수)</CategoryName>
                    <Input className="zip_code" placeholder="우편번호(필수)" onKeyPress={(e) => e.key == 'Enter' ? $('.address').focus() : null} />
                    <CategoryName>주소(필수)</CategoryName>
                    <Input className="address" placeholder="주소(필수)" onKeyPress={(e) => e.key == 'Enter' ? $('.address_detail').focus() : null} />
                    <CategoryName>상세주소(필수)</CategoryName>
                    <Input className="address_detail" placeholder="상세주소(필수)" onKeyPress={(e) => e.key == 'Enter' ? $('.refer').focus() : null} />
                    <CategoryName>참고항목</CategoryName>
                    <Input className="refer" placeholder="참고항목" onKeyPress={(e) => e.key == 'Enter' ? $('.payment_pw').focus() : null} />
                    <CategoryName>결제비밀번호</CategoryName>
                    <Input className="payment_pw" placeholder="결제 비밀번호를 입력하세요." type={'password'} onKeyPress={(e) => e.key == 'Enter' ? onOutletOrder() : null} />
                    <Button style={{ margin: '36px auto' }} onClick={onOutletOrder}>주문하기</Button>
                </OneCard>
            </Wrappers>
        </>
    )
}
export default OutletOrder; 