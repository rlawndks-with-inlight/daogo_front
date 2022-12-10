import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import { Title } from './elements/UserContentTemplete';
import { formatPhoneNumber, regExp } from '../functions/utils';
import { WrapperForm, CategoryName, Input, Button, FlexBox, SnsLogo, RegularNotice } from './elements/AuthContentTemplete';
import { regularExpression } from '../data/ContentData';
import theme from '../styles/theme';

const is_test = true;
const SignUpCard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [phoneCheckIng, setPhoneCheckIng] = useState(false);
    const [isCheckId, setIsCheckId] = useState(false);
    const [isCheckNickname, setIsCheckNickname] = useState(false);
    const [isCheckPhoneNumber, setIsCheckPhoneNumber] = useState(false)
    const [randNum, setRandNum] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [num, setNum] = useState("");
    const [isCoinside, setIsCoinside] = useState(false);
    const [isSendSms, setIsSendSms] = useState(false)
    const [fixPhoneNumber, setFixPhoneNumber] = useState("")
    const [typeNum, setTypeNum] = useState(0);
    const [state, setState] = useState(undefined)
    const [coinsidePW, setCoinsidePw] = useState(true);
    useEffect(() => {
        if (params.id) {
            $('.recommend-id').val(params.id)
        }
        if (location.state) {
            setState(location.state)
        }
    }, [])
    const onCheckId = async () => {
        if (!$('.id').val()) {
            alert('아이디를 입력해주세요.');
        } else if ($('.id').val().includes(' ')) {
            alert('아이디의 공백을 제거해 주세요.');
        } else if (!regExp('id', $('.id').val())) {
            alert('아이디 정규식에 맞지 않습니다.');
        } else {
            const { data: response } = await axios.post('/api/checkexistid', { id: $('.id').val() });
            alert(response.message);
            if (response.result > 0) {
                setIsCheckId(true);
                $('.name').focus();
            } else {
                setIsCheckId(false);
            }
        }
    }
    // const onCheckNickname = async () => {
    //     if (!$('.nickname').val()) {
    //         alert('아이디를 입력해주세요.');
    //     } else if ($('.nickname').val().includes(' ')) {
    //         alert('닉네임의 공백을 제거해 주세요.');
    //     } else if (!regExp('nickname', $('.nickname').val())) {
    //         alert('닉네임 정규식에 맞지 않습니다.');
    //     } else {
    //         const { data: response } = await axios.post('/api/checkexistnickname', { nickname: $('.nickname').val() });
    //         alert(response.message);
    //         if (response.result > 0) {
    //             setIsCheckNickname(true);
    //             $('.phone').focus();
    //         } else {
    //             setIsCheckNickname(false);
    //         }
    //     }
    // }
    const sendSms = async () => {
        if (!$('.phone').val()) {
            alert("핸드폰 번호를 입력해주세요.")
            return;
        }
        setIsCheckPhoneNumber(false);
        let fix_phone = $('.phone').val().replaceAll('-', '');
        setFixPhoneNumber(fix_phone);
        let content = "";
        for (var i = 0; i < 6; i++) {
            content += Math.floor(Math.random() * 10).toString();
        }

        let string = `\n인증번호를 입력해주세요 ${content}.\n\n-We are-`;
        try {
            const { data: response } = await axios.post(`/api/sendsms`, {
                receiver: [fix_phone, formatPhoneNumber(fix_phone)],
                content: string
            })
            if (response?.result > 0) {
                alert('인증번호가 발송되었습니다.');

                setIsSendSms(true)
                setRandNum(content);
                $('phone-check').focus();
            } else {
                setIsSendSms(false)
            }
        } catch (e) {
            console.log(e)
        }
        //console.log(response)
    }
    const confirmCoincide = (e) => {
        if (randNum === $('.phone-check').val()) {
            setIsCheckPhoneNumber(true);
            alert("인증번호가 일치합니다.");
        } else {
            setIsCheckPhoneNumber(false);
            alert("인증번호가 일차하지 않습니다.");
        }
    }
    const onSignUp = async () => {
        if (!$('.id').val() || !$('.recommend-id').val() || !$('.name').val() || !$('.phone').val()) {
            alert('필수값을 입력해주세요.');
        } else if (!isCheckId) {
            alert('아이디 중복확인을 해주세요.');
        } else {
            if (window.confirm('회원가입 하시겠습니까?')) {
                const { data: response } = await axios.post('/api/adduser', {
                    id: $('.id').val(),
                    pw: "a123456!",
                    name: $('.name').val(),
                    phone: $('.phone').val(),
                    user_level: 0,
                    type_num: 0,
                    profile_img: null,
                    parent_id: $('.recommend-id').val(),
                })
                if (response.result > 0) {
                    alert('회원가입이 완료되었습니다.');
                    navigate('/login');
                } else {
                    alert(response.message);
                }
            }
        }
    }
    const onKeyPressId = (e) => {
        if (e.key == 'Enter') {
            onCheckId();
        }
    }

    const onKeyPressName = (e) => {
        if (e.key == 'Enter') {
            $('.nickname').focus();
        }
    }

    const onKeyPressPhone = (e) => {
        if (e.key == 'Enter') {
            sendSms();
        }
    }
    const onKeyPressPhoneCheck = (e) => {
        if (e.key == 'Enter') {
            confirmCoincide();
        }
    }
    const onKeyPressRecommendId = (e) => {
        if (e.key == 'Enter') {
            onSignUp();
        }
    }
    return (
        <>
            <WrapperForm onSubmit={onSignUp} id='login_form'>
                <Title>회원가입</Title>
                <RegularNotice style={{ height: 'auto', color: theme.color.font1 }}> 1.목적:회원제 서비스 이용/본인확인</RegularNotice>
                <RegularNotice style={{ height: 'auto', color: theme.color.font1 }}>2.항목:이름,ID,전화번호,주민등록번호,계좌번호,이메일</RegularNotice>
                <RegularNotice style={{ height: 'auto', color: theme.color.font1 }}>3.보유기간:탈퇴 즉시 <br /> 개인정보 수집·이용 귀하께서는 플랫폼에서 위와 같이 수집하는 개인정보에 대해, 동의하지 않거나 개인정보를 기재하지 않음으로써 거부할 수 있습니다. 다만, 이때 회원에게 제공되는 서비스가 제한될 수 있습니다.</RegularNotice>
                <CategoryName>아이디</CategoryName>
                <Input placeholder='아이디를 입력해주세요.' type={'text'} className='id' disabled={isCheckId} onKeyPress={onKeyPressId} />
                <RegularNotice>5~20자 내의 영문, 숫자 조합만 가능합니다.</RegularNotice>
                <Button onClick={onCheckId} disabled={isCheckId}>{isCheckId ? '사용가능' : '중복확인'}</Button>
                <CategoryName>비밀번호</CategoryName>
                <RegularNotice>a123456! 으로 자동생성 됩니다.</RegularNotice>
                <CategoryName>회원명</CategoryName>
                <Input placeholder='이름을 입력해주세요.' type={'text'} className='name' onKeyPress={onKeyPressName} />
                <CategoryName>전화번호</CategoryName>
                {/* <CategoryName style={{ marginTop: '8px', fontSize: '12px' }}>- 아이디 찾기 및 비밀번호 찾기에 이용됩니다.</CategoryName> */}
                <Input placeholder='전화번호를 입력해주세요.' type={'text'} className='phone' disabled={isCheckPhoneNumber} onKeyPress={onKeyPressPhone} />
                {/* <RegularNotice></RegularNotice>
                <Button onClick={sendSms} disabled={isCheckPhoneNumber}>인증번호 발송</Button>
                <Input style={{ marginTop: '36px' }} placeholder='인증번호를 입력해주세요.' type={'text'} className='phone-check' disabled={isCheckPhoneNumber} onKeyPress={onKeyPressPhoneCheck} />
                <RegularNotice></RegularNotice>
                <Button onClick={confirmCoincide} disabled={isCheckPhoneNumber}>{isCheckPhoneNumber ? '확인완료' : '인증번호 확인'}</Button> */}
                <CategoryName>추천인 아이디</CategoryName>
                <Input placeholder='아이디를 입력해주세요.' type={'text'} className='recommend-id' onKeyPress={onKeyPressRecommendId} />
                <Button style={{ marginTop: '36px' }} onClick={onSignUp}>회원가입</Button>
                {/* <CategoryName>SNS 간편 회원가입</CategoryName>
                <FlexBox>
                    <SnsLogo src={kakao} />
                    <SnsLogo src={naver} />
                </FlexBox> */}

            </WrapperForm>
        </>
    );
};
export default SignUpCard;