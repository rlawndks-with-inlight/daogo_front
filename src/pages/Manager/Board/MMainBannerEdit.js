//메인배너 추가 및 수정
import Breadcrumb from "../../../common/manager/Breadcrumb"
import SideBar from "../../../common/manager/SideBar"
import ManagerContentWrappers from '../../../components/elements/ManagerContentWrappers';
import ManagerWrappers from "../../../components/elements/ManagerWrappers";
import { Card, Title, Input, Row, Col, ImageContainer, Select } from '../../../components/elements/ManagerTemplete';
import ButtonContainer from "../../../components/elements/button/ButtonContainer";
import AddButton from "../../../components/elements/button/AddButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillFileImage } from 'react-icons/ai';
import theme from "../../../styles/theme";
import { backUrl, objManagerListContent } from "../../../data/Manager/ManagerContentData";
import CancelButton from "../../../components/elements/button/CancelButton";
import $ from 'jquery';
import axios from "axios";

const MMainBannerEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [formData] = useState(new FormData())
    useEffect(() => {
        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=main_banner&pk=${params.pk}`);
                setUrl(backUrl+response.data.img_src);
                $('.id').val(response.data.id)
                $('.link').val(response.data.link)
                $('.target').val(response.data.target)
            }
        }
        fetchPost();
    }, [])
    const editBanner = async () => {
        if ((!url && !content) || !$('.link').val() || !$('.target').val()) {
            alert('필수 값이 비어있습니다.');
        } else {
            if (window.confirm('저장 하시겠습니까?')) {
                if(content)formData.append('banner', content);
                formData.append('link', $('.link').val());
                formData.append('target', $('.target').val());
                formData.append('table', 'main_banner');
                if (params.pk > 0) formData.append('pk', params.pk);
                const { data: response } = await axios.post(`/api/${params.pk > 0 ? 'update' : 'add'}item`, formData);
                if (response.result > 0) {
                    alert("성공적으로 저장되었습니다.");
                    navigate(-1);
                }else{
                    alert(response.message);
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
    return (
        <>
            <Breadcrumb title={`메인배너 ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />
            <Card>

                <Row>
                    <Col>
                        <Title>이미지</Title>
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
                        <Title>배너링크</Title>
                        <Input className='link' placeholder='링크를 입력해 주세요.' defaultValue={'#'} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>배너타겟</Title>
                        <Select className='target'>
                            <option value={0}>현재창</option>
                            <option value={1}>새창</option>
                        </Select>
                    </Col>
                </Row>
            </Card>
            <ButtonContainer>
                <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                <AddButton onClick={editBanner}>{'저장'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MMainBannerEdit