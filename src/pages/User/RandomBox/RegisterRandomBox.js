import { useEffect, useState } from "react";
import { OneCard, OneThirdCard, Row, Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import axios from "axios";
import SearchComponent from "../../../components/SearchComponent";
import theme from "../../../styles/theme";
import { commarNumber, getSelectButtonColor, range } from "../../../functions/utils";
import styled from "styled-components";
import $ from 'jquery'
import { backUrl } from "../../../data/ContentData";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import nextIcon from '../../../assets/images/icon/next.svg'
import { Button } from "../../../components/elements/AuthContentTemplete";
import LoadingText from "../../../components/LoadingText";
import { Input } from "../../../components/elements/ManagerTemplete";
import InputContent from "../../../components/InputContent";
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
const RegisterRandomBox = () => {
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
    const registerRandomBox = async () => {
        if (!$('.send_star').val() || !$('.payment_pw').val()) {
            alert("필수값이 비어있습니다.");
            return;
        }
        if (isNaN(parseFloat($('.send_star').val()))) {
            alert("스타 칸에 숫자가 아닌 값이 들어있습니다.");
            return;
        }
        if (parseFloat($('.send_star').val()) < 1) {
            alert("스타 칸에 1 이상의 숫자를 입력해 주세요.");
            return;
        }
        if (window.confirm("정말 등록하시겠습니까?")) {
            const { data: response } = await axios.post('/api/registerrandomBox', {
                star: parseFloat($('.send_star').val()),
                payment_pw: parseFloat($('.payment_pw').val()),
            })
            if(response?.result>0){
                alert("성공적으로 등록되었습니다.");
                const { data: response } = await axios.get(`/api/getusermoney`);
                setPost(response?.data);
            }else{
                alert(response?.message);
            }
        }
    }
    return (
        <>
            <Wrappers>
                <Title>랜덤박스등록</Title>
                <Row style={{ margin: '0 0 16px 0' }}>
                    <OneCard width={96} style={{ background: theme.color.background1, color: "#fff", height: '175px', cursor: 'default', fontSize: theme.size.font2 }}>
                        <div style={{ margin: 'auto auto 8px auto' }}>나의 랜덤박스</div>
                        <div style={{ margin: '8px auto auto auto' }}>{commarNumber(post?.randombox) ?? <LoadingText color={"#fff"} width={15} />}</div>
                    </OneCard>
                </Row>
                <Row style={{ margin: '0 0 64px 0' }}>

                    <OneCard width={96} style={{ height: '150px', cursor: 'default' }}>
                        <InputContent title="스타" placeholder="등록할 스타 수량" class_name="send_star"
                            top_contents_margin="auto auto 0 auto"
                            top_contents={[
                                <div style={{ color: theme.color.red }}>1 Point, Star 당 3 RandomBox Point</div>
                            ]}
                            bottom_contents={[
                                <div>{commarNumber(post?.star) ?? <LoadingText width={10} />}</div>,
                                <div style={{ marginRight: '4px' }}>잔액</div>

                            ]} />
                        <InputContent title="결제비밀번호" input_type="password" class_name="payment_pw" placeholder="결제 비밀번호를 입력하세요." />

                    </OneCard>
                </Row>
                <Button onClick={registerRandomBox}>랜덤박스 등록하기</Button>
            </Wrappers>
        </>
    )
}
export default RegisterRandomBox; 