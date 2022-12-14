//공지사항 추가 및 수정
import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import ManagerWrappers from '../../../components/elements/ManagerWrappers';
import SideBar from '../../../common/manager/SideBar';
import ManagerContentWrappers from '../../../components/elements/ManagerContentWrappers';
import axios from 'axios';
import Breadcrumb from '../../../common/manager/Breadcrumb';
import ButtonContainer from '../../../components/elements/button/ButtonContainer';
import AddButton from '../../../components/elements/button/AddButton';
import $ from 'jquery';
import { addItem, updateItem } from '../../../functions/utils';
import { Card, Title, Input, Row, Col, Select } from '../../../components/elements/ManagerTemplete';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Picker from 'emoji-picker-react';
import fontSize from "tui-editor-plugin-font-size";
import "tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css";
import { backUrl, managerNoteObj } from '../../../data/Manager/ManagerContentData';
import { objManagerListContent } from '../../../data/Manager/ManagerContentData';
import { categoryToNumber } from '../../../functions/utils';
import CommentComponent from '../../../components/CommentComponent';
import CancelButton from '../../../components/elements/button/CancelButton';

const MNoticeEdit = () => {
    const { pathname } = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const editorRef = useRef();
    const [comments, setComments] = useState([]);
    const [myNick, setMyNick] = useState("")
    const [auth, setAuth] = useState({});
    const [noteFormData] = useState(new FormData());
    const [channelList, setChannelList] = useState([]);
    useEffect(() => {
        let authObj = JSON.parse(localStorage.getItem('auth'));
        setAuth(authObj);
        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=notice&pk=${params.pk}`);
                $(`.title`).val(response.data.title);
                $('.note-align').val(response.data.note_align);
                editorRef.current.getInstance().setHTML(response.data.note.replaceAll('http://localhost:8001', backUrl));
            }
        }
        $('div.toastui-editor-defaultUI-toolbar > div:nth-child(4)').append(`<button type="button" class='emoji' aria-label='이모티콘' style='font-size:18px;'>🙂</button>`);
        fetchPost();
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

    const editItem = async () => {
        if (!$(`.title`).val() || (params.pk > 0 && !$('.reason-correction').val())) {
            alert('필요값이 비어있습니다.');
        } else {
            let obj = {
                user_pk: auth.pk,
                title: $('.title').val(),
                table: 'notice',
                note_align: $('.note-align').val(),
                note: editorRef.current.getInstance().getHTML(),
                manager_note: `${params.pk > 0 ? managerNoteObj.UPDATE_NOTICE : managerNoteObj.ADD_NOTICE}`
            }
            if (params.pk > 0) {
                obj.pk = params.pk;
                obj.reason_correction = $('.reason-correction').val();
            };

            if (window.confirm(`저장하시겠습니까?`)) {

                if (params.pk > 0) {
                    updateItem('item', obj);
                } else {
                    addItem('item', obj);
                }
            }
        }
    }
    const onChangeEditor = (e) => {
        const data = editorRef.current.getInstance().getHTML();
    }
    return (
        <>
            <Breadcrumb title={`공지사항 ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />

            <Card>
                <Row>
                    <Col>
                        <Title>제목</Title>
                        <Input className='title' placeholder='제목을 입력해 주세요.' />
                    </Col>
                </Row>
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
                            <Picker onEmojiClick={onEmojiClick} />
                            <Editor
                                placeholder="내용을 입력해주세요."
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
                {params.pk > 0 ?
                    <>
                        <Row>
                            <Col>
                                <Title>관리자 수정사유</Title>
                                <Input className='reason-correction long-input' placeholder='수정 시 필수 입력' />
                            </Col>
                        </Row>
                    </>
                    :
                    <>
                    </>}
            </Card>
            <ButtonContainer>
                <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                <AddButton onClick={editItem}>{'저장'}</AddButton>
            </ButtonContainer>
            {/* {params.pk > 0 ?
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
            } */}


        </>
    )
}
export default MNoticeEdit;