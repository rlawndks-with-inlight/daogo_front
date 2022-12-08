import { useEffect, useState } from "react";
import { OneCard, OneThirdCard, Row, Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import axios from "axios";
import theme from "../../../styles/theme";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/elements/AuthContentTemplete";
import LoadingText from "../../../components/LoadingText";
import { Input } from "../../../components/elements/ManagerTemplete";
import infoCircle from '../../../assets/images/icon/info-circle.svg'
import profileImg from '../../../assets/images/icon/profile.svg'
import peoplesImg from '../../../assets/images/icon/peoples.svg'
import InputContent from "../../../components/InputContent";
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
const CardTitle = (props) => {
    let { title, icon } = props;
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', width: '95%', maxWidth: '350px', margin: `16px auto auto auto`, fontWeight: 'bold', color: theme.color.background1 }}>
                <div>{title}</div>
                <img src={icon} style={{ marginLeft: '8px' }} />
            </div>
        </>
    )
}
const Gift = () => {
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
    const onGift = async () => {
        if (!$('.receiver_id').val() || !$('.receiver_phone').val() || (!$('.send_star').val() && !$('.send_point').val()) || !$('.payment_pw').val()) {
            alert("필수값이 비어 있습니다.");
            return;
        }
        if (isNaN(parseFloat($('.send_star').val())) && $('.send_star').val()) {
            alert("스타 부분에 숫자 이외의 값이 감지되었습니다.");
            return;
        }
        if (isNaN(parseFloat($('.send_point').val())) && $('.send_point').val()) {
            alert("포인트 부분에 숫자 이외의 값이 감지되었습니다.");
            return;
        }
        if (window.confirm("저장 하시겠습니까?")) {
            let obj = {
                receiver_id: $('.receiver_id').val(),
                receiver_phone: $('.receiver_phone').val(),
                send_star: parseFloat($('.send_star').val()),
                send_point: parseFloat($('.send_point').val()),
                payment_pw: $('.payment_pw').val(),
            }
            const { data: response } = await axios.post('/api/ongift', obj);
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
                <Title not_arrow={true} textIcon={'선물한 내역'} textIconLink={'/gift/history'}>선물하기</Title>
                <Row style={{ margin: '0 0 16px 0' }}>
                    <OneCard width={96} style={{ height: '180px', cursor: 'default' }}>
                        <CardTitle title="받는사람 정보" icon={peoplesImg} />
                        <InputContent title="아이디" class_name="receiver_id" placeholder="받는사람 아이디" />
                        <InputContent title="휴대폰" class_name="receiver_phone" placeholder="받는사람 휴대폰 마지막 4자리" bottom_contents={[
                            <div style={{ marginLeft: '4px' }}>받는 사람 아이디와 휴대폰 번호를 꼼꼼히 확인해 주세요</div>,
                            <img src={infoCircle} style={{ width: '10px', height: '10px' }} />
                        ]}
                            bottom_contents_margin={"0 auto auto auto"} />
                    </OneCard>
                </Row>
                <Row style={{ margin: '0 0 64px 0' }}>
                    <OneCard width={96} style={{ height: '240px', cursor: 'default' }}>
                        <CardTitle title="내 정보" icon={profileImg} />
                        <InputContent title="스타" placeholder="보낼 스타" class_name="send_star" bottom_contents={[
                            <div>{commarNumber(post?.star) ?? <LoadingText width={10} />}</div>,
                            <div style={{ marginRight: '4px' }}>잔액</div>
                        ]} />
                        <InputContent title="포인트" placeholder="보낼 포인트" class_name="send_point" bottom_contents={[
                            <div>{commarNumber(post?.point) ?? <LoadingText width={10} />}</div>,
                            <div style={{ marginRight: '4px' }}>잔액</div>
                        ]} />
                        <InputContent title="결제비밀번호" input_type="password" class_name="payment_pw" placeholder="결제 비밀번호를 입력하세요." />
                    </OneCard>
                </Row>
                <Button onClick={onGift}>선물하기</Button>
            </Wrappers>
        </>
    )
}
export default Gift; 