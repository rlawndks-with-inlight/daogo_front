import { useEffect, useState } from "react";
import { OneCard, OneThirdCard, Row, Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import axios from "axios";
import theme from "../../../styles/theme";
import styled from "styled-components";
import $ from 'jquery'
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/elements/AuthContentTemplete";
import LoadingText from "../../../components/LoadingText";
import InputContent from "../../../components/InputContent";
import { commarNumber } from "../../../functions/utils";
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
const WithdrawRequest = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.get(`/api/getusermoney`);
            if (!response?.data?.user?.payment_pw) {
                alert("결제 비밀번호 등록 후 사용해 주세요.");
                navigate('/editmyinfo');
            }
            setPost(response.data);
        }
        fetchPost();
    }, [])
    const requestWithdraw = async () => {
        if (!$('.send_star').val() || !$('.payment_pw').val()) {
            alert("필수값이 비어 있습니다.");
            return;
        }
        if (isNaN(parseFloat($('.send_star').val())) && $('.send_star').val()) {
            alert("스타 부분에 숫자 이외의 값이 감지되었습니다.");
            return;
        }
        if (window.confirm("저장 하시겠습니까?")) {
            let obj = {
                star: parseFloat($('.send_star').val()),
                payment_pw: $('.payment_pw').val(),
            }
            const { data: response } = await axios.post('/api/requestwithdraw', obj);
            if (response?.result > 0) {
                alert("성공적으로 저장되었습니다.");
                const { data: response } = await axios.get(`/api/getusermoney`);
                setPost(response.data);
            } else {
                alert(response?.message);
            }
        }
    }
    return (
        <>
            <Wrappers>
                <Title>출금신청</Title>
                <Row style={{ margin: '0 0 64px 0' }}>
                    <OneCard width={96} style={{ height: '160px', cursor: 'default' }}>
                        <InputContent title="스타" placeholder="보낼 스타" class_name="send_star"
                            top_contents_margin="auto auto 0 auto"
                            top_contents={[
                                <div>{commarNumber(post?.star) ?? <LoadingText width={10} />}</div>,
                                <div style={{ marginRight: '4px' }}>잔액</div>
                            ]}
                            bottom_contents={[
                                <div style={{ marginLeft: '4px', color: '#FF0000' }}>* 최소 500 스타부터 신청 가능하며, 100단위 이상으로 신청해 주세요.</div>
                            ]} />
                        <InputContent title="결제비밀번호" input_type="password" class_name="payment_pw" placeholder="결제 비밀번호를 입력하세요." />
                    </OneCard>
                </Row>
                <Button onClick={requestWithdraw}>출금신청하기</Button>
            </Wrappers>
        </>
    )
}
export default WithdrawRequest; 