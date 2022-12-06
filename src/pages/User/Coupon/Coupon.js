import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { OneCard, Title, Wrappers, ViewerContainer } from "../../../components/elements/UserContentTemplete";
import styled from "styled-components";
import { backUrl } from "../../../data/ContentData";
import theme from "../../../styles/theme";
import { Viewer } from '@toast-ui/react-editor';
import { commarNumber } from "../../../functions/utils";
import AddButton from "../../../components/elements/button/AddButton";
const ItemImg = styled.img`
margin-bottom: 8px;
width:200px;
height:auto;
border-radius: 8px;
box-shadow:${props => props.theme.boxShadow};
`
const Row = styled.div`
display:flex;
justify-content: space-between;
margin: 0 auto;
width:600px;
@media screen and (max-width:700px) { 
    margin: auto auto auto 0.5rem; 
}
`
const Coupon = () => {
    const params = useParams();
    const { pathname } = useLocation();
    const [post, setPost] = useState({})
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.get(`/api/item?table=coupon&pk=${params?.pk}`);
            setPost(response?.data);
        }
        fetchPost();
    }, [pathname])
    return (
        <>
            <Wrappers>
                <Title>{'쿠폰이벤트'}</Title>
                <OneCard width={96} style={{ height: 'auto', cursor: 'default', marginBottom: '32px' }}>
                    <Row>
                        <ItemImg src={backUrl + post?.img_src} />
                        <div style={{ display: 'flex', flexDirection: 'column', width: '370px', fontWeight: 'bold', fontSize: theme.size.font5, lineHeight: '30px' }}>
                            <div>{post?.name}</div>
                            <div style={{ fontSize: theme.size.font4 }}>{commarNumber(post?.price)} 스타 <strong style={{ color: '#ff0000', fontSize: theme.size.font5 }}>{(post?.discount_percent / 100) * post?.price}포인트 ({post?.discount_percent}%)</strong>사용가능</div>
                            <div style={{ fontSize: theme.size.font4, color: theme.color.background1 }}>{commarNumber(post?.price * (100 - post?.discount_percent) / 100)} 스타 <strong style={{ fontSize: theme.size.font5 }}>판매가(포인트사용 시)</strong></div>
                            <div>구매상담(상품문의, 배송문의 등등)</div>
                            <AddButton style={{ width: '105px', marginTop: '16px' }}>주문하기</AddButton>
                        </div>
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
export default Coupon; 