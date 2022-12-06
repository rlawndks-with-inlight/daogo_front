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

const MUserMarketingEdit = () => {
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
        }
        fetchPost();
    }, [])
    const addMarketing = async () => {
        if (!$('.id').val() || !$('.marketing').val()) {
            alert('필수 값이 비어있습니다.');
        } else {
            if (window.confirm('저장 하시겠습니까?')) {
                let obj = {
                    id: user?.id,
                    marketing: $('.marketing').val(),
                    manager_note: `${user?.id}의 매출을(를) 등록 했습니다.`
                }
                const { data: response } = await axios.post(`/api/addmarketing`, obj);
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
            <Breadcrumb title={`매출(패키지) 추가`} nickname={``} />
            <Card>
                <Row>
                    <Col>
                        <Explain>[주의사항] 매출(패키지) 신규등록은 수정 삭제가 불가합니다. 필히 [ 아이디 ]를 확인하시기 바랍니다.</Explain>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>아이디</Title>
                        <Input className='id' defaultValue={user?.id} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>매출(패키지) 등록</Title>
                        <Select className="marketing">
                            <option value={36}>화이트 (36만원)</option>
                            <option value={120}>그린 (120만원)</option>
                            <option value={360}>실버 (360만원)</option>
                            <option value={600}>골드 (600만원)</option>
                            <option value={1200}>플레티넘 (1200만원)</option>
                        </Select>
                    </Col>
                </Row>
            </Card>
            <ButtonContainer>
                <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                <AddButton onClick={addMarketing}>{'저장'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MUserMarketingEdit