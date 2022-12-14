import { useEffect, useState } from "react";
import { OneCard, OneThirdCard, Row, Title, Wrappers } from "../../components/elements/UserContentTemplete";
import axios from "axios";
import SearchComponent from "../../components/SearchComponent";
import theme from "../../styles/theme";
import { commarNumber, getSelectButtonColor, range } from "../../functions/utils";
import styled from "styled-components";
import $ from 'jquery'
import { backUrl } from "../../data/ContentData";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import nextIcon from '../../assets/images/icon/next.svg'
import { Button } from "../../components/elements/AuthContentTemplete";
import LoadingText from "../../components/LoadingText";
import { Input } from "../../components/elements/ManagerTemplete";
import InputContent from "../../components/InputContent";
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
const BuyESGWPoint = () => {
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
    const buyESGWPoint = async () => {
        if ( !$('.point').val()  || !$('.payment_pw').val()) {
            alert("필수값이 비어 있습니다.");
            return;
        }
        if (isNaN(parseFloat($('.point').val())) && $('.point').val()) {
            alert("포인트 부분에 숫자 이외의 값이 감지되었습니다.");
            return;
        }
        if (window.confirm("저장 하시겠습니까?")) {
            let obj = {
                point: parseFloat($('.point').val()),
                payment_pw: $('.payment_pw').val().toString(),
            }
            const { data: response } = await axios.post('/api/buyesgwpoint', obj);
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
                <Title>ESGWP 구매</Title>
                <Row style={{ margin: '0 0 16px 0' }}>
                    <OneCard width={96} style={{ background: theme.color.background1, color: "#fff", height: '175px', cursor: 'default', fontSize: theme.size.font2,position:'relative' }}>
                        <div style={{ margin: 'auto auto 8px auto' }}>나의 ESGWP</div>
                        <div style={{ margin: '8px auto auto auto' }}>{commarNumber(post?.esgw) ?? <LoadingText color={"#fff"} width={15} />}</div>
                        
                    </OneCard>
                </Row>
                <Row style={{ margin: '0 0 64px 0' }}>

                    <OneCard width={96} style={{ height: '150px', cursor: 'default' }}>
                        <InputContent title="포인트" placeholder="등록할 포인트 수량" class_name="point" 
                        top_contents_margin="auto auto 0 auto"
                        top_contents={[
                            <div style={{color:theme.color.red}}>5 Point 당 1 ESGWP</div>
                        ]}
                        bottom_contents={[
                            <div>{commarNumber(post?.point) ?? <LoadingText width={10} />}</div>,
                            <div style={{ marginRight: '4px' }}>잔액</div>
                        ]} />
                        <InputContent title="결제비밀번호" input_type="password" class_name="payment_pw" placeholder="결제 비밀번호를 입력하세요." />

                    </OneCard>
                </Row>
                <Button onClick={buyESGWPoint}>ESGWP 구매하기</Button>
            </Wrappers>
        </>
    )
}
export default BuyESGWPoint; 