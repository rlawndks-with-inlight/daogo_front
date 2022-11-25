import { useEffect, useState } from "react";
import { OneCard, OneThirdCard, Row, Title, Wrappers } from "../../components/elements/UserContentTemplete";
import axios from "axios";
import theme from "../../styles/theme";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/elements/AuthContentTemplete";
import LoadingText from "../../components/LoadingText";
import { Input } from "../../components/elements/ManagerTemplete";
import infoCircle from '../../assets/images/icon/info-circle.svg'
import profileImg from '../../assets/images/icon/profile.svg'
import peoplesImg from '../../assets/images/icon/peoples.svg'
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
        async function fetchPosts() {

        }
        fetchPosts();
    }, [])

    return (
        <>
            <Wrappers>
                <Title>선물하기</Title>
                <Row style={{ margin: '0 0 16px 0' }}>
                    <OneCard width={96} style={{ height: '180px', cursor: 'default' }}>
                        <CardTitle title="받는사람 정보" icon={peoplesImg} />
                        <InputContent title="아이디" className="receiver_id" placeholder="받는사람 아이디" />
                        <InputContent title="휴대폰" className="receiver_phone" placeholder="받는사람 휴대폰 마지막 4자리" bottom_contents={[
                            <div style={{ marginLeft: '4px' }}>받는 사람 아이디와 휴대폰 번호를 꼼꼼히 확인해 주세요</div>,
                            <img src={infoCircle} style={{ width: '10px', height: '10px', marginTop: '2px' }} />
                        ]}
                            bottom_contents_margin={"0 auto auto auto"} />
                    </OneCard>
                </Row>
                <Row style={{ margin: '0 0 64px 0' }}>
                    <OneCard width={96} style={{ height: '240px', cursor: 'default' }}>
                        <CardTitle title="내 정보" icon={profileImg} />
                        <InputContent title="스타" placeholder="보낼 스타" className="send_star" bottom_contents={[
                            <div>{post?.star ?? <LoadingText width={10} />}</div>,
                            <div style={{ marginRight: '4px' }}>잔액</div>
                        ]} />
                        <InputContent title="포인트" placeholder="보낼 포인트" className="send_point" bottom_contents={[
                            <div>{post?.point ?? <LoadingText width={10} />}</div>,
                            <div style={{ marginRight: '4px' }}>잔액</div>
                        ]} />
                        <InputContent title="결제비밀번호" input_type="password" className="payment_pw" placeholder="결제 비밀번호를 입력하세요." />
                    </OneCard>
                </Row>
                <Button>선물하기</Button>
            </Wrappers>
        </>
    )
}
export default Gift; 