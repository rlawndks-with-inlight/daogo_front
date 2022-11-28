//쿠폰 등록 및 수정
import Breadcrumb from "../../../common/manager/Breadcrumb"
import { Card, Title, Input, Row, Col, ImageContainer, Select } from '../../../components/elements/ManagerTemplete';
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

const MCouponEdit = () => {
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
            const { data: response } = await axios.post('/api/getalldatabytables', {
                tables: ['coupon_category', 'coupon_brand']
            })
            setBrandList(response?.data?.coupon_brand);
            setCategoryList(response?.data?.coupon_category);
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=coupon&pk=${params.pk}`);
                setUrl(backUrl+response.data.img_src);
                $('.category').val(response.data.category_pk)
                $('.brand').val(response.data.brand_pk)
                $('.name').val(response.data.name)
                $('.sell_price').val(response.data.sell_price)
                $('.price').val(response.data.price)
                $('.discount_percent').val(response.data.discount_percent)
                editorRef.current.getInstance().setHTML(response.data.note.replaceAll('http://localhost:8001', backUrl));
            }
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
    const editCoupon = async () => {
        if ((!url && !content) || !$('.name').val() || !$('.sell_price').val() || !$('.price').val() || !$('.discount_percent').val()) {
            alert('필수 값이 비어있습니다.');
        } else {
            if (window.confirm('저장 하시겠습니까?')) {
                if (content) formData.append('coupon', content);
                formData.append('category_pk', $('.category').val());
                formData.append('brand_pk', $('.brand').val());
                formData.append('name', $('.name').val());
                formData.append('sell_price', $('.sell_price').val());
                formData.append('price', $('.price').val());
                formData.append('discount_percent', $('.discount_percent').val());
                formData.append('note', editorRef.current.getInstance().getHTML());
                formData.append('table', 'coupon');
                if (params.pk > 0) {
                    formData.append('pk', params.pk);
                    formData.append('reason_correction',$('.reason-correction').val());
                };
                const { data: response } = await axios.post(`/api/${params.pk > 0 ? 'update' : 'add'}item`, formData);
                if (response.result > 0) {
                    alert("성공적으로 저장되었습니다.");
                    navigate(-1);
                } else {
                    alert(response.message);
                }
            }
        }
    }

    return (
        <>
            <Breadcrumb title={`쿠폰상품 ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />

            <Card>
                <Row>
                    <Col>
                        <Title>카테고리</Title>
                        <Select className="category">
                            {categoryList.map((item, idx) => (
                                <>
                                    <option value={item.pk}>{item?.name ?? ""}</option>
                                </>
                            ))}
                        </Select>
                    </Col>
                    <Col>
                        <Title>브랜드명</Title>
                        <Select className="brand">
                            {brandList.map((item, idx) => (
                                <>
                                    <option value={item.pk}>{item?.name ?? ""}</option>
                                </>
                            ))}
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>상품명</Title>
                        <Input className="name" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>판매가</Title>
                        <Input className="sell_price" />
                    </Col>
                    <Col>
                        <Title>매입가</Title>
                        <Input className="price" />
                    </Col>
                    <Col>
                        <Title>할인율</Title>
                        <div style={{ display: 'flex' }}>
                            <Input style={{ marginRight: '0' }} className="discount_percent" />
                            <div style={{ marginLeft: '6px', alignItems: 'center', display: 'flex' }}>%</div>
                        </div>
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
                <AddButton onClick={editCoupon}>{'저장'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MCouponEdit