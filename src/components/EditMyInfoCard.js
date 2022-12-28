import { useEffect, useState } from "react";
import styled from "styled-components";
import { WrapperForm, CategoryName, Input, Button, FlexBox, SnsLogo, RegularNotice } from './elements/AuthContentTemplete';
import { Title, SelectType } from "./elements/UserContentTemplete";
import theme from "../styles/theme";
import $ from 'jquery';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumber, regExp } from "../functions/utils";
import defaultImg from '../assets/images/icon/default-profile.png';
import { backUrl, historyContent } from "../data/ContentData";
import ContentTable from "./ContentTable";


const Type = styled.div`
width:50%;
text-align:center;
padding: 0.75rem 0;
font-weight:bold;
cursor:pointer;
font-size:1rem;
@media screen and (max-width:700px) {
    font-size:0.8rem;
}
@media screen and (max-width:350px) {
    font-size:0.65rem;
}
`
const EditMyInfoCard = () => {
    const navigate = useNavigate();
    const [typeNum, setTypeNum] = useState(0);

    const [myPk, setMyPk] = useState(0);
    const [myId, setMyId] = useState("");
    const [auth, setAuth] = useState({})
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [formData] = useState(new FormData())
    const [isExistIdCard, setIsExistIdCard] = useState(false)

    const zType = [
        { title: "프로필 변경" },
        { title: "비밀번호 변경" },
        { title: "결제 비밀번호 변경" },
        //{ title: "휴대폰 번호 변경" }
    ];
    useEffect(() => {
        async function isAuth() {
            const { data: response } = await axios.get('/api/auth');
            setAuth(response)
            $('.zip-code').val(response?.zip_code)
            $('.address').val(response?.address)
            $('.address-detail').val(response?.address_detail)
            $('.bank-name').val(response?.bank_name)
            $('.account-number').val(response?.account_number)
            $('.account-name').val(response?.account_name)
            $('.phone').val(response?.phone)
            setUrl(response?.profile_img ? (backUrl + response?.profile_img) : "")
            if (response?.profile_img) {
                setIsExistIdCard(true);
            }
        }
        isAuth();
    }, [])

    const onChangeTypeNum = async (num) => {
        setTypeNum(num);
        if (num != typeNum) {
            if (num == 0 || num == 3) {
                await new Promise((r) => setTimeout(r, 300));
                console.log(auth)
                $('.zip-code').val(auth?.zip_code)
                $('.address').val(auth?.address)
                $('.address-detail').val(auth?.address_detail)
                $('.bank-name').val(auth?.bank_name)
                $('.account-number').val(auth?.account_number)
                $('.account-name').val(auth?.account_name)
                $('.phone').val(auth?.phone)
            }
        }
    }
    const addFile = (e) => {
        if (e.target.files[0]) {
            setContent(e.target.files[0]);
            setUrl(URL.createObjectURL(e.target.files[0]));
        }
    };
    const onSave = async (num) => {
        if (num == 0) {
            formData.append('profile', content);
            formData.append('zip_code', $('.zip-code').val());
            formData.append('address', $('.address').val());
            formData.append('address_detail', $('.address-detail').val());
            formData.append('bank_name', $('.bank-name').val());
            formData.append('account_number', $('.account-number').val());
            formData.append('account_name', $('.account-name').val());
            formData.append('pw', $('.pw').val());
        } else if (num == 1) {
            if (!$('.new-pw').val() || !$('.new-pw-check').val() || !$('.pw').val()) {
                alert("필요값이 비어있습니다.");
                return;
            }
            if ($('.new-pw').val() !== $('.new-pw-check').val()) {
                alert("새 비밀번호가 일치하지 않습니다.");
                return;
            }
            formData.append('pw', $('.pw').val());
            formData.append('new_pw', $('.new-pw').val());
        } else if (num == 2) {
            if (!$('.payment-pw').val() || !$('.payment-pw-check').val() || !$('.pw').val()) {
                alert("필요값이 비어있습니다.");
                return;
            }
            if ($('.payment-pw').val() !== $('.payment-pw-check').val()) {
                alert("결제 비밀번호가 일치하지 않습니다.");
                return;
            }
            formData.append('pw', $('.pw').val());
            formData.append('payment_pw', $('.payment-pw').val().toString());
        } else if (num == 3) {
            if (!$('.phone').val() || !$('.pw').val()) {
                alert("필요값이 비어있습니다.");
                return;
            }
            formData.append('pw', $('.pw').val());
            formData.append('phone', $('.phone').val());
        }
        formData.append('type', num);
        const { data: response } = await axios.post('/api/editmyinfo', formData);
        if (response?.result < 0) {
            alert(response.message);
            formData.delete('profile');
            //formData.delete('zip_code');
            //formData.delete('address');
            //formData.delete('address_detail');
            formData.delete('bank_name');
            formData.delete('account_number');
            formData.delete('account_name');
            formData.delete('pw');
            formData.delete('new_pw');
            formData.delete('payment_pw');
            formData.delete('phone');
            formData.delete('type');
        } else {
            alert('성공적으로 수정되었습니다.');
            navigate('/mypage');
        }
    }
    return (
        <>
            <WrapperForm>
                <Title>개인정보 수정</Title>
                <SelectType className="select-type">
                    {zType.map((item, idx) => (
                        <>
                            <Type style={{ borderBottom: `4px solid ${typeNum == idx ? theme.color.background1 : '#F6F6F5'}`, color: `${typeNum == idx ? theme.color.background1 : (localStorage.getItem('dark_mode') ? '#fff' : '#ccc')}` }} onClick={() => { onChangeTypeNum(idx) }}>{item.title}</Type>
                        </>
                    ))}

                </SelectType>
                {typeNum === 0 ?
                    <>
                        <CategoryName>신분증 업로드</CategoryName>
                        {isExistIdCard ?
                            <>
                                <label style={{ margin: '0 auto' }}>
                                    <img src={url} alt="#"
                                        style={{
                                            width: '12rem', height: '6rem',
                                            margin: '2rem auto'
                                        }} />
                                </label>
                            </>
                            :
                            <>
                                <label for="file1" style={{ margin: '0 auto' }}>
                                    {url ?
                                        <>
                                            <img src={url} alt="#"
                                                style={{
                                                    width: '12rem', height: '6rem',
                                                    margin: '2rem auto'
                                                }} />
                                        </>
                                        :
                                        <>
                                            <img src={defaultImg} alt="#"
                                                style={{
                                                    width: '8rem', height: '8rem',
                                                    margin: '2rem auto'
                                                }} />
                                        </>}
                                </label>
                                <div>
                                    <input type="file" id="file1" onChange={addFile} style={{ display: 'none' }} />
                                </div>
                            </>
                        }

                        {/* <CategoryName>우편번호</CategoryName>
                        <Input className="zip-code" placeholder="예) 12345" onKeyPress={(e) => e.key == 'Enter' ? $('.address').focus() : null}  disabled={true} />
                        <CategoryName>주소</CategoryName>
                        <Input className="address" placeholder="예) XX시 YY구 ZZ동 111-11" onKeyPress={(e) => e.key == 'Enter' ? $('.address-detail').focus() : null}  disabled={true} />
                        <CategoryName>상세주소</CategoryName>
                        <Input className="address-detail" placeholder="예) XX동 YY호" onKeyPress={(e) => e.key == 'Enter' ? $('.bank-name').focus() : null}  disabled={true} /> */}
                        <CategoryName>입금은행명</CategoryName>
                        <Input className="bank-name" placeholder="예) 농협" onKeyPress={(e) => e.key == 'Enter' ? $('.account-number').focus() : null} disabled={true} />
                        <CategoryName>입금계좌번호</CategoryName>
                        <Input className="account-number" placeholder="예) 1234567890" onKeyPress={(e) => e.key == 'Enter' ? $('.account-name').focus() : null}  disabled={true}  />
                        <CategoryName>계좌소유자명</CategoryName>
                        <Input className="account-name" placeholder="홍길동" onKeyPress={(e) => e.key == 'Enter' ? $('.pw').focus() : null}  disabled={true} />
                        <CategoryName>비밀번호</CategoryName>
                        <Input className="pw" type={'password'} placeholder="확인을 위하여 입력해주세요." onKeyPress={(e) => e.key == 'Enter' ? onSave(typeNum) : null}  />
                    </>
                    :
                    <>
                    </>}
                {typeNum === 1 ?
                    <>
                        <CategoryName>현재 비밀번호</CategoryName>
                        <Input className="pw" type={'password'} placeholder="확인을 위하여 입력해주세요." onKeyPress={(e) => e.key == 'Enter' ? $('.new-pw').focus() : null} />
                        <CategoryName>새 비밀번호</CategoryName>
                        <Input className="new-pw" type={'password'} placeholder="변경을 원하시면 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? $('.new-pw-check').focus() : null} />
                        <CategoryName>새 비밀번호 확인</CategoryName>
                        <Input className="new-pw-check" type={'password'} placeholder="변경을 원하시면 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? onSave(typeNum) : null} />
                    </>
                    :
                    <>
                    </>}
                {typeNum === 2 ?
                    <>
                        <CategoryName>비밀번호</CategoryName>
                        <Input className="pw" type={'password'} placeholder="확인을 위하여 입력해주세요." onKeyPress={(e) => e.key == 'Enter' ? $('.payment-pw').focus() : null} />
                        <CategoryName>결제비밀번호</CategoryName>
                        <Input className="payment-pw" type={'password'} placeholder="변경을 원하시면 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? $('.payment-pw-check').focus() : null} />
                        <CategoryName>결제비밀번호 확인</CategoryName>
                        <Input className="payment-pw-check" type={'password'} placeholder="변경을 원하시면 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? onSave(typeNum) : null} />
                    </>
                    :
                    <>
                    </>}
                {/* {typeNum === 3 ?
                    <>
                        <CategoryName>휴대폰번호</CategoryName>
                        <Input className="phone" placeholder="확인을 위하여 입력해주세요." onKeyPress={(e) => e.key == 'Enter' ? $('.pw').focus() : null} />
                        <CategoryName>비밀번호</CategoryName>
                        <Input className="pw" type={'password'} placeholder="확인을 위하여 입력해주세요." onKeyPress={(e) => e.key == 'Enter' ? onSave(typeNum) : null} />
                    </>
                    :
                    <>
                    </>} */}

                <Button style={{ marginTop: '36px' }} onClick={() => onSave(typeNum)}>저장</Button>

            </WrapperForm>
        </>
    )
}
export default EditMyInfoCard;