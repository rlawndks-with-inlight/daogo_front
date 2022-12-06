import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ButtonContainer from '../../../components/elements/button/ButtonContainer';
import AddButton from '../../../components/elements/button/AddButton';
import CancelButton from '../../../components/elements/button/CancelButton';
import $ from 'jquery';
import { addItem, updateItem } from '../../../functions/utils';
import { Card, Title, Input, Row, Col, ImageContainer, Select, Explain } from '../../../components/elements/ManagerTemplete';
import { managerNoteObj, objManagerListContent } from '../../../data/Manager/ManagerContentData';
import Breadcrumb from '../../../common/manager/Breadcrumb';
import { AiFillFileImage } from 'react-icons/ai';
import theme from '../../../styles/theme';
import defaultImg from '../../../assets/images/icon/default-profile.png';


const MUserEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [formData] = useState(new FormData())
    const [addressList, setAddressList] = useState([])

    useEffect(() => {

        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=user&pk=${params.pk}`)
                $('.id').val(response.data.id)
                $('.pw').val("")
                $('.name').val(response.data.name)
                $('.nickname').val(response.data.nickname)
                $('.phone').val(response.data.phone)
                $('.level').val(response.data.user_level)
                $('.parent-id').val(response.data.parent_id);
                $('.zip_code').val(response.data.zip_code)
                $('.address').val(response.data.address)
                $('.address_detail').val(response.data.address_detail)
                $('.bank_name').val(response.data.bank_name)
                $('.account_number').val(response.data.account_number)
                $('.account_name').val(response.data.account_name)
            }
        }
        fetchPost();
    }, [])
    const geocoding = async () => {
        const { data: response } = await axios.post('/api/getaddressbytext', {
            text: $('.place').val()
        });
        setAddressList(response.data ?? []);
    }
    const editUser = async () => {
        if (!$(`.id`).val() || !$(`.name`).val() ||  !$(`.phone`).val()) {
            alert('필요값이 비어있습니다.');
        } else {
            if (window.confirm(`${params.pk == 0 ? '추가하시겠습니까?' : '수정하시겠습니까?'}`)) {
                let obj = {
                    id: $(`.id`).val(),
                    name: $(`.name`).val(),
                    nickname: $(`.nickname`).val(),
                    phone: $(`.phone`).val(),
                    user_level: $(`.level`).val(),
                    parent_id: $(`.parent-id`).val(),
                }
                if (params.pk > 0) {
                    let hash_list = [];
                    if ($('.payment_pw').val()) {
                        hash_list.push('payment_pw');
                        obj['payment_pw'] = $(`.payment_pw`).val()
                    }
                    if ($('.pw').val()) {
                        hash_list.push('pw');
                        obj['pw'] = $(`.pw`).val()
                    }
                    obj['hash_list'] = hash_list;
                    obj['zip_code'] = $(`.zip_code`).val()
                    obj['address'] = $(`.address`).val()
                    obj['address_detail'] = $(`.address_detail`).val()
                    obj['bank_name'] = $(`.bank_name`).val()
                    obj['account_number'] = $(`.account_number`).val()
                    obj['account_name'] = $(`.account_name`).val()
                    obj['table'] = "user";
                    obj['pk'] = params.pk;
                    obj['reason_correction'] = $('.reason-correction').val();
                }
                obj['manager_note'] = `${$(`.id`).val()} ${params.pk>0?(managerNoteObj.UPDATE_USER):managerNoteObj.ADD_USER}`
                let api_str = '';
                params.pk == 0 ? api_str = '/api/adduser' : api_str = '/api/updateitem'
                const { data: response } = await axios.post(api_str, obj);
                if (response.result > 0) {
                    alert('성공적으로 저장되었습니다.');
                    navigate(-1);
                } else {
                    alert(response.message);
                }
            }
        }


    }
    const addFile = (e) => {
        if (e.target.files[0]) {
            setContent(e.target.files[0]);
            setUrl(URL.createObjectURL(e.target.files[0]))
        }
    };
    return (
        <>
            <Breadcrumb title={`회원 ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />
            <Card>
                <Row>
                    <Col>
                        <Title>아이디</Title>
                        <Input className='id' disabled={params.pk > 0 ? true : false} />
                    </Col>
                    <Col>
                        <Title>비밀번호</Title>
                        {params.pk > 0 ?
                            <>
                                <Input className='pw' type={'password'} placeholder='****' />
                                <Explain>변경을 원하시면 입력해 주세요.</Explain>
                            </>
                            :
                            <>
                                <Explain style={{ margin: '12px auto 6px 24px' }}>비밀번호는 a123456! 로 자동생성됩니다.</Explain>
                            </>}
                    </Col>
                    <Col>
                        <Title>이름</Title>
                        <Input className='name' />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Title>폰번호</Title>
                        <Input className='phone' />
                    </Col>
                    <Col>
                        <Title>유저레벨</Title>
                        <Select className='level'>
                            <option value={0}>일반유저</option>
                            <option value={40}>관리자</option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>추천인 아이디</Title>
                        <Input className='parent-id' disabled={params.pk > 0 ? true : false} />
                        {params.pk > 0 ?
                            <>
                            </>
                            :
                            <>
                                <Explain>한번 등록된 추천인 아이디는 수정 불가 합니다. 신중하게 작성해주세요.</Explain>
                            </>}
                    </Col>
                </Row>

                {params.pk > 0 ?
                    <>

                        <Row>
                            <Col>
                                <Title>결제 비밀번호</Title>
                                <Input type={'password'} className='payment_pw' placeholder='****' />
                                <Explain>변경을 원하시면 입력해 주세요.</Explain>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>우편번호</Title>
                                <div style={{ display: 'flex' }}>
                                    <Input className='zip_code' />
                                    <AddButton style={{ margin: '12px auto 6px 12px' }}>검색</AddButton>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>주소</Title>
                                <Input className='address' />
                            </Col>
                            <Col>
                                <Title>상세주소</Title>
                                <Input className='address_detail' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>입금은행명</Title>
                                <Input className='bank_name' />
                            </Col>
                            <Col>
                                <Title>입금계좌번호</Title>
                                <Input className='account_number' />
                            </Col>
                            <Col>
                                <Title>계좌소유자명</Title>
                                <Input className='account_name' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>관리자 수정사유</Title>
                                <Input className='reason-correction long-input' placeholder='수정 시 필수 입력' />
                            </Col>
                        </Row>
                    </>
                    :
                    <>
                    </>
                }
            </Card>
            <ButtonContainer>
                <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                <AddButton onClick={editUser}>{params.pk == 0 ? '+ 추가' : '수정'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MUserEdit;