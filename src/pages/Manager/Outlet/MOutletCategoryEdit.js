import Breadcrumb from "../../../common/manager/Breadcrumb"
import SideBar from "../../../common/manager/SideBar"
import ManagerContentWrappers from '../../../components/elements/ManagerContentWrappers';
import ManagerWrappers from "../../../components/elements/ManagerWrappers";
import { Card, Title, Input, Row, Col, ImageContainer, Select } from '../../../components/elements/ManagerTemplete';
import ButtonContainer from "../../../components/elements/button/ButtonContainer";
import AddButton from "../../../components/elements/button/AddButton";
import { useNavigate, useParams } from "react-router-dom";
import { objManagerListContent } from "../../../data/Manager/ManagerContentData";
import CancelButton from "../../../components/elements/button/CancelButton";

const MOutletCategoryEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    return (
        <>
            <Breadcrumb title={`아울렛 카테고리 ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />

            <Card>
                <Row>
                    <Col>
                        <Title>아울렛 카테고리명</Title>
                        <Input className='id' />
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
export default MOutletCategoryEdit