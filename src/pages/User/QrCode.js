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
import testQrCode from '../../assets/images/test/qrcode.png'
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
const QrCode = () => {
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
                <Title>QR코드</Title>
                <Button style={{ width: '100%', margin: '0 0 16px 0', cursor: 'default' }}>나의 QR 코드</Button>
                <Row style={{ margin: '0 0 64px 0' }}>
                    <OneCard width={96} style={{ background: '#fff', color: theme.color.font1, height: '280px', cursor: 'default', fontSize: theme.size.font2 }}>
                        <img src={testQrCode} style={{ width: '124px', height: '124px', margin: 'auto auto 8px auto', border: `2px solid ${theme.color.background1}` }} />
                        <div style={{ margin: 'auto', fontSize: '12px', lineHeight: '18px' }}>
                            결제시 <strong style={{ fontWeight: 'bold', color: theme.color.background1 }}>QR코드로 포인트</strong>를 <strong style={{ fontWeight: 'bold', color: theme.color.background1 }}>적립</strong> 및 사용하세요.<br />
                            현장에서 QR로 포인트를 주고 받을 수 있습니다.
                        </div>
                    </OneCard>
                </Row>

                <Button>QR코드 저장하기</Button>
            </Wrappers>
        </>
    )
}
export default QrCode; 