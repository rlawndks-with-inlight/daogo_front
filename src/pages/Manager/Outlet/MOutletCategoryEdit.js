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
import { useEffect, useState } from "react";
import { Img } from "../../../components/elements/UserContentTemplete";
import theme from "../../../styles/theme";
import { AiFillFileImage } from 'react-icons/ai'
import CancelButton from "../../../components/elements/button/CancelButton";
import $ from 'jquery';
import axios from "axios";
const MOutletCategoryEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=outlet_category&pk=${params.pk}`);
                $('.name').val(response.data.name)
            }
        }
        fetchPost();
    }, [])
    const editOutletCateogry = async () => {
        if (!$('.name').val()) {
            alert('필수 값이 비어있습니다.');
        } else {
            let obj = {
                table:'outlet_category',
                name:$('.name').val()
            }

            if(params.pk>0) obj.pk = params.pk;

            const { data: response } = await axios.post(`/api/${params.pk > 0 ? 'update' : 'add'}item`, obj);
                if (response.result > 0) {
                    alert("성공적으로 저장되었습니다.");
                    navigate(-1);
                }else{
                    alert(response.message);
                }
        }
    }
    return (
        <>
            <Breadcrumb title={`아울렛 카테고리 ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />
            <Card>
                <Row>
                    <Col>
                        <Title>아울렛 카테고리명</Title>
                        <Input className='name' />
                    </Col>
                </Row>
            </Card>

            <ButtonContainer>
                <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                <AddButton onClick={editOutletCateogry}>{'저장'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MOutletCategoryEdit