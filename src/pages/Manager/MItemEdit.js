import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ButtonContainer from '../../components/elements/button/ButtonContainer';
import AddButton from '../../components/elements/button/AddButton';
import CancelButton from '../../components/elements/button/CancelButton';
import $ from 'jquery';
import { addItem, updateItem } from '../../functions/utils';
import { Card, Title, Input, Row, Col, ImageContainer, Select, Explain } from '../../components/elements/ManagerTemplete';
import { objManagerEditContent, objManagerListContent } from '../../data/Manager/ManagerContentData';
import Breadcrumb from '../../common/manager/Breadcrumb';
import theme from '../../styles/theme';
import { AiFillFileImage } from 'react-icons/ai';

const MItemEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [myNick, setMyNick] = useState("")
    const [files, setFiles] = useState({})
    const [options, setOptions] = useState({})
    const [formData] = useState(new FormData())
   
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
    const editUser = () => {
        if (!$(`.id`).val() || !$(`.name`).val() || !$(`.nickname`).val() || !$(`.phone`).val() || (!$(`.pw`).val() && params.pk == 0)) {
            alert('필요값이 비어있습니다.');
        } else {
            let obj = {
                id: $(`.id`).val(),

            }
            if (window.confirm(`${params.pk == 0 ? '추가하시겠습니까?' : '수정하시겠습니까?'}`)) {
                params.pk == 0 ?
                    addItem('user', { id: $(`.id`).val(), pw: $(`.pw`).val(), name: $(`.name`).val(), nickname: $(`.nickname`).val(), phone: $(`.phone`).val(), user_level: $(`.user_level`).val() }) :
                    updateItem('user', {
                        id: $(`.id`).val(), pw: $(`.pw`).val(), name: $(`.name`).val(), nickname: $(`.nickname`).val(), phone: $(`.phone`).val(), user_level: $(`.user_level`).val(), pk: params.pk
                    })
            }
        }


    }
    const addFile = (e) => {
        if (e.target.files[0]) {
            let file_s = {...files};
            file_s[e.target.id] = {
                url:'',
                content:undefined
            }
            file_s[e.target.id]['url'] = URL.createObjectURL(e.target.files[0]);
            file_s[e.target.id]['content'] = e.target.files[0];
            setFiles(file_s);            
        }
    };
    return (
        <>
            <Breadcrumb title={`${objManagerEditContent[params.table]?.breadcrumb} ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />

            <Card>
                {objManagerEditContent[params.table].list.map((list, index) => (
                    <>
                        <Row>
                            {list.map((item, idx) => (
                                <>
                                    <Col>
                                        <Title>{item.title}</Title>
                                        {item.type == 'input' ?
                                            <>
                                                <Input className={item.class_name} type={item.option?.type ?? "text"} placeholder={item.option?.placeholder ?? ""} />
                                            </>
                                            :
                                            <>
                                            </>}
                                        {item.type == 'select' ?
                                            <>
                                                <Select>
                                                    
                                                </Select>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {item.type == 'img' ?
                                            <>
                                                <ImageContainer for={item.class_name}>

                                                    {files[item.class_name]?.url ?
                                                        <>
                                                            <img src={files[item.class_name]?.url} alt="#"
                                                                style={{
                                                                    width: 'auto', height: '8rem',
                                                                    margin: '2rem'
                                                                }} />
                                                        </>
                                                        :
                                                        <>
                                                            <AiFillFileImage style={{ margin: '4rem', fontSize: '4rem', color: `${theme.color.manager.font3}` }} />
                                                        </>}
                                                </ImageContainer>
                                                <div>
                                                    <input type="file" id={item.class_name} onChange={addFile} style={{ display: 'none' }} />
                                                </div>
                                            </>
                                            :
                                            <>
                                            </>}
                                    </Col>
                                </>
                            ))}
                        </Row>
                    </>
                ))}
            </Card>
            <ButtonContainer>
                <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                <AddButton onClick={editUser}>{params.pk == 0 ? '+ 추가' : '수정'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MItemEdit;