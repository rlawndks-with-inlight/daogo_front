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
import { backUrl, managerNoteObj, objManagerListContent } from '../../../data/Manager/ManagerContentData';
import Breadcrumb from '../../../common/manager/Breadcrumb';
import { AiFillFileImage } from 'react-icons/ai';
import theme from '../../../styles/theme';
import defaultImg from '../../../assets/images/icon/default-profile.png';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Picker from 'emoji-picker-react';
import fontSize from "tui-editor-plugin-font-size";
import "tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css";
import { useRef } from 'react';
import { Table, Td, Tr } from '../../../components/elements/UserContentTemplete';

const MUserEdit = () => {
    const params = useParams();
    const navigate = useNavigate();

    const editorRef = useRef();

    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [formData] = useState(new FormData())
    const [addressList, setAddressList] = useState([])
    const [isSelectAddress, setIsSelectAddress] = useState(false);
    const [user, setUser] = useState({});
    const [noteFormData] = useState(new FormData());
    useEffect(() => {


        fetchPost();
    }, [])
    useEffect(() => {
        $('html').on('click', function (e) {
            if ($(e.target).parents('.emoji-picker-react').length < 1 && $('.emoji-picker-react').css('display') == 'flex' && $(e.target).attr('class') != 'emoji') {
                $('.emoji-picker-react').attr('style', 'display: none !important')
            }
        });
        $('button.emoji').on('click', function () {
            if ($('.emoji-picker-react').css('display') == 'none') {
                $('.emoji-picker-react').attr('style', 'display: flex !important')
            } else {
                $('.emoji-picker-react').attr('style', 'display: none !important')
            }
        })
        $('.toastui-editor-toolbar-icons').on('click', function () {
            $('.emoji-picker-react').attr('style', 'display: none !important')
        })
    }, [])
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
            setUrl(response?.data?.profile_img ? (backUrl + response?.data?.profile_img) : "");
            setUser(response?.data);
            editorRef.current.getInstance().setHTML(response.data.note.replaceAll('http://localhost:8001', backUrl));
            $('div.toastui-editor-defaultUI-toolbar > div:nth-child(4)').append(`<button type="button" class='emoji' aria-label='????????????' style='font-size:18px;'>????</button>`);

        }
    }
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        editorRef.current.getInstance().insertText(emojiObject.emoji)
    };

    const editUser = async () => {
        if (!$(`.id`).val() || !$(`.name`).val() || !$(`.phone`).val()) {
            alert('???????????? ??????????????????.');
        } else {
            if (window.confirm(`${params.pk == 0 ? '?????????????????????????' : '?????????????????????????'}`)) {
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
                        obj['payment_pw'] = $(`.payment_pw`).val().toString()
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
                    obj['note'] = editorRef.current.getInstance().getHTML();
                }
                obj['manager_note'] = `${$(`.id`).val()} ${params.pk > 0 ? (managerNoteObj.UPDATE_USER) : managerNoteObj.ADD_USER}`
                let api_str = '';
                params.pk == 0 ? api_str = '/api/adduser' : api_str = '/api/updateitem'
                const { data: response } = await axios.post(api_str, obj);
                if (response.result > 0) {
                    alert('??????????????? ?????????????????????.');
                    navigate(-1);
                } else {
                    alert(response.message);
                }
            }
        }


    }
    const onChangeEditor = (e) => {
        const data = editorRef.current.getInstance().getHTML();
    }
    const addFile = (e) => {
        if (e.target.files[0]) {
            setContent(e.target.files[0]);
            setUrl(URL.createObjectURL(e.target.files[0]))
        }
    };
    const initializationIdCard = async () => {
        if (window.confirm("?????? ????????? ????????? ????????? ???????????????????")) {
            const { data: response } = await axios.post('/api/initializationidcard', {
                pk: params?.pk,
                manager_note: `${user?.id}(${user?.name})??? ????????? ????????? ????????? ???????????????.`
            })
            if (response?.result > 0) {
                alert("??????????????? ?????? ???????????????.");
                fetchPost();
            } else {
                alert(response?.message);
            }
        }
    }
    const getAddressByText = async () => {
        const { data: response } = await axios.post('/api/getaddressbytext', {
            text: $('.address').val()
        })
        setIsSelectAddress(false);
        setAddressList(response?.data);
    }
    const onSelectAddress = (idx) =>{
        setIsSelectAddress(true);
        let address_obj = addressList[idx];
        $('.address').val(address_obj?.address);
        $('.zip_code').val(address_obj?.zip_code);
        $('.address_detail').focus();
    }
    return (
        <>
            <Breadcrumb title={`?????? ${params.pk == 0 ? '??????' : '??????'}`} nickname={``} />
            <Card>
                <Row>
                    <Col>
                        <Title>?????????</Title>
                        <Input className='id' disabled={params.pk > 0 ? true : false} />
                    </Col>
                    <Col>
                        <Title>????????????</Title>
                        {params.pk > 0 ?
                            <>
                                <Input className='pw' type={'password'} placeholder='****' />
                                <Explain>????????? ???????????? ????????? ?????????.</Explain>
                            </>
                            :
                            <>
                                <Explain style={{ margin: '12px auto 6px 24px' }}>??????????????? a123456! ??? ?????????????????????.</Explain>
                            </>}
                    </Col>
                    <Col>
                        <Title>??????</Title>
                        <Input className='name' />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Title>?????????</Title>
                        <Input className='phone' />
                    </Col>
                    <Col>
                        <Title>????????????</Title>
                        <Select className='level'>
                            <option value={0}>????????????</option>
                            <option value={40}>?????????</option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>????????? ?????????</Title>
                        <Input className='parent-id' disabled={params.pk > 0 ? true : false} />
                        {params.pk > 0 ?
                            <>
                            </>
                            :
                            <>
                                <Explain>?????? ????????? ????????? ???????????? ?????? ?????? ?????????. ???????????? ??????????????????.</Explain>
                            </>}
                    </Col>
                </Row>

                {params.pk > 0 ?
                    <>

                        <Row>
                            <Col>
                                <Title>?????? ????????????</Title>
                                <Input type={'password'} className='payment_pw' placeholder='****' />
                                <Explain>????????? ???????????? ????????? ?????????.</Explain>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>??????</Title>
                                <div style={{ display: 'flex' }}>
                                    <Input className='address' onKeyPress={(e)=>{e.key=='Enter'?getAddressByText():console.log(null)}}/>
                                    <AddButton style={{ margin: '12px auto 6px 12px' }} onClick={getAddressByText}>??????</AddButton>
                                </div>
                            </Col>
                        </Row>
                        {addressList.length > 0 && !isSelectAddress ?
                            <>
                                <Table style={{ maxWidth: '700px', margin: '12px auto 12px 24px', width: '90%' }}>
                                    <Tr>
                                        <Td style={{ width: '30%' }}>????????????</Td>
                                        <Td style={{ width: '70%' }}>??????</Td>
                                    </Tr>
                                    {addressList.map((item, idx) => (
                                        <>
                                            <Tr style={{ cursor: 'pointer' }} onClick={()=>{onSelectAddress(idx)}}>
                                                <Td style={{ width: '30%', padding: '8px 0' }}>{item.zip_code ?? "---"}</Td>
                                                <Td style={{ width: '70%', padding: '8px 0' }}>{item.address ?? "---"}</Td>
                                            </Tr>
                                        </>
                                    ))}
                                </Table>
                            </>
                            :
                            <>
                            </>
                        }
                        <Row>
                            <Col>
                                <Title>????????????</Title>
                                <Input className='address_detail' />
                            </Col>
                            <Col>
                                <Title>????????????</Title>
                                <Input className='zip_code' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>???????????????</Title>
                                <Input className='bank_name' />
                            </Col>
                            <Col>
                                <Title>??????????????????</Title>
                                <Input className='account_number' />
                            </Col>
                            <Col>
                                <Title>??????????????????</Title>
                                <Input className='account_name' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>????????? ?????????</Title>
                                <ImageContainer for="file1">

                                    {url ?
                                        <>
                                            <img src={url} alt="#"
                                                style={{
                                                    width: '12rem', height: '6rem',
                                                    margin: '3rem'
                                                }} />
                                        </>
                                        :
                                        <>
                                            <AiFillFileImage style={{ margin: '4rem', fontSize: '4rem', color: `${theme.color.manager.font3}` }} />
                                        </>}
                                </ImageContainer>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>????????? ????????? ?????????</Title>
                                <AddButton style={{ margin: '12px auto 6px 24px' }} onClick={initializationIdCard}>?????????</AddButton>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Title>????????? ??????</Title>
                                <div id="editor">
                                    <Picker onEmojiClick={onEmojiClick} />
                                    <Editor
                                        placeholder="????????? ??????????????????."
                                        previewStyle="vertical"
                                        height="600px"
                                        initialEditType="wysiwyg"
                                        useCommandShortcut={false}
                                        hideModeSwitch={true}
                                        plugins={[colorSyntax, fontSize]}
                                        language="ko-KR"
                                        ref={editorRef}
                                        onChange={onChangeEditor}
                                        hooks={{
                                            addImageBlobHook: async (blob, callback) => {

                                                noteFormData.append('note', blob);
                                                const { data: response } = await axios.post('/api/addimage', noteFormData);
                                                if (response.result > 0) {
                                                    callback(backUrl + response.data.filename)
                                                    noteFormData.delete('note');
                                                } else {
                                                    noteFormData.delete('note');
                                                    return;
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>????????? ????????????</Title>
                                <Input className='reason-correction long-input' placeholder='?????? ??? ?????? ??????' />
                            </Col>
                        </Row>
                    </>
                    :
                    <>
                    </>
                }
            </Card>
            <ButtonContainer>
                <CancelButton onClick={() => navigate(-1)}>x ??????</CancelButton>
                <AddButton onClick={editUser}>{params.pk == 0 ? '+ ??????' : '??????'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MUserEdit;