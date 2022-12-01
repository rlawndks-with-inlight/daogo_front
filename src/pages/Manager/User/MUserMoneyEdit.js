import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ButtonContainer from '../../../components/elements/button/ButtonContainer';
import AddButton from '../../../components/elements/button/AddButton';
import CancelButton from '../../../components/elements/button/CancelButton';
import $ from 'jquery';
import { addItem, commarNumber, updateItem } from '../../../functions/utils';
import { Card, Title, Input, Row, Col, ImageContainer, Select, Explain } from '../../../components/elements/ManagerTemplete';
import { objManagerListContent } from '../../../data/Manager/ManagerContentData';
import Breadcrumb from '../../../common/manager/Breadcrumb';
import LoadingText from '../../../components/LoadingText';
import { AiFillStar } from 'react-icons/ai'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { FaMoneyBillWave } from 'react-icons/fa'
import theme from '../../../styles/theme';
import { SiHiveBlockchain } from 'react-icons/si';
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
                const { data: response } = await axios.get(`/api/getusermoney?pk=${params.pk}`);
                let user_obj = {...response?.data?.user};
                console.log(response?.data)
                user_obj['star'] = response?.data?.star.star??0;
                user_obj['point'] = response?.data?.point?.point??0;
                user_obj['randombox'] = response?.data?.randombox?.randombox??0;
                user_obj['esgw'] = response?.data?.esgw?.esgw??0;
                setUser(user_obj);
                console.log(user_obj)
            } else {
                navigate(-1);
            }
        }
        fetchPost();
    }, [])

    const editUserMoney = async () => {
        if (!$(`.reason-correction`).val()) {
            alert('필요값이 비어있습니다.');
        } else {
            let obj = {};
            if (params.pk > 0) {
                let manager_note = "";
                manager_note += `${user.id}(${user.name}) 회원 `
                let money_categories = [{en:"star",kor:"스타",column:"star"},{en:"point",kor:"포인트",column:"point"},{en:"randombox",kor:"랜덤박스포인트",column:"randombox"},{en:"esgw",kor:"ESGW포인트",column:"esgw"},];
                let edit_list = [];
                for(var i = 0;i<money_categories.length;i++){
                    if ($(`.${money_categories[i].en}`).val()) {
                        if(isNaN(parseFloat($(`.${money_categories[i].en}`).val()))){
                            alert(`${money_categories[i].kor}에 숫자 이외의 값이 감지되었습니다.`);
                            return;
                        }
                        let price = 0;
                        if($(`.${money_categories[i].en}-increase`).val()==1){
                            price = price + (parseFloat($(`.${money_categories[i].en}`).val()));
                        }else{
                            price = price - (parseFloat($(`.${money_categories[i].en}`).val()));
                        }
                        manager_note += `${money_categories[i].kor},`;
                        edit_list.push({
                            price:price,
                            type:money_categories[i].en,
                            note:$(`.${money_categories[i].en}-note`).val()
                        })
                    }
                }
                obj.edit_list = edit_list;
                manager_note = manager_note.substring(0, manager_note.length - 1);
                manager_note += "을(를) 수정했습니다."
                obj.pk = params.pk;
                obj.reason_correction = $('.reason-correction').val();
                obj.manager_note = manager_note;
            }
            if (window.confirm('수정하시겠습니까?')) {
                const { data: response } = await axios.post('/api/updateusermoneybymanager', obj);
                console.log(response)
                if (response.result > 0) {
                    alert('성공적으로 저장되었습니다.');
                    navigate(-1);
                } else {
                    alert(response.message);
                }
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
                        <Input className='star' placeholder='숫자만 입력해 주세요.' />
                        <Explain style={{ display: 'flex', alignItems: 'center' }}><div>NOW:&nbsp;</div><div>{commarNumber(user?.star) ?? <LoadingText width={13} />}</div></Explain>
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
                        <Input className='star-note long-input' placeholder='스타 변동사유를 적어주세요.' />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title style={{ display: 'flex', alignItems: 'center' }}><div style={{ marginRight: '4px' }}>포인트</div><FaMoneyBillWave style={{ color: theme.color.background1 }} /></Title>
                        <Input className='point' placeholder='숫자만 입력해 주세요.' />
                        <Explain style={{ display: 'flex', alignItems: 'center' }}><div>NOW:&nbsp;</div><div>{commarNumber(user?.point) ?? <LoadingText width={13} />}</div></Explain>
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
                        <Input className='point-note long-input' placeholder='포인트 변동사유를 적어주세요.' />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title style={{ display: 'flex', alignItems: 'center' }}><div style={{ marginRight: '4px' }}>랜덤박스</div><GiPerspectiveDiceSixFacesRandom style={{ color: theme.color.background1 }} /></Title>
                        <Input className='randombox' placeholder='숫자만 입력해 주세요.' />
                        <Explain style={{ display: 'flex', alignItems: 'center' }}><div>NOW:&nbsp;</div><div>{commarNumber(user?.randombox) ?? <LoadingText width={13} />}</div></Explain>
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
                        <Input className='randombox-note long-input' placeholder='랜덤박스 변동사유를 적어주세요.' />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title style={{ display: 'flex', alignItems: 'center' }}><div style={{ marginRight: '4px' }}>ESGW 포인트</div><SiHiveBlockchain style={{ color: theme.color.background1 }} /></Title>
                        <Input className='esgw' placeholder='숫자만 입력해 주세요.' />
                        <Explain style={{ display: 'flex', alignItems: 'center' }}><div>NOW:&nbsp;</div><div>{commarNumber(user?.esgw) ?? <LoadingText width={13} />}</div></Explain>
                    </Col>
                    <Col>
                        <Title>증감</Title>
                        <Select className='esgw-increase'>
                            <option value={1}>+</option>
                            <option value={0}>-</option>
                        </Select>
                    </Col>
                    <Col>
                        <Title>변동사유</Title>
                        <Input className='esgw-note long-input' placeholder='ESGW 포인트 변동사유를 적어주세요.' />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>관리자 수정사유</Title>
                        <Input className='reason-correction long-input' placeholder='수정 시 필수 입력' />
                    </Col>
                </Row>
            </Card>
            <ButtonContainer>
                <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                <AddButton onClick={editUserMoney}>{params.pk == 0 ? '+ 추가' : '수정'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MUserMoneyEdit;