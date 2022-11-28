import { useEffect, useState } from "react";
import { OneCard, OneThirdCard, Row, Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/elements/AuthContentTemplete";
import LoadingText from "../../../components/LoadingText";
import InputContent from "../../../components/InputContent";
import theme from "../../../styles/theme";

export const Col = styled.div`
display:flex;
flex-direction:column;
text-align:center;
width: 22.5%;
margin-bottom: 16px;
font-size: ${props => props.theme.size.font5};
font-weight:bold;
cursor:pointer;
`

const SubscriptionDeposit = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    useEffect(() => {
        async function fetchPosts() {

        }
        fetchPosts();
    }, [])
    const onSubmit = () => {
        if (window.confirm("청약예치금을 등록하시겠습니까?")) {

        }
    }
    return (
        <>
            <Wrappers>
                <Title>청약예치금 등록</Title>
                <Row style={{ margin: '0 0 16px 0' }}>
                    <OneCard width={96} style={{ background: theme.color.background1, color: "#fff", height: '200px', cursor: 'default', fontSize: theme.size.font4 }}>
                        <div style={{ margin: 'auto auto 8px auto', fontSize: theme.size.font2 }}>등록한 청약예치금</div>
                        <div style={{ margin: '8px auto auto auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '240px' }}>{post?.star ?? <LoadingText color={"#fff"} width={15} />}<div>스타</div></div>
                        <div style={{ margin: '8px auto auto auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '240px' }}>{post?.point ?? <LoadingText color={"#fff"} width={15} />}<div>포인트</div></div>
                        <div style={{ margin: '8px auto auto auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '240px' }}>{post?.esgw_point ?? <LoadingText color={"#fff"} width={15} />}<div>ESGW 포인트</div></div>
                    </OneCard>
                </Row>
                <Row style={{ margin: '0 0 64px 0' }}>
                    <OneCard width={96} style={{ height: '300px', cursor: 'default' }}>
                        <InputContent title="스타" placeholder="등록할 스타" className="star" bottom_contents={[
                            <div>{post?.star ?? <LoadingText width={10} />}</div>,
                            <div style={{ marginRight: '4px' }}>잔액</div>
                        ]} />
                        <InputContent title="포인트" placeholder="등록할 포인트" className="point" bottom_contents={[
                            <div>{post?.point ?? <LoadingText width={10} />}</div>,
                            <div style={{ marginRight: '4px' }}>잔액</div>
                        ]} />
                        <InputContent title="ESGW 포인트" placeholder="등록할 ESGW 포인트" className="esgw_point" bottom_contents={[
                            <div>{post?.esgw_point ?? <LoadingText width={10} />}</div>,
                            <div style={{ marginRight: '4px' }}>잔액</div>
                        ]} />
                        <InputContent title="결제비밀번호" input_type="password" className="payment_pw" placeholder="결제 비밀번호를 입력하세요." />
                    </OneCard>
                </Row>
                <Button>청약예치금 등록</Button>
            </Wrappers>
        </>
    )
}
export default SubscriptionDeposit; 