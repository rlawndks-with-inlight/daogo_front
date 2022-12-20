import { useEffect, useState } from "react";
import { OneCard, Row, Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/elements/AuthContentTemplete";
import LoadingText from "../../../components/LoadingText";
import InputContent from "../../../components/InputContent";
import theme from "../../../styles/theme";
import { commarNumber } from "../../../functions/utils";
import $ from 'jquery'
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
const TopOneCard = styled.div`
background:${props => props.background};
color:${(props => props.color)};
box-shadow:${props => props.theme.boxShadow};
padding:2%;
border-radius:8px;
display:flex;
width:${(props => props.width) ?? "100"}%;
height:200px;
@media screen and (max-width:600px) { 
    height:350px;
    flex-direction:column;
}
`
const SubscriptionDepositContainer1 = styled.div`
margin:auto 16px auto auto;
@media screen and (max-width:600px) { 
    margin:auto;
}
`
const SubscriptionDepositContainer2 = styled.div`
margin:auto auto auto 16px;
@media screen and (max-width:600px) { 
    margin:auto;
}
`
const MoneyContent = styled.div`
margin: 16px auto auto auto;
display: flex;
align-items: center ;
justify-content: space-between;
width: 200px;
@media screen and (max-width:1000px) { 

}
`
const SubscriptionDeposit = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.get(`/api/getusermoney?type=subscriptiondeposit`);
            if (!response?.data?.user?.payment_pw) {
                alert("결제 비밀번호 등록 후 사용해 주세요.");
                navigate('/editmyinfo');
            }
            setPost(response.data);
        }
        fetchPost();
    }, [])
    const subscriptionDeposit = async () => {
        if ((!$('.star').val() && !$('.point').val() && !$('.esgw').val()) || !$('.payment_pw').val()) {
            alert("필수값이 비어 있습니다.");
            return;
        }
        if (isNaN(parseFloat($('.star').val())) && $('.star').val()) {
            alert("스타 부분에 숫자 이외의 값이 감지되었습니다.");
            return;
        }
        if (isNaN(parseFloat($('.point').val())) && $('.point').val()) {
            alert("포인트 부분에 숫자 이외의 값이 감지되었습니다.");
            return;
        }
        if (isNaN(parseFloat($('.esgw').val())) && $('.esgw').val()) {
            alert("ESGWP 부분에 숫자 이외의 값이 감지되었습니다.");
            return;
        }
        if (window.confirm("저장 하시겠습니까?")) {
            let obj = {
                star: parseFloat($('.star').val()),
                point: parseFloat($('.point').val()),
                esgw: parseFloat($('.esgw').val()),
                payment_pw: $('.payment_pw').val().toString(),
            }
            const { data: response } = await axios.post('/api/subscriptiondeposit', obj);
            if (response?.result > 0) {
                alert("성공적으로 저장되었습니다.");
                const { data: response } = await axios.get(`/api/getusermoney?type=subscriptiondeposit`);
                setPost(response.data);
            } else {
                alert(response?.message);
            }
        }
    }
    return (
        <>
            <Wrappers>
                <Title>청약예치금 등록</Title>
                <Row style={{ margin: '0 0 16px 0' }}>
                    <TopOneCard width={96} color={'#fff'} background={theme.color.background1}>
                        <SubscriptionDepositContainer1>
                            <div style={{ margin: 'auto', textAlign: 'center', fontSize: theme.size.font2 }}>등록한 청약예치금</div>
                            <MoneyContent>{commarNumber((post?.star_subscription_deposit) * (-1)) ?? <LoadingText color={"#fff"} width={15} />}<div>스타</div></MoneyContent>
                            <MoneyContent>{commarNumber((post?.point_subscription_deposit) * (-1)) ?? <LoadingText color={"#fff"} width={15} />}<div>포인트</div></MoneyContent>
                            <MoneyContent>{commarNumber((post?.esgw_subscription_deposit) * (-1)) ?? <LoadingText color={"#fff"} width={15} />}<div>ESGWP</div></MoneyContent>
                        </SubscriptionDepositContainer1>
                        <SubscriptionDepositContainer2>
                            <div style={{ margin: 'auto', textAlign: 'center', fontSize: theme.size.font2 }}>남은 청약예치금</div>
                            <MoneyContent>{commarNumber(60000 + post?.star_subscription_deposit) ?? <LoadingText color={"#fff"} width={15} />}<div>스타</div></MoneyContent>
                            <MoneyContent>{commarNumber(30000 + post?.point_subscription_deposit) ?? <LoadingText color={"#fff"} width={15} />}<div>포인트</div></MoneyContent>
                            <MoneyContent>{commarNumber(10000 + post?.esgw_subscription_deposit) ?? <LoadingText color={"#fff"} width={15} />}<div>ESGWP</div></MoneyContent>
                        </SubscriptionDepositContainer2>
                    </TopOneCard>
                </Row>
                <Row style={{ margin: '0 0 64px 0' }}>
                    <OneCard width={96} style={{ height: '300px', cursor: 'default' }}>
                        <InputContent title="스타" placeholder="등록할 스타" class_name="star" bottom_contents={[
                            <div>{commarNumber(post?.star) ?? <LoadingText width={10} />}</div>,
                            <div style={{ marginRight: '4px' }}>잔액</div>
                        ]} />
                        <InputContent title="포인트" placeholder="등록할 포인트" class_name="point" bottom_contents={[
                            <div>{commarNumber(post?.point) ?? <LoadingText width={10} />}</div>,
                            <div style={{ marginRight: '4px' }}>잔액</div>
                        ]} />
                        <InputContent title="ESGWP" placeholder="등록할 ESGWP" class_name="esgw" bottom_contents={[
                            <div>{commarNumber(post?.esgw) ?? <LoadingText width={10} />}</div>,
                            <div style={{ marginRight: '4px' }}>잔액</div>
                        ]} />
                        <InputContent title="결제비밀번호" input_type="password" class_name="payment_pw" placeholder="결제 비밀번호를 입력하세요." />
                    </OneCard>
                </Row>
                <Button onClick={subscriptionDeposit}>청약예치금 등록</Button>
            </Wrappers>
        </>
    )
}
export default SubscriptionDeposit; 