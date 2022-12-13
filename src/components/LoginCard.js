import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import { WrapperForm, CategoryName, Input, Button, FlexBox, SnsLogo } from './elements/AuthContentTemplete';
import ReCAPTCHA from "react-google-recaptcha";
const LoginCard = () => {
    const navigate = useNavigate();
    const [isWebView, setIsWebView] = useState(false);
    const [isCapcha, setIsCapCha] = useState('')
    useEffect(() => {
        async function isAdmin() {
            const { data: response } = await axios.get('/api/auth', {
                headers: {
                    'Content-type': 'application/json',
                }
            },
                { withCredentials: true });
            if (response.pk > 0) {
                localStorage.setItem('auth', JSON.stringify(response))
                navigate('/home');
            } else {
                localStorage.removeItem('auth')
            }
        }
        isAdmin();
    }, [])
    const onLogin = async () => {
         if(!isCapcha){
             alert('보안인증 체크를 완료해 주세요');
             return;
         }
        const { data: response } = await axios.post('/api/loginbyid', {
            id: $('.id').val(),
            pw: $('.pw').val(),
            type: 'user'
        })
        alert(response.message);
        if (response.result > 0) {
            await localStorage.setItem('auth', JSON.stringify(response?.data?.user));
            navigate('/home');
             if(response?.data?.is_user_lottery_today){
                 navigate('/home');
             }else{
                 navigate('/randombox/lottery');
         }
        }
    }
    const onKeyPressId = (e) => {
        if (e.key == 'Enter') {
            $('.pw').focus();
        }
    }
    const onKeyPressPw = (e) => {
        if (e.key == 'Enter') {
            onLogin();
        }
    }
    
    function onChange(value) {
        setIsCapCha(value)
    }
    return (
        <>
            <WrapperForm onSubmit={onLogin} id='login_form'>

                <CategoryName>가입 정보로 로그인</CategoryName>
                <Input placeholder='아이디를 입력해주세요.' type={'text'} className='id' onKeyPress={onKeyPressId} />
                <Input placeholder='비밀번호를 입력해주세요.' type={'password'} className='pw' onKeyPress={onKeyPressPw} />
                <FlexBox style={{ justifyContent: 'space-between', fontSize: '11px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type={'checkbox'} className='login-lock' style={{ border: '1px solid #000', outline: 'none', borderRadius: '0' }} />
                        <div>로그인 상태 유지</div>
                    </div>
                    <div style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/findmyinfo')}>
                        아이디/비밀번호 찾기
                    </div>
                </FlexBox>
                <CategoryName style={{ margin: '0 auto 16px auto'}}>
                <ReCAPTCHA
                    sitekey='6Lce0xIjAAAAAEq66SbiwjiAt1geLBvUSn9YL1uM'
                    onChange={onChange}
                />
                </CategoryName>
                
                <Button onClick={onLogin}>로그인</Button>

                <CategoryName style={{ marginTop: '16px', fontSize: '11px' }}>
                    아직 daogo 회원이 아니라면?<strong style={{ textDecoration: 'underline', cursor: 'pointer', marginLeft: '12px' }} onClick={() => { navigate('/signup') }}>회원가입</strong>
                </CategoryName>
            </WrapperForm>
        </>
    );
};
export default LoginCard