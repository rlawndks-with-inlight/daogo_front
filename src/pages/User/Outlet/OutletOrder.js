import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { OneCard, Title, Wrappers, ViewerContainer, Tr, Table, Td } from "../../../components/elements/UserContentTemplete";
import styled from "styled-components";
import { backUrl } from "../../../data/ContentData";
import theme from "../../../styles/theme";
import { Viewer } from '@toast-ui/react-editor';
import { commarNumber, discountOutlet, discountOutletList, getDiscountPoint, getIntroducePercentByUserTier, range } from "../../../functions/utils";
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
    const [addressList, setAddressList] = useState([])
    const [isSelectAddress, setIsSelectAddress] = useState(false);
    useEffect(() => {
        async function fetchPost() {
            if (!location?.state) {
                alert('????????? ???????????????.');
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
            alert('???????????? ??????????????????.');
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
            payment_pw: $('.payment_pw').val().toString(),
            item_pk: params?.pk,
            use_point: isUsePoint,
            item_count: count
        }
        if (window.confirm("?????? ?????????????????????????")) {
            const { data: response } = await axios.post('/api/onoutletorder', obj);
            if (response?.result > 0) {
                alert("??????????????? ?????????????????????.");
                navigate('/shoppingmall/outlet', { state: { type_num: 1 } });
            } else {
                alert(response?.message);
            }
        }
    }
    const getAddressByText = async () => {
        const { data: response } = await axios.post('/api/getaddressbytext', {
            text: $('.address').val()
        })
        setIsSelectAddress(false);
        setAddressList(response?.data);
    }
    const onSelectAddress = (idx) =>{
        setIsSelectAddress(true);
        let address_obj = addressList[idx];
        $('.address').val(address_obj?.address);
        $('.zip_code').val(address_obj?.zip_code);
        $('.address_detail').focus();
    }
    return (
        <>
            <Wrappers>
                <Title>{'????????? ????????? ??????'}</Title>
                <OneCard width={96} style={{ height: 'auto', cursor: 'default', marginBottom: '32px', display: 'flex' }}>
                    <div style={{ textAlign: 'center', borderBottom: `1px solid ${theme.color.font3}`, width: '100%', margin: '0 auto 16px auto', paddingBottom: '2%', fontSize: theme.size.font4, fontWeight: 'bold' }}>
                        <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'left' }}>?????????: {post?.brand_name}</CategoryName>
                        <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'left' }}>????????????: {post?.category_name}</CategoryName>
                        <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'left' }}>?????????: {post?.name}</CategoryName>
                    </div>
                    <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'end', fontSize: theme.size.font5 }}>{commarNumber(post?.sell_star)} ?????? <strong style={{ color: theme.color.red }}>{count}</strong> ??? ?????? ??????</CategoryName>
                    <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'end', fontSize: theme.size.font5 }}>???????????? <strong style={{ color: theme.color.blue, fontSize: theme.size.font4 }}>{commarNumber(post?.sell_star * count - discountOutlet(post?.sell_star * count, auth?.user?.tier))}</strong> ?????? ({discountOutletList(auth?.user?.tier)}% ??????)</CategoryName>
                    <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'end', fontSize: theme.size.font5 }}>????????? ?????? ????????? <strong style={{ color: theme.color.red, fontSize: theme.size.font4 }}>{commarNumber((post?.sell_star - discountOutlet(post?.sell_star, auth?.user?.tier) - getDiscountPoint(post?.sell_star, post?.is_use_point, post?.point_percent, auth?.user?.tier ?? 0)) * count)}</strong> ??????</CategoryName>
                    <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'end', fontSize: theme.size.font5 }}>?????? ?????????: <strong style={{ color: theme.color.red, fontSize: theme.size.font4 }}>{commarNumber(auth?.point)}</strong></CategoryName>
                    <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'end', fontSize: theme.size.font5, display: 'flex', justifyContent: 'space-between' }}>
                        <div />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ margin: '0 8px' }}>????????? ????????????</div>
                            {isUsePoint ?
                                <>
                                    <CgToggleOn style={{ color: `${theme.color.background1}`, cursor: 'pointer', fontSize: '25px' }} onClick={() => { setIsUsePoint(false); setDiscountPoint(0); }} />
                                </>
                                :
                                <>
                                    <CgToggleOff style={{ color: '#aaaaaa', cursor: 'pointer', fontSize: '25px' }} onClick={() => { setIsUsePoint(true); setDiscountPoint(auth?.point > getDiscountPoint(post?.sell_star, post?.is_use_point, post?.point_percent, auth?.user?.tier ?? 0) * count ? getDiscountPoint(post?.sell_star, post?.is_use_point, post?.point_percent, auth?.user?.tier ?? 0) * count : auth?.point) }} />
                                </>
                            }
                        </div>
                    </CategoryName>
                    <CategoryName style={{ margin: '0 auto 0.5rem auto', textAlign: 'end', fontSize: theme.size.font5 }}>????????????: <strong style={{ color: theme.color.red, fontSize: theme.size.font4 }}>{commarNumber(post?.sell_star * count - discountOutlet(post?.sell_star * count, auth?.user?.tier) - discountPoint)}</strong> ??????</CategoryName>

                    <CategoryName style={{ margin: '0.5rem auto 0 auto' }}>????????? ????????????</CategoryName>
                    <Input className="request" placeholder="????????? ????????????" onKeyPress={(e) => e.key == 'Enter' ? $('.name').focus() : null} />
                    <CategoryName>???????????? ??????(??????)</CategoryName>
                    <Input className="name" placeholder="???????????? ??????(??????)" onKeyPress={(e) => e.key == 'Enter' ? $('.phone').focus() : null} />
                    <CategoryName>???????????? ?????????(??????)	</CategoryName>
                    <Input className="phone" placeholder="???????????? ?????????(??????)" onKeyPress={(e) => e.key == 'Enter' ? $('.address').focus() : null} />
                    <CategoryName>??????(??????)</CategoryName>
                    <Input className="address" placeholder="??????(??????)" onKeyPress={(e) => e.key == 'Enter' ? getAddressByText() : null} />
                    <Button style={{ margin: '36px auto' }} onClick={getAddressByText}>??????</Button>
                    {addressList.length > 0 && !isSelectAddress ?
                            <>
                                <Table style={{maxWidth:'400px'}}>
                                    <Tr>
                                        <Td style={{ width: '30%' }}>????????????</Td>
                                        <Td style={{ width: '70%' }}>??????</Td>
                                    </Tr>
                                    {addressList.map((item, idx) => (
                                        <>
                                            <Tr style={{ cursor: 'pointer' }} onClick={()=>{onSelectAddress(idx)}}>
                                                <Td style={{ width: '30%', padding: '8px 0' }}>{item.zip_code ?? "---"}</Td>
                                                <Td style={{ width: '70%', padding: '8px 0' }}>{item.address ?? "---"}</Td>
                                            </Tr>
                                        </>
                                    ))}
                                </Table>
                            </>
                            :
                            <>
                            </>
                        }
                    <CategoryName>????????????(??????)</CategoryName>
                    <Input className="address_detail" placeholder="????????????(??????)" onKeyPress={(e) => e.key == 'Enter' ? $('.zip_code').focus() : null} />
                    <CategoryName>????????????(??????)</CategoryName>
                    <Input className="zip_code" placeholder="????????????(??????)" onKeyPress={(e) => e.key == 'Enter' ? $('.refer').focus() : null} />
                    <CategoryName>????????????</CategoryName>
                    <Input className="refer" placeholder="????????????" onKeyPress={(e) => e.key == 'Enter' ? $('.payment_pw').focus() : null} autoComplete={'new-password'} />
                    <CategoryName>??????????????????</CategoryName>
                    <Input className="payment_pw" placeholder="?????? ??????????????? ???????????????." type={'password'} onKeyPress={(e) => e.key == 'Enter' ? onOutletOrder() : null} />
                    <Button style={{ margin: '36px auto' }} onClick={onOutletOrder}>????????????</Button>
                </OneCard>
            </Wrappers>
        </>
    )
}
export default OutletOrder; 