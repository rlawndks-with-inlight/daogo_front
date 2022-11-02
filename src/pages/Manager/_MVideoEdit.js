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
import { addItem, updateItem } from '../../functions/utils';
import { Card, Title, Input, Row, Col, ImageContainer, Select } from '../../components/elements/ManagerTemplete';
import theme from '../../styles/theme';
import youtubeShare from '../../assets/images/test/youtube_share.PNG'
import relateExplain from '../../assets/images/test/relate_explain.png'
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import fontSize from "tui-editor-plugin-font-size";
import "tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css";
import { backUrl, cardDefaultColor } from '../../data/Data';
import { objManagerListContent } from '../../data/Data';

const SearchInput = styled.input`
margin:12px 0 6px 24px;
width:300px;
padding:8px;
outline:none;
::placeholder {
    color: #cccccc;
}
@media screen and (max-width:500px) {
width:150px;
}
`
const Button = styled.button`
width:80px;
height:36px;
margin:12px 0 6px 0;
background:#fff;
border:1px solid #aaa;
cursor:pointer;
@media screen and (max-width:500px) {
    width:60px;
}
`
const SearchContent = styled.div`
margin:12px 0 6px 24px;

`
const MVideoEdit = () => {
    const { pathname } = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const editorRef = useRef();

    const [myNick, setMyNick] = useState("")
    const [auth, setAuth] = useState({});
    const [noteFormData] = useState(new FormData());
    const [channelList, setChannelList] = useState([]);
    const [searchResults, setSearchResults] = useState([])//검색된 비디오 연관비디오 제외
    const [relateVideos, setRelateVideos] = useState([])//이미 연관된 비디오
    const [relatePkList, setRelatePkList] = useState([])
    useEffect(() => {
        let authObj = JSON.parse(localStorage.getItem('auth'));
        setAuth(authObj);
        async function fetchPost() {
            if (authObj?.user_level >= 40) {
                const { data: channelResponse } = await axios.get(`/api/getchannel`)
                setChannelList(channelResponse.data);
            }
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/video/${params.pk}`);
                $(`.title`).val(response.data.video.title);
                $(`.link`).val(response.data.video.link);
                $(`.channel`).val(response.data.video.user_pk);
                $('.font-color').val(response.data.video.font_color)
                $('.background-color').val(response.data.video.background_color)
                let relate_list = response.data.relate ?? [];
                let relate_pk_list = [];
                setRelateVideos(relate_list);
                for (var i = 0; i < relate_list.length; i++) {
                    relate_pk_list.push(relate_list[i].pk);
                    $(`.check-${relate_list[i].pk}`).prop('checked', true);
                }
                setRelatePkList(relate_pk_list)
                editorRef.current.getInstance().setHTML(response.data.video.note.replaceAll('http://localhost:8001', backUrl));
            } else {
                $('.font-color').val(cardDefaultColor.font)
                $('.background-color').val(cardDefaultColor.background)
            }

        }
        $('div.toastui-editor-defaultUI-toolbar > div:nth-child(4)').append(`<button type="button" class='emoji' aria-label='이모티콘' style='font-size:18px;'>🙂</button>`);
        fetchPost();
    }, [pathname])
    useEffect(()=>{
        $('button.emoji').on('click',function(){
            $('.emoji-picker-react').attr('style','display: flex !important')
        })
        $('.toastui-editor-toolbar-icons').on('click',function(){
            $('.emoji-picker-react').attr('style','display: none !important')
        })
    },[])
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        editorRef.current.getInstance().insertText(emojiObject.emoji)
    };
    const editItem = async () => {
        if (!$(`.title`).val() || !$(`.link`).val()) {
            alert('필요값이 비어있습니다.');
        } else {
            let obj = {
                user_pk: auth.user_level < 40 ? auth.pk : $('.channel').val(),
                title: $('.title').val(),
                link: $('.link').val(),
                font_color: $('.font-color').val(),
                background_color: $('.background-color').val(),
                note: editorRef.current.getInstance().getHTML()
            }
            if (params.pk > 0) obj.pk = params.pk;

            if (window.confirm(`저장하시겠습니까?`)) {

                if (params.pk > 0) {
                    updateItem('video', obj);
                } else {
                    addItem('video', obj);
                }



            }
        }
    }
    const searchVideo = async () => {
        if ($('.relate').val().length >= 2) {
            const { data: response } = await axios.get(`/api/items?table=video&keyword=${$('.relate').val()}`)
            setSearchResults(response.data)
        } else {
            setSearchResults([]);
        }
    }
    const initializationSearch = () => {

    }
    const onChangeEditor = (e) => {
        const data = editorRef.current.getInstance().getHTML();
    }
    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={objManagerListContent[`video`].breadcrumb} nickname={myNick} />
                    <Card>
                        <Row>
                            <Col>
                                <Title>제목</Title>
                                <Input className='title' placeholder='[주식용어] 유상증자' />
                            </Col>
                            <Col>
                                <Title>유튜브 링크</Title>
                                <Input className='link' placeholder='https://www.youtube.com/watch?v=9kaCAbIXuyg&list=RDVWbYRiF44Dc&index=2' />
                            </Col>
                            {auth.user_level >= 40 ?
                                <>
                                    <Col>
                                        <Title>채널명</Title>
                                        <Select className='channel'>
                                            {channelList.map((item, idx) => (
                                                <>
                                                    <option value={item.pk} key={idx}>{item.nickname}{item.user_level >= 30 ? ' ' + item.name + '(전문가)' : ''}</option>
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
                        <Row>
                            <Col>
                                <Title><img src={youtubeShare} alt="#" style={{ width: '100%', maxWidth: '500px' }} /></Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>관련영상 검색</Title>
                                <div style={{ display: 'flex' }}>
                                    <SearchInput className='relate' placeholder='제목을 입력해주세요.' />
                                    <Button onClick={searchVideo}>검색</Button>
                                </div>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                {relateVideos.map((item, idx) => (
                                    <>
                                        <SearchContent>
                                            <div>
                                                <input type={'checkbox'} className={`check-${item.pk}`} />
                                            </div>
                                            <div>{item.title}</div>
                                            <div>{item.date}</div>
                                        </SearchContent>
                                    </>
                                ))}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {searchResults.map((item, idx) => (
                                    <>
                                        {relatePkList.includes(item.pk) ?
                                            <>
                                            </>
                                            :
                                            <>
                                                <SearchContent>
                                                    <div>
                                                        <input type={'checkbox'} className={`check-${item.pk}`} />
                                                    </div>
                                                    <div>{item.title}</div>
                                                    <div>{item.date}</div>
                                                </SearchContent>
                                            </>
                                        }

                                    </>
                                ))}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {searchResults.map((item, idx) => (
                                    <>
                                        <SearchContent>
                                            <div>
                                                <input type={'checkbox'} className={`check-${item.pk}`} />
                                            </div>
                                            <div>{item.title}</div>
                                            <div>{item.date}</div>
                                        </SearchContent>
                                    </>
                                ))}
                            </Col>
                        </Row>
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
                        <Row>
                            <Col>
                                <Title>내용</Title>
                                <div id="editor">
                                    <Editor
                                        placeholder="내용을 입력해주세요."
                                        previewStyle="vertical"
                                        height="600px"
                                        initialEditType="wysiwyg"
                                        useCommandShortcut={false}
                                        hideModeSwitch={true}
                                        plugins={[colorSyntax,fontSize]}
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
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MVideoEdit;