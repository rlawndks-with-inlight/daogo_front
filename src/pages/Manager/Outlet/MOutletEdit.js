//쿠폰 등록 및 수정
import Breadcrumb from "../../../common/manager/Breadcrumb"
import { Card, Title, Input, Row, Col, ImageContainer, Select, Explain, Container, Table, Tr, SectorInput } from '../../../components/elements/ManagerTemplete';
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
import { commarNumber, range } from "../../../functions/utils";
import { RiDeleteBinLine } from "react-icons/ri";
import styled from "styled-components";

const Td = styled.td`
border:1px solid ${props => props.theme.color.font3};
width:100px;
`
const MOutletEdit = () => {
    const params = useParams();
    const navigate = useNavigate();

    const editorRef = useRef();
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [noteFormData] = useState(new FormData());
    const [brandList, setBrandList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [sellUserObj, setSellUserObj] = useState({});
    const [isInputPoint, setIsInputPoint] = useState(false);
    const [optionList, setOptionList] = useState([]);
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.post('/api/getalldatabytables', {
                tables: ['outlet_category', 'outlet_brand']
            })
            setBrandList(response?.data?.outlet_brand);
            setCategoryList(response?.data?.outlet_category);
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=outlet&pk=${params.pk}`);
                setUrl(backUrl + response.data.img_src);
                $('.category').val(response.data.category_pk)
                $('.brand').val(response.data.brand_pk)
                $('.name').val(response.data.name)
                $('.sell_star').val(response.data.sell_star)
                //$('.generated_code_count').val(response.data.generated_code_count)
                $('.randombox_point').val(response.data.randombox_point)
                $('.sell_user_id').val(response.data.sell_user_id)
                $('.sell_user_name').val(response.data.sell_user_name)
                $('.sell_user_phone').val(response.data.sell_user_phone)
                $('.sell_revenue_percent').val(response.data.sell_revenue_percent)
                $('.is_use_point').val(response.data.is_use_point)
                if (response?.data?.is_use_point != 1) {
                    setIsInputPoint(false);
                    $('.point_percent').val(null);
                } else {
                    setIsInputPoint(true);
                    $('.point_percent').val(response?.data?.point_percent);
                }
                $('.link').val(response.data.link)
                setSellUserObj({
                    id: response?.data?.sell_user_id,
                    pk: response?.data?.sell_user_pk,
                    phone: response?.data?.sell_user_phone,
                    name: response?.data?.sell_user_name
                })
                editorRef.current.getInstance().setHTML(response.data.note.replaceAll('http://localhost:8001', backUrl));
                console.log(response.data.option_obj)
                let option_list = [...JSON.parse(response.data.option_obj)];

                let option_obj = [];
                for(var i = 0;i<option_list.length;i++){
                    option_obj[option_obj.length] = range(1, 1 + (option_list[0]?.list.length*2??0));
                }
                setOptionList(option_obj);
                await new Promise((r) => setTimeout(r, 500));
                for(var i=  0;i<option_list.length;i++){
                    $(`.td-${i}-0`).val(option_list[i]?.option_name);
                    for(var j=0;j<option_list[i]?.list.length;j++){
                        $(`.td-${i}-${j*2+1}`).val(option_list[i]?.list[j]?.name);
                        $(`.td-${i}-${j*2+2}`).val(option_list[i]?.list[j]?.price);
                    }
                }
            } else {
                let test = false;
                if (test) {
                    $('.name').val("테스트상품");
                    $('.sell_star').val(1000);
                    //$('.generated_code_count').val(response.data.generated_code_count)
                    $('.randombox_point').val(200);
                    $('.is_use_point').val(1)
                    $('.point_percent').val(200);
                    $('.sell_user_id').val("admin");
                    $('.sell_user_name').val("admin");
                    $('.sell_user_phone').val("admin");
                    $('.sell_revenue_percent').val(2);
                    $('.link').val("naver.com");
                }
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

    const onCheckId = async () => {
        const { data: response } = await axios.post('/api/checkexistid', {
            id: $('.sell_user_id').val(),
            is_get_user_info: true
        })
        if (response.result > 0) {
            setSellUserObj(response?.data);
            $('.sell_user_name').val(response?.data?.name);
            $('.sell_user_phone').val(response?.data?.phone);
            alert("존재하는 판매자 아이디 입니다.");
        } else {
            setSellUserObj({});
            alert(response.message);
            $('.sell_user_name').val("");
            $('.sell_user_phone').val("");
        }
    }
    const onChangeEditor = (e) => {
        const data = editorRef.current.getInstance().getHTML();
    }
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        editorRef.current.getInstance().insertText(emojiObject.emoji);
    };
    const addFile = (e) => {
        if (e.target.files[0]) {
            setContent(e.target.files[0]);
            setUrl(URL.createObjectURL(e.target.files[0]))
        }
    };
    const editOutlet = async () => {
        if ((!url && !content) || !$('.name').val() || !$('.sell_star').val() || !$('.sell_user_id').val() || !$('.sell_user_name').val() || !$('.sell_user_phone').val() || !$('.sell_revenue_percent').val()) {
            alert('필수 값이 비어있습니다.');
        } else {
            if (!$('.reason-correction').val() && params.pk > 0) {
                alert('필수 값이 비어있습니다.');
                return;
            }
            if ($('.sell_user_id').val() != sellUserObj.id) {
                alert("판매자 아이디에 비정상적인 변경이 감지되었습니다.");
                return;
            }
            let option_obj = [];
            for (var i = 0; i < optionList.length; i++) {
                let row = optionList[i];
                if($(`.td-${i}-0`).val()){
                    option_obj.push({
                        option_name: $(`.td-${i}-0`).val(),
                        list: []
                    })
                    for (var j = 1; j < row.length; j += 2) {
                        if($(`.td-${i}-${j}`).val()){
                            option_obj[i].list.push({
                                name: $(`.td-${i}-${j}`).val(),
                                price: parseInt($(`.td-${i}-${j + 1}`).val()),
                            })
                        }
                    }
                }
                
            }
            if (window.confirm('저장 하시겠습니까?')) {
                let formData = new FormData();
                if (content) formData.append('outlet', content);
                formData.append('category_pk', $('.category').val());
                formData.append('brand_pk', $('.brand').val());
                formData.append('name', $('.name').val());
                formData.append('sell_star', $('.sell_star').val());
                // formData.append('generated_code_count', $('.generated_code_count').val());
                formData.append('sell_user_pk', sellUserObj?.pk);
                formData.append('sell_user_id', $('.sell_user_id').val());
                formData.append('sell_user_name', $('.sell_user_name').val());
                formData.append('sell_user_phone', $('.sell_user_phone').val());
                formData.append('is_use_point', $('.is_use_point').val());
                formData.append('option_obj', JSON.stringify(option_obj));
                if ($('.point_percent').val()) {
                    formData.append('point_percent', $('.point_percent').val() ?? 0);
                }

                formData.append('randombox_point', $('.randombox_point').val());
                formData.append('sell_revenue_percent', $('.sell_revenue_percent').val());
                formData.append('link', $('.link').val());
                formData.append('note', editorRef.current.getInstance().getHTML());
                formData.append('table', 'outlet');
                if (params.pk > 0) {
                    formData.append('pk', params.pk);
                    formData.append('reason_correction', $('.reason-correction').val());
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
    const onChangeIsUsePoint = (e) => {
        if (e.target.value == 0) {
            setIsInputPoint(false);
            $('.point_percent').val(null);
        } else if (e.target.value == 1) {
            setIsInputPoint(true);
        } else if (e.target.value == 2) {
            setIsInputPoint(false);
            $('.point_percent').val(null);
        } else {
            alert("잘못된 값입니다.")
        }
    }
    const returnMenuHeader = (list_) => {
        let list = [...list_];
        let max_row = 0;
        console.log(list)
        for (var i = 0; i < list.length; i++) {
            let row = list[i]?.list;
            if (row.length > max_row) {
                max_row = row.length;
            }
        }
        return range(1, max_row);
    }
    return (
        <>
            <Breadcrumb title={`아울렛상품 ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />

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
                    <Col>
                        <Title>판매가(스타)</Title>
                        <Input className="sell_star" />
                        <Explain>숫자만 입력</Explain>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>혜택 랜덤박스 포인트</Title>
                        <Input className="randombox_point" />
                        <Explain>숫자만 입력</Explain>
                    </Col>
                    <Col>
                        <Title>포인트사용여부</Title>
                        <Select className="is_use_point" onChange={onChangeIsUsePoint}>
                            <option value={0}>사용불가</option>
                            <option value={1}>직접입력</option>
                            {/* <option value={2}>회원 티어별 포인트</option> */}
                        </Select>
                    </Col>
                    <Col>
                        <Title>사용가능포인트</Title>
                        <Input className="point_percent" placeholder="5.5" disabled={!isInputPoint} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>상품옵션</Title>
                        <Container>
                            <Table style={{ width: 'auto' }}>
                                <Tr>
                                    <Td>옵션명</Td>
                                    {optionList[0] && optionList[0].map((item, index) => (
                                        <>
                                            {index != 0 ?
                                                <>
                                                    <Td style={{ fontWeight: 'normal' }}>{index % 2 == 0 ? '가격차이' : '종류'}</Td>
                                                </>
                                                :
                                                <>
                                                </>}
                                        </>
                                    ))}
                                    <Td style={{ cursor: 'pointer' }} onClick={async () => {
                                        let option_list = [...optionList];
                                        if (option_list.length > 0) {
                                            for (var i = 0; i < option_list.length; i++) {
                                                option_list[i] = [...option_list[i], ...[1, 1]];
                                            }
                                            setOptionList(option_list);
                                        }
                                    }}>+</Td>
                                </Tr>
                                {optionList && optionList.map((item, index) => (
                                    <>
                                        <Tr>
                                            {item.map((itm, idx) => (
                                                <>
                                                    <Td><SectorInput className={`td-${index}-${idx}`}
                                                        type={(idx != 0 && idx % 2 == 0) ? 'number' : ''}
                                                        placeholder={`${(idx != 0 && idx % 2 == 0) ? 'only number' : ''}`}
                                                    /></Td>
                                                </>
                                            ))}
                                        </Tr>
                                    </>
                                ))}
                                <Tr>

                                    <Td style={{ cursor: 'pointer' }} onClick={() => {
                                        let option_list = [...optionList];
                                        if (option_list.length == 0) {
                                            option_list[option_list.length] = [1];
                                        } else {
                                            option_list[option_list.length] = option_list[0];
                                        }
                                        setOptionList(option_list);
                                    }}>+</Td>
                                </Tr>
                            </Table>
                            {/* <SectorAddButton onClick={() => { setSectorList([...sectorList, ...[{}]]) }}>+추가</SectorAddButton> */}
                        </Container>
                        <Explain style={{ color: theme.color.red }}>빈값으로 두면 자동 삭제 됩니다.</Explain>
                        <Explain style={{ color: theme.color.red }}>옵션 자체 삭제시 옵션명 빈값으로, 옵션 내부 종류 삭제시 종류, 가격차이 빈값으로 설정</Explain>
                        <div style={{ margin: '4px 0' }} />
                        <Explain style={{ color: theme.color.red }}>가격차이 칸</Explain>
                        <Explain style={{ color: theme.color.red }}>가격 변동 없으면 0 입력, 300스타 비쌀 시 300, 200스타 저렴할 시 -200 입력</Explain>
                        <div style={{ margin: '4px 0' }} />
                        <Explain style={{ color: theme.color.red }}>상품옵션 설정순서 -{">"} 1.엑셀 아래쪽 버튼으로 옵션 추가 2. 오른쪽 버튼으로 옵션 내부 종류 및 가격 설정</Explain>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>판매자 아이디</Title>
                        <div style={{ display: 'flex' }}>
                            <Input className="sell_user_id" onKeyPress={(e) => { e.key === 'Enter' ? onCheckId() : console.log(null) }} />
                            <AddButton style={{ margin: '12px auto 6px 12px' }} onClick={onCheckId}>{'확인'}</AddButton>
                        </div>
                    </Col>
                    <Col>
                        <Title>판매자 이름</Title>
                        <Input disabled={true} className="sell_user_name" />
                    </Col>
                    <Col>
                        <Title>판매자 연락처</Title>
                        <Input disabled={true} className="sell_user_phone" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>판매자 수익 %</Title>
                        <Input className="sell_revenue_percent" />
                        <Explain>숫자만 입력</Explain>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>구매상담링크</Title>
                        <Input className="link" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>상품이미지 (권장 512x512)</Title>
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
                <AddButton onClick={editOutlet}>{'저장'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MOutletEdit