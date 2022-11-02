import React from 'react'
import styled from 'styled-components'
import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import ManagerWrappers from '../../components/elements/ManagerWrappers';
import SideBar from '../../common/manager/SideBar';
import ManagerContentWrappers from '../../components/elements/ManagerContentWrappers';
import axios from 'axios';
import Breadcrumb from '../../common/manager/Breadcrumb';
import ButtonContainer from '../../components/elements/button/ButtonContainer';
import AddButton from '../../components/elements/button/AddButton';
import $ from 'jquery';
import { Card, Title, Input, Row, Col, ImageContainer, Select } from '../../components/elements/ManagerTemplete';
import { AiFillFileImage } from 'react-icons/ai'
import theme from '../../styles/theme';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Picker from 'emoji-picker-react';
import fontSize from "tui-editor-plugin-font-size";
import "tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css";
import { backUrl, needTwoImage } from '../../data/Data';
import { objManagerListContent, cardDefaultColor } from '../../data/Data';
import { categoryToNumber } from '../../functions/utils';
import CommentComponent from '../../components/CommentComponent';

const MItemEdit = () => {
    const { pathname } = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const editorRef = useRef();
    const [comments, setComments] = useState([]);
    const [percent, setPercent] = useState(0);
    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [url2, setUrl2] = useState('')
    const [content, setContent] = useState(undefined)
    const [content2, setContent2] = useState(undefined)
    const [formData] = useState(new FormData())

    const [noteFormData] = useState(new FormData());
    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(false)
    const [zCategory, setZCategory] = useState([])
    const [auth, setAuth] = useState({});
    const [fontColor, setFontColor] = useState(cardDefaultColor.font);
    const [backgroundColor, setBackgroundColor] = useState(cardDefaultColor.background)
    const [channelList, setChannelList] = useState([]);

    
    const imgSetting = {
        oneword: ' 권장(800*600)',
        oneevent: ' 권장(800*600)',
        theme: ' 권장(960*640)',
        strategy: ' 권장(800*600)',
        issue: ' 권장(300*360)',
        feature: ' 권장(300*360)',
    }
    useEffect(() => {
        async function fetchPost() {
            let authObj = JSON.parse(localStorage.getItem('auth'));
            setAuth(authObj);
            if (authObj?.user_level >= 40 && params.table == 'strategy') {
                const { data: channelResponse } = await axios.get(`/api/getchannel`)
                setChannelList(channelResponse.data);
            }

            if (params.table == 'issue' || params.table == 'feature') {
                const { data: response } = await axios.get(`/api/items?table=${params.table}_category`);
                setZCategory(response.data)
            }

            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=${params.table}&pk=${params.pk}`);
                $(`.title`).val(response.data.title);
                $(`.hash`).val(response.data.hash);
                $(`.channel`).val(response.data.user_pk);
                $(`.suggest-title`).val(response.data.suggest_title);
                $('.font-color').val(response.data.font_color)
                $('.background-color').val(response.data.background_color)
                $('.note-align').val(response.data.note_align);

                if (params.table == 'issue' || params.table == 'feature') {
                    $(`.category`).val(response.data.category_pk);
                }
                editorRef.current.getInstance().setHTML(response.data.note.replaceAll('http://localhost:8001', backUrl));
                setUrl(backUrl + response.data.main_img);
                if (needTwoImage.includes(params.table)) setUrl2(backUrl + response.data.second_img);
                setItem(response.data)
            } else {

                $('.font-color').val(cardDefaultColor.font)
                $('.background-color').val(cardDefaultColor.background)

            }

        }
        $('div.toastui-editor-defaultUI-toolbar > div:nth-child(4)').append(`<button type="button" class='emoji' aria-label='이모티콘' style='font-size:18px;'>🙂</button>`);
        fetchPost();
        fetchComments();
    }, [pathname])
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
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        editorRef.current.getInstance().insertText(emojiObject.emoji)
    };
    const fetchComments = async () => {
        const { data: response } = await axios.get(`/api/getcommnets?pk=${params.pk}&category=${categoryToNumber(params.table)}`);
        setComments(response.data);
    }
    const editItem = async () => {
        if ((!content && !url) || !$(`.hash`).val() || !$(`.title`).val() || !$(`.suggest-title`).val()) {
            alert('필요값이 비어있습니다.');
        } else {
            let auth = JSON.parse(localStorage.getItem('auth'))
            formData.append('table', params.table);
            formData.append('content', content);
            if (needTwoImage.includes(params.table)) formData.append('content2', content2);
            formData.append('url', item.main_img)
            if (needTwoImage.includes(params.table)) formData.append('url2', item.second_img)
            formData.append('title', $(`.title`).val())
            formData.append('hash', $(`.hash`).val())
            formData.append('suggest_title', $(`.suggest-title`).val())
            formData.append('want_push', $(`.want-push`).val())
            if (params.table == 'issue' || params.table == 'feature') {
                formData.append('category', $(`.category`).val());
            }
            formData.append('user_pk', auth.user_level >= 40 && params.table == 'strategy' ? $('.channel').val() : auth.pk)
            formData.append('note', editorRef.current.getInstance().getHTML());
            if (params.table == 'issue' || params.table == 'feature') formData.append('category_pk', $('.category').val())
            if (params.pk > 0) formData.append('pk', params.pk);
            if (window.confirm(`저장하시겠습니까?`)) {

                formData.append('font_color', $('.font-color').val());
                formData.append('background_color', $('.background-color').val())
                if (params.pk > 0) {
                    const { data: response } = await axios.post(`/api/updateitem`, formData)
                    if (response.result > 0) {
                        alert('성공적으로 저장되었습니다.')
                        navigate(-1);
                    }
                } else {
                    const { data: response } = await axios.post(`/api/additem`, formData)
                    if (response.result > 0) {
                        alert('성공적으로 추가 되었습니다.');
                        navigate(-1);
                    }

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
    const addFile2 = (e) => {
        if (e.target.files[0]) {
            setContent2(e.target.files[0]);
            setUrl2(URL.createObjectURL(e.target.files[0]))
        }
    };
    const onChangeEditor = (e) => {
        const data = editorRef.current.getInstance().getHTML();
        console.log(data)
    }

    const addComment = async () => {
        if (!$('.comment').val()) {
            alert('필수 값을 입력해 주세요.');
        }
        const { data: response } = await axios.post('/api/addcomment', {
            userPk: auth.pk,
            userNick: auth.nickname,
            pk: params.pk,
            note_align: $('.note-align').val(),
            note: $('.comment').val(),
            category: categoryToNumber(params.table)
        })

        if (response.result > 0) {
            $('.comment').val("")
            fetchComments();
        } else {
            alert(response.message)
        }
    }
    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={objManagerListContent[`${params.table}`].breadcrumb + `${params.pk > 0 ? '수정' : '추가'}`} nickname={myNick} />
                    <Card>

                        <Row>
                            <Col>
                                <Title>프로필이미지 <br /> {needTwoImage.includes(params.table) ? '(권장 900*600)' : ''}</Title>
                                <ImageContainer for="file1">

                                    {url ?
                                        <>
                                            <img src={url} alt="#"
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
                                    <input type="file" id="file1" onChange={addFile} style={{ display: 'none' }} />
                                </div>
                            </Col>
                        </Row>
                        {needTwoImage.includes(params.table) ?
                            <>
                                <Row>
                                    <Col>
                                        <Title>프로필 이미지 <br /> (권장 300*360)</Title>
                                        <ImageContainer for="file2">

                                            {url2 ?
                                                <>
                                                    <img src={url2} alt="#"
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
                                            <input type="file" id="file2" onChange={addFile2} style={{ display: 'none' }} />
                                        </div>
                                    </Col>
                                </Row>
                            </>
                            :
                            <>
                            </>}

                        <Row>
                            <Col>
                                <Title>추천 게시물 제목</Title>
                                <Input className='suggest-title' placeholder='[주식용어] 유상증자' />
                            </Col>
                            {params.table == 'issue' || params.table == 'feature' ?
                                <>
                                    <Col>
                                        <Title>카테고리</Title>
                                        <Select className='category'>
                                            {zCategory && zCategory.map((item, idx) => (
                                                <>
                                                    <option value={item.pk}>{item.title}</option>
                                                </>
                                            ))}
                                        </Select>
                                    </Col>
                                </>
                                :
                                <>
                                </>
                            }
                            {params.pk == 0 ?
                                <>
                                    <Col>
                                        <Title>푸쉬 발송</Title>
                                        <Select className='want-push'>
                                            <option value={1}>발송</option>
                                            <option value={0}>발송 안함</option>
                                        </Select>
                                    </Col>
                                </>
                                :
                                <>
                                </>
                            }

                        </Row>
                        <Row>
                            <Col>
                                <Title>제목</Title>
                                <Input className='title' placeholder='[주식용어] 유상증자' />
                            </Col>
                            <Col>
                                <Title>해시태그</Title>
                                <Input className='hash' placeholder='#사과 #수박' />
                            </Col>
                            {auth.user_level >= 40 && params.table == 'strategy' ?
                                <>
                                    <Col>
                                        <Title>채널명</Title>
                                        <Select className='channel'>
                                            {channelList.map((item, idx) => (
                                                <>
                                                    <option value={item.pk} key={idx}>{item.nickname}{item?.user_level >= 30 ? ' ' + item.name + '(전문가)' : ''}</option>
                                                </>
                                            ))}
                                        </Select>
                                    </Col>
                                </>
                                :
                                <>
                                </>
                            }

                        </Row>
                        {params.table != 'oneword' && params.table != 'oneevent' ?
                            <>
                                <Row>
                                    <Col>
                                        <Title>카드 글자색</Title>
                                        <Input type={'color'} className='font-color' style={{ background: '#fff', height: '36px', width: '220px' }} />
                                    </Col>
                                    <Col>
                                        <Title>카드 배경색</Title>
                                        <Input type={'color'} className='background-color' style={{ background: '#fff', height: '36px', width: '220px' }} />
                                    </Col>
                                </Row>
                            </>
                            :
                            <>
                            </>
                        }
                        <Row>
                            <Col>
                                <Title>내용 정렬</Title>
                                <Select className='note-align'>
                                    <option value={0}>가운데</option>
                                    <option value={1}>오른쪽</option>
                                    <option value={2}>왼쪽</option>
                                </Select>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Title>내용</Title>
                                <div id="editor">
                                    <Picker onEmojiClick={onEmojiClick} style={{ color: 'red' }} />
                                    <Editor
                                        placeholder="내용을 입력해주세요."
                                        previewStyle="vertical"
                                        height="600px"
                                        initialEditType="wysiwyg"
                                        useCommandShortcut={false}
                                        useTuiEditorEmoji={true}
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
                    </Card>

                    <ButtonContainer>
                        <AddButton onClick={editItem}>{'저장'}</AddButton>
                    </ButtonContainer>
                    {params.pk > 0 ?
                        <>
                            <Card style={{ minHeight: '240px' }}>
                                <Row>
                                    <Col>
                                        <Title>댓글 관리</Title>
                                    </Col>
                                </Row>
                                <CommentComponent addComment={addComment} data={comments} fetchComments={fetchComments} />
                            </Card>
                        </>
                        :
                        <></>
                    }

                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MItemEdit;