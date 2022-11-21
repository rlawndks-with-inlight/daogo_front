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
import { objManagerListContent } from '../../../data/Manager/ManagerContentData';
import Breadcrumb from '../../../common/manager/Breadcrumb';


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
                $('.user_level').val(response.data.user_level)
            }
        }
        fetchPost();
    }, [])
    const geocoding = async () => {
        const { data: response } = await axios.post('/api/getaddressbytext', {
            text: $('.place').val()
        });
        console.log(response)
        setAddressList(response.data ?? []);
    }
    const editUser = () => {
        if (!$(`.id`).val() || !$(`.name`).val() || !$(`.nickname`).val() || !$(`.phone`).val()) {
            alert('필요값이 비어있습니다.');
        } else {
            let obj = {
                id: $(`.id`).val(),
                pw: `${params == 0 ? 'a123456!' : $(`.pw`).val()}`,
                name: $(`.name`).val(),
                nickname: $(`.nickname`).val(),
                phone: $(`.phone`).val(),
                user_level: $(`.user_level`).val(),
                parent_id: $('.parent_id').val()
            }
            if (params.pk > 0) {
                obj.payment_pw = $('.payment_pw').val();
                obj.zip_code = $('.zip_code').val();
                obj.address = $('.address').val();
                obj.address_detail = $('.address_detail').val();
                obj.bank_name = $('.bank_name').val();
                obj.account_number = $('.account_number').val();
                obj.account_name = $('.account_name').val();
            }
            if (window.confirm(`${params.pk == 0 ? '추가하시겠습니까?' : '수정하시겠습니까?'}`)) {

                params.pk == 0 ? addItem('user', obj) : updateItem('user', obj);
            }
        }


    }
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
                        <Title>닉네임</Title>
                        <Input className='nickname' />
                    </Col>
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
                        <Input className='parent_id' disabled={params.pk > 0 ? true : false} />
                        <Explain>한번 등록된 추천인 아이디는 수정 불가 합니다. 신중하게 작성해주세요.</Explain>
                    </Col>
                </Row>

                {params.pk > 0 ?
                    <>
                        <Row>
                            <Col>
                                <Title>결제 비밀번호</Title>
                                <Input type={'password'} className='payment_pw' placeholder='****' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>우편번호</Title>
                                <div style={{display:'flex'}}>
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