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
        async function fetchPosts() {

        }
        fetchPosts();
    }, [])

    return (
        <>
            <Wrappers>
                <Title>ESGW Point 구매</Title>
                <Row style={{ margin: '0 0 16px 0' }}>
                    <OneCard width={96} style={{ background: theme.color.background1, color: "#fff", height: '175px', cursor: 'default', fontSize: theme.size.font2 }}>
                        <div style={{ margin: 'auto auto 8px auto' }}>나의 ESGW Point</div>
                        <div style={{ margin: '8px auto auto auto' }}>{post?.esgw ?? <LoadingText color={"#fff"} width={15} />}</div>
                    </OneCard>
                </Row>
                <Row style={{ margin: '0 0 64px 0' }}>

                    <OneCard width={96} style={{ height: '150px', cursor: 'default' }}>
                        <InputContent title="포인트" placeholder="등록할 포인트 수량" className="point" 
                        top_contents_margin="auto auto 0 auto"
                        top_contents={[
                            <div style={{color:'#ff0000'}}>10 Point 당 1 ESGW Point</div>
                        ]}
                        bottom_contents={[
                            <div>{post?.star ?? <LoadingText width={10} />}</div>,
                            <div style={{ marginRight: '4px' }}>잔액</div>
                        ]} />
                        <InputContent title="결제비밀번호" input_type="password" className="payment_pw" placeholder="결제 비밀번호를 입력하세요." />

                    </OneCard>
                </Row>
                <Button>ESGW Point 구매하기</Button>
            </Wrappers>
        </>
    )
}
export default BuyESGWPoint; 