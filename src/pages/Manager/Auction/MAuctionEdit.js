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
import { backUrl, managerNoteObj, objManagerListContent } from '../../../data/Manager/ManagerContentData';
import $ from 'jquery';
import { commarNumber, excelDownload, range } from "../../../functions/utils";
import { RiDeleteBinLine } from "react-icons/ri";
import styled from "styled-components";
import DataTable from "../../../common/manager/DataTable";
import MBottomContent from "../../../components/elements/MBottomContent";
import PageContainer from "../../../components/elements/pagination/PageContainer";
import PageButton from "../../../components/elements/pagination/PageButton";
import { AuctionContent } from "../../User/Auction/AuctionGamePage";
import { OneCard } from "../../../components/elements/UserContentTemplete";
import { SiMicrosoftexcel } from "react-icons/si";

const Td = styled.td`
border:1px solid ${props => props.theme.color.font3};
width:100px;
`
const MAuctionEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [pageList, setPageList] = useState([]);
    const [page, setPage] = useState(1);
    const [post, setPost] = useState({});
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [allCheckList, setAllCheckList] = useState([]);
    useEffect(() => {
        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=auction&pk=${params.pk}`);
                setUrl(backUrl + response.data.img_src);
                $(`.title`).val(response?.data?.title);
                $(`.min_price`).val(response?.data?.min_price);
                $(`.max_price`).val(response?.data?.max_price);
                $(`.price_unit`).val(response?.data?.price_unit);
                $(`.participate_star`).val(response?.data?.participate_star);
                $(`.participate_point`).val(response?.data?.participate_point);
                $(`.max_use_star`).val(response?.data?.max_use_star);
                $(`.max_use_point`).val(response?.data?.max_use_point);
                setPost(response?.data);
            }
        }
        fetchPost();
        onChangePageParticipateUser(1);
        getAllCheckList();
    }, [])
    const editAuction = async () => {
        if (!$('.title').val() || !$('.min_price').val() || !$('.max_price').val() || !$('.price_unit').val()) {
            alert('필수 값이 비어있습니다.');
        } else {
            let min_price = parseInt($('.min_price').val());
            let max_price = parseInt($('.max_price').val());
            let price_unit = parseInt($('.price_unit').val());
            if ((max_price - min_price) % price_unit != 0) {
                alert("(최대금액 - 최소금액)/(단위) 의 나누기 값이 0이 되어야 합니다.");
                return;
            }
            if (window.confirm('저장 하시겠습니까?')) {
                let formData = new FormData();
                if (content) formData.append('auction', content);
                formData.append('table', 'auction');
                formData.append('title', $('.title').val());
                formData.append('min_price', $('.min_price').val());
                formData.append('max_price', $('.max_price').val());
                formData.append('price_unit', $('.price_unit').val());
                formData.append('participate_star', $('.participate_star').val() ?? 0);
                formData.append('participate_point', $('.participate_point').val() ?? 0);
                formData.append('max_use_star', $('.max_use_star').val() ?? 0);
                formData.append('max_use_point', $('.max_use_point').val() ?? 0);
                formData.append('manager_note', `${params.pk > 0 ? managerNoteObj.UPDATE_AUCTION : managerNoteObj.ADD_AUCTION}`);
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
    const onChangePageParticipateUser = async (num) => {
        setPage(num);
        const { data: response } = await axios.post(`/api/getparticipateusers`, {
            page: num,
            game_pk: params?.pk
        })
        if (response.result > 0) {
            setPosts(response.data.data)
            setPageList(range(1, response.data.maxPage));
        } else {
            alert(response.message);
        }
    }
    const getAllCheckList = async () => {
        const { data: response } = await axios.post('/api/getallauctionchecklist', {
            game_pk: params?.pk
        });
        setAllCheckList(response?.data ?? []);
    }
    const onDeadline = async () => {
        if (window.confirm("마감 하시겠습니까?")) {
            const { data: response } = await axios.post(`/api/onauctiondeadline`, {
                game_pk: params?.pk
            })
            if (response.result > 0) {
                alert("성공적으로 저장되었습니다.");
                navigate(-1);
            } else {
                alert(response.message);
            }
        }
    }
    const addFile = (e) => {
        if (e.target.files[0]) {
            setContent(e.target.files[0]);
            setUrl(URL.createObjectURL(e.target.files[0]))
        }
    };
    const exportExcel = async () => {
        const { data: response } = await axios.post(`/api/getparticipateusers`, {
            game_pk: params?.pk
        })
        await excelDownload(response?.data?.data, objManagerListContent, 'auction_participate');
    }
    return (
        <>
            <Breadcrumb title={`경매 ${params.pk == 0 ? '등록' : '수정'}`} nickname={``} />

            <Card>
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
                        <Title>제목</Title>
                        <Input className="title" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>최소금액</Title>
                        <Input className="min_price" placeholder="only number" type={'number'} />
                    </Col>
                    <Col>
                        <Title>최대금액</Title>
                        <Input className="max_price" placeholder="only number" type={'number'} />
                    </Col>
                    <Col>
                        <Title>단위</Title>
                        <Input className="price_unit" placeholder="only number" type={'number'} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Explain>추가 후 변경시 이미 참여한 유저들에게 영향이 발생하오니 신중히 작성 부탁드립니다.</Explain>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>1회 참여 스타</Title>
                        <Input className="participate_star" placeholder="only number" type={'number'} />
                    </Col>
                    <Col>
                        <Title>1회 참여 포인트</Title>
                        <Input className="participate_point" placeholder="only number" type={'number'} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>하루 최대 사용 스타</Title>
                        <Input className="max_use_star" placeholder="only number" type={'number'} />
                    </Col>
                    <Col>
                        <Title>하루 최대 사용 포인트</Title>
                        <Input className="max_use_point" placeholder="only number" type={'number'} />
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
            <ButtonContainer style={{ marginBottom: '16px' }}>
                <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                <AddButton onClick={editAuction}>{'저장'}</AddButton>
            </ButtonContainer>
            {(params?.pk > 0) ?
                <>
                    <ButtonContainer>
                        <AddButton style={{ width: '104px' }} onClick={() => {
                            if (post?.status == 1) {
                                onDeadline();
                            }
                        }}>{post?.status == 1 ? '마감' : '마감완료'}</AddButton>
                    </ButtonContainer>
                </>
                :
                <>
                </>}

            {params?.pk > 0 ?
                <>
                    <Title style={{ margin: '8px auto', width: '95%', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ margin: 'auto 0' }}>참여자 리스트</div>
                        <AddButton style={{ margin: '12px 24px 12px 24px', width: '96px', alignItems: 'center', display: 'flex', justifyContent: 'space-around' }} onClick={exportExcel}><SiMicrosoftexcel /> 액셀추출</AddButton>
                    </Title>
                    <DataTable width={'100%'} data={posts} column={objManagerListContent[`auction_participate`].zColumn ?? {}} schema={'auction_participate'} />
                    <MBottomContent>
                        <div />
                        <PageContainer>
                            <PageButton onClick={() => onChangePageParticipateUser(1)}>
                                처음
                            </PageButton>
                            {pageList.map((item, index) => (
                                <>
                                    <PageButton onClick={() => onChangePageParticipateUser(item)} style={{ color: `${page == item ? '#fff' : ''}`, background: `${page == item ? theme.color.background1 : ''}`, display: `${Math.abs(index + 1 - page) > 4 ? 'none' : ''}` }}>
                                        {item}
                                    </PageButton>
                                </>
                            ))}
                            <PageButton onClick={() => onChangePageParticipateUser(pageList.length ?? 1)}>
                                마지막
                            </PageButton>
                        </PageContainer>
                        <div />
                    </MBottomContent>
                    <Title style={{ margin: '8px auto', width: '95%', display: 'flex', justifyContent: 'space-between' }}>
                        경매표
                    </Title>
                    <Card width={96} style={{ height: 'auto', cursor: 'default', flexDirection: 'column', alignItems: 'center' }}>
                        <AuctionContent
                            game={post}
                            allCheckList={allCheckList}
                            isManager={true}
                        />
                    </Card>
                </>
                :
                <>
                </>}


        </>
    )
}
export default MAuctionEdit