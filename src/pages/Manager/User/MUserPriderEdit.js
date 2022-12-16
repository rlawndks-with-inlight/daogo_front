//메인배너 추가 및 수정
import Breadcrumb from "../../../common/manager/Breadcrumb"
import SideBar from "../../../common/manager/SideBar"
import ManagerContentWrappers from '../../../components/elements/ManagerContentWrappers';
import ManagerWrappers from "../../../components/elements/ManagerWrappers";
import { Card, Title, Input, Row, Col, ImageContainer, Select, Explain } from '../../../components/elements/ManagerTemplete';
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

const MUserPriderEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [user, setUser] = useState({})
    useEffect(() => {
        if (params.pk <= 0) {
            navigate(-1);
        }
        async function fetchPost(){
            const { data: response } = await axios.get(`/api/item?table=user&pk=${params.pk}`);
            setUser(response?.data)
            $('.prider').val(response?.data?.prider)
        }
        fetchPost();
    }, [])
    const updatePrider = async () => {
        if (!$('.prider').val()) {
            alert('필수 값이 비어있습니다.');
        } else {
            if (window.confirm('저장 하시겠습니까?')) {
                let obj = {
                    prider: $('.prider').val(),
                    table: 'user',
                    pk: params?.pk,
                    manager_note: `${user?.id}의 프라이더 등급을 수정 했습니다.`
                }
                const { data: response } = await axios.post(`/api/${params.pk > 0 ? 'update' : 'add'}item`, obj);
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
            <Breadcrumb title={`프라이더 등급 수정`} nickname={``} />
            <Card>
                <Row>
                    <Col>
                        <Title>아이디</Title>
                        <Input className='id' defaultValue={user?.id} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>프라이더 등급 수정</Title>
                        <Select className="prider" defaultValue={user?.prider??0}>
                            <option value={0}>없음</option>
                            <option value={1}>그린리더</option>
                            <option value={2}>프라이더</option>
                            <option value={3}>로얄프라이더</option>
                        </Select>
                    </Col>
                </Row>
            </Card>
            <ButtonContainer>
                <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                <AddButton onClick={updatePrider}>{'저장'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MUserPriderEdit