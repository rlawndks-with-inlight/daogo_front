//쿠폰 등록 및 수정
import Breadcrumb from "../../../common/manager/Breadcrumb"
import { Card, Title, Input, Row, Col, ImageContainer, Select, Explain } from '../../../components/elements/ManagerTemplete';
import ButtonContainer from "../../../components/elements/button/ButtonContainer";
import AddButton from "../../../components/elements/button/AddButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import theme from "../../../styles/theme";
import { AiFillFileImage } from 'react-icons/ai'
import CancelButton from "../../../components/elements/button/CancelButton";
import axios from 'axios';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Picker from 'emoji-picker-react';
import fontSize from "tui-editor-plugin-font-size";
import "tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css";
import { backUrl } from '../../../data/Manager/ManagerContentData';
import $ from 'jquery';
const MOutletEdit = () => {
    const params = useParams();
    const navigate = useNavigate();

    const editorRef = useRef();
    const [url, setUrl] = useState('')
    const [setting, setSetting] = useState({});
    const [content, setContent] = useState(undefined)
    const [formData] = useState(new FormData())
    const [noteFormData] = useState(new FormData());
    const [brandList, setBrandList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        async function fetchPost() {

        }
        $('div.toastui-editor-defaultUI-toolbar > div:nth-child(4)').append(`<button type="button" class='emoji' aria-label='이모티콘' style='font-size:18px;'>🙂</button>`);
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


    const onChangeEditor = (e) => {
        const data = editorRef.current.getInstance().getHTML();
    }
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        editorRef.current.getInstance().insertText(emojiObject.emoji)
    };
    const addFile = (e) => {
        if (e.target.files[0]) {
            setContent(e.target.files[0]);
            setUrl(URL.createObjectURL(e.target.files[0]))
        }
    };
    return (
        <>
            <Breadcrumb title={`아울렛상품 ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />

            <Card>
                <Row>
                    <Col>
                        <Title>카테고리</Title>
                        <Select>

                        </Select>
                    </Col>
                    <Col>
                        <Title>브랜드명</Title>
                        <Select>

                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>상품명</Title>
                        <Input />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>판매가(스타)</Title>
                        <Input />
                        <Explain>숫자만 입력</Explain>
                    </Col>
                    <Col>
                        <Title>구매시 생성코드 수</Title>
                        <Input />
                        <Explain>숫자만 입력</Explain>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>판매자 아이디</Title>
                        <div style={{display:'flex'}}>
                            <Input className='' />
                            <AddButton style={{ margin: '12px auto 6px 12px' }}>{'확인전'}</AddButton>
                        </div>
                    </Col>
                    <Col>
                        <Title>판매자 이름</Title>
                        <Input disabled={true}/>
                    </Col>
                    <Col>
                    <Title>판매자 연락처</Title>
                        <Input disabled={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>판매자 수익 %</Title>
                        <Input />
                        <Explain>숫자만 입력</Explain>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>구매상담링크</Title>
                        <Input />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>상품이미지</Title>
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
                <Row>
                    <Col>
                        <Title>상품설명</Title>
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
            </Card>
            <ButtonContainer>
                <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                <AddButton>{'저장'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MOutletEdit