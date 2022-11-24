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
        async function fetchPosts() {

        }
        fetchPosts();
    }, [])

    return (
        <>
            <Wrappers>
                <Title>랜덤박스등록</Title>
                <Row style={{ margin: '0 0 16px 0' }}>
                    <OneCard width={96} style={{ background: theme.color.background1, color: "#fff", height: '175px', cursor: 'default', fontSize: theme.size.font2 }}>
                        <div style={{ margin: 'auto auto 8px auto' }}>나의 랜덤박스</div>
                        <div style={{ margin: '8px auto auto auto' }}>{post?.randombox_point ?? <LoadingText color={"#fff"} width={15} />}</div>
                    </OneCard>
                </Row>
                <Row style={{ margin: '0 0 64px 0' }}>
                    <OneCard width={96} style={{ height: '150px', cursor: 'default' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '350px', margin: 'auto auto 0 auto' }}>
                            <div style={{ fontSize: theme.size.font4, fontWeight: 'bold' }}>스타</div>
                            <Input style={{ margin: '0' }} />
                        </div>
                        <div style={{ margin: '0 0 16px auto', display: 'flex', alignItems: 'center', fontSize: theme.size.font6, color: theme.color.background1 }}><div style={{ marginRight: '4px' }}>잔액</div><div>{post?.randombox_point ?? <LoadingText width={10} />}</div></div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '350px', margin: '0 auto auto auto' }}>
                            <div style={{ fontSize: theme.size.font4, fontWeight: 'bold' }}>결제비밀번호</div>
                            <Input style={{ margin: '0' }} type={'password'} />
                        </div>
                    </OneCard>
                </Row>
                <Button>랜덤박스 등록하기</Button>
            </Wrappers>
        </>
    )
}
export default RegisterRandomBox; 