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
import LoadingText from '../../../components/LoadingText';
import { AiFillStar } from 'react-icons/ai'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { FaMoneyBillWave } from 'react-icons/fa'
import theme from '../../../styles/theme';
const MUserMoneyEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({})
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
                setUser(response.data);
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
            <Breadcrumb title={`회원 머니 ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />

            <Card>
                <Row>
                    <Col>
                        <Title><div>아이디</div></Title>
                        <Explain style={{ margin: '12px auto 6px 24px', width: '218px' }}>{user?.id ?? <LoadingText width={15} />}</Explain>
                    </Col>
                    <Col>
                        <Title>이름</Title>
                        <Explain style={{ margin: '12px auto 6px 24px', width: '218px' }}>{user?.name ?? <LoadingText width={15} />}</Explain>
                    </Col>
                    <Col>
                        <Title>휴대폰번호</Title>
                        <Explain style={{ margin: '12px auto 6px 24px', width: '218px' }}>{user?.phone ?? <LoadingText width={15} />}</Explain>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title style={{ display: 'flex', alignItems: 'center' }}><div style={{ marginRight: '4px' }}>스타</div><AiFillStar style={{ color: theme.color.background1 }} /></Title>
                        <Input className='star' />
                        <Explain style={{ display: 'flex', alignItems: 'center' }}><div>NOW: </div><div>{user?.star ?? <LoadingText width={13} />}</div></Explain>
                    </Col>
                    <Col>
                        <Title>증감</Title>
                        <Select className='star-increase'>
                            <option value={1}>+</option>
                            <option value={0}>-</option>
                        </Select>
                    </Col>
                    <Col>
                        <Title>변동사유</Title>
                        <Input className='star-note' placeholder='스타 변동사유를 적어주세요.' />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title style={{ display: 'flex', alignItems: 'center' }}><div style={{ marginRight: '4px' }}>포인트</div><FaMoneyBillWave style={{ color: theme.color.background1 }} /></Title>
                        <Input className='point' />
                        <Explain style={{ display: 'flex', alignItems: 'center' }}><div>NOW: </div><div>{user?.point ?? <LoadingText width={13} />}</div></Explain>
                    </Col>
                    <Col>
                        <Title>증감</Title>
                        <Select className='point-increase'>
                            <option value={1}>+</option>
                            <option value={0}>-</option>
                        </Select>
                    </Col>
                    <Col>
                        <Title>변동사유</Title>
                        <Input className='point-note' placeholder='포인트 변동사유를 적어주세요.' />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title style={{ display: 'flex', alignItems: 'center' }}><div style={{ marginRight: '4px' }}>랜덤박스</div><GiPerspectiveDiceSixFacesRandom style={{ color: theme.color.background1 }} /></Title>
                        <Input className='randombox' />
                        <Explain style={{ display: 'flex', alignItems: 'center' }}><div>NOW: </div><div>{user?.randombox ?? <LoadingText width={13} />}</div></Explain>
                    </Col>
                    <Col>
                        <Title>증감</Title>
                        <Select className='randombox-increase'>
                            <option value={1}>+</option>
                            <option value={0}>-</option>
                        </Select>
                    </Col>
                    <Col>
                        <Title>변동사유</Title>
                        <Input className='randombox-note' placeholder='랜덤박스 변동사유를 적어주세요.' />
                    </Col>
                </Row>
            </Card>
            <ButtonContainer>
                <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                <AddButton onClick={editUser}>{params.pk == 0 ? '+ 추가' : '수정'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MUserMoneyEdit;