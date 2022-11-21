//쿠폰 등록 및 수정
import Breadcrumb from "../../../common/manager/Breadcrumb"
import SideBar from "../../../common/manager/SideBar"
import ManagerContentWrappers from '../../../components/elements/ManagerContentWrappers';
import ManagerWrappers from "../../../components/elements/ManagerWrappers";
import { Card, Title, Input, Row, Col, ImageContainer, Select } from '../../../components/elements/ManagerTemplete';
import ButtonContainer from "../../../components/elements/button/ButtonContainer";
import AddButton from "../../../components/elements/button/AddButton";
import { objManagerListContent } from "../../../data/Manager/ManagerContentData";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Img } from "../../../components/elements/UserContentTemplete";
import theme from "../../../styles/theme";
import { AiFillFileImage } from 'react-icons/ai'
import CancelButton from "../../../components/elements/button/CancelButton";

const MCouponCategoryEdit = () => {
    const params = useParams();
    const navigate = useNavigate();

    return (
        <>
            <Breadcrumb title={`쿠폰 카테고리 ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />

            <Card>
                <Row>
                    <Col>
                        <Title>쿠폰 카테고리명</Title>
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
export default MCouponCategoryEdit