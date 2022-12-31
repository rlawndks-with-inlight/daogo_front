import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Title, ViewerContainer, Wrappers } from "../../../components/elements/UserContentTemplete";
import { backUrl } from "../../../data/Manager/ManagerContentData";
import defaultImg from '../../../assets/images/icon/default-profile.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdEdit } from 'react-icons/md';
import theme from "../../../styles/theme";
import { CgToggleOn, CgToggleOff } from 'react-icons/cg'
import { commarNumber, dateFormat } from "../../../functions/utils";
import { Viewer } from "@toast-ui/react-editor";

const MyCard = styled.div`
display:flex;
width:100%;
height:250px;
border:1px solid ${props => props.theme.color.background3};
@media screen and (max-width:700px) {
    flex-direction:column;
    height:500px;
}
`
const ProfileContainer = styled.div`
width:50%;
display:flex;
flex-direction:column;
align-items:center;
height:250px;
background:#f4f4f4;
@media screen and (max-width:700px) {
    width:100%;
}
`
const Container = styled.div`
width:50%;
font-size:14px;
@media screen and (max-width:700px) {
    width:100%;
}
`
const Content = styled.div`
width:100%;
display:flex;
`
const Category = styled.div`
width:120px;
padding:16px 0;
height:18px;
padding-left:16px;
border-right:1px solid ${props => props.theme.color.background1};
`
const Result = styled.div`
padding:16px 0;
height:18px;
padding-left:16px;
display:flex;
align-items:center;
`
const LogoutButton = styled.button`
width:160px;
height:40px;
margin:1rem auto;
border:none;
cursor:pointer;
background:${props => props.theme.color.font2};
color:#fff;
font-size:12px;
`
const MyPage = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({})
    const [isWebView, setIsWebView] = useState(false);

    useEffect(() => {
        async function isAdmin() {
            const { data: response } = await axios.get('/api/getmypagecontent')
            let get_score_by_tier = { 0: 0, 5: 36, 10: 120, 15: 360, 20: 600, 25: 1200 };
            if (response.result > 0) {
                let obj = { ...response.data };
                let marketing_price = 0;
                for (var i = 0; i < obj?.marketing?.length; i++) {
                    let explain_obj = JSON.parse(obj?.marketing[i]?.explain_obj);
                    marketing_price += get_score_by_tier[explain_obj?.tier];
                }
                obj['marketing_price'] = marketing_price;
                let withdraw_won = 0;
                for (var i = 0; i < obj?.withdraw?.length; i++) {
                    let explain_obj = JSON.parse(obj?.withdraw[i]?.explain_obj);
                    if (explain_obj['receipt_won'] && explain_obj['status'] == 2) {
                        withdraw_won += obj?.withdraw[i]?.price * (-100);
                    }
                }
                obj['withdraw_won'] = withdraw_won;
                setAuth(obj);
            } else {
                alert(response.message);
                navigate('/login')
            }
        }
        isAdmin();
    }, [])
    const onLogout = async () => {
        if (window.confirm('정말 로그아웃 하시겠습니까?')) {
            const { data: response } = await axios.post('/api/logout');
            if (response.result > 0) {
                localStorage.removeItem('auth');
                navigate('/login');
            } else {
                alert('error');
            }
        }
    }

    return (
        <>
            <Wrappers className="wrapper" style={{ maxWidth: '900px' }}>
                <Title not_arrow={true}>마이페이지</Title>
                <MdEdit style={{ margin: '2rem 0 1rem auto', color: `${theme.color.font2}`, fontSize: '24px', cursor: 'pointer' }} onClick={() => navigate('/editmyinfo')} />

                <MyCard>
                    <Container>
                        <Content>
                            <Category>이름</Category>
                            <Result>
                                {auth?.user?.name ?? "---"}
                            </Result>
                        </Content>
                        <Content>
                            <Category>아이디</Category>
                            <Result>
                                {auth?.user?.id ?? "---"}
                            </Result>
                        </Content>
                        <Content>
                            <Category>비밀번호</Category>
                            <Result>********</Result>
                        </Content>
                        <Content>
                            <Category>전화번호</Category>
                            <Result>{auth?.user?.phone ?? "---"}</Result>
                        </Content>
                        <Content>
                            <Category>가입일</Category>
                            <Result>{auth?.user?.date ? auth?.user?.date?.substring(0, 10) : "---"}</Result>
                        </Content>

                    </Container>
                    <Container>
                        <Content>
                            <Category>가입기간</Category>
                            <Result>
                                {dateFormat(auth?.user?.date, true)}
                            </Result>
                        </Content>
                        <Content>
                            <Category>총 매출액</Category>
                            <Result>
                                {commarNumber(auth?.marketing_price * 10000 ?? 0)} 원
                            </Result>
                        </Content>
                        <Content>
                            <Category>총 출금액</Category>
                            <Result> {commarNumber(auth?.withdraw_won ?? 0)} 원</Result>
                        </Content>
                        <Content>
                            <Category>총 쇼핑 사용 금액</Category>
                            <Result>{(auth?.purchase_star?.purchase_star ? commarNumber(auth?.purchase_star?.purchase_star * (-1)) : "---")} 스타 / {(auth?.purchase_point?.purchase_point ? commarNumber(auth?.purchase_point?.purchase_point * (-1)) : "---")} 포인트</Result>
                        </Content>
                        <Content>
                            <Category>개인정보동의</Category>
                            <Result>{'동의'}</Result>
                        </Content>

                    </Container>
                </MyCard>
                <Title not_arrow={true}>관리자 메모</Title>
                <ViewerContainer className="viewer" >
                    <Viewer initialValue={auth?.user?.note ?? `<body>관리자 메모 없음.</body>`} />
                </ViewerContainer>
                <LogoutButton onClick={onLogout}>
                    로그아웃
                </LogoutButton>
                {/* 
                <LogoutButton onClick={() => navigate('/appsetting')}>
                    설정
                </LogoutButton> */}


            </Wrappers>
        </>
    )
}
export default MyPage;