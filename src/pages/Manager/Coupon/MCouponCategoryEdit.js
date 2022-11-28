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
const MCouponCategoryEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=coupon_category&pk=${params.pk}`);
                $('.name').val(response.data.name)
            }
        }
        fetchPost();
    }, [])
    const editCouponCateogry = async () => {
        if (!$('.name').val()) {
            alert('필수 값이 비어있습니다.');
        } else {
            let obj = {
                table:'coupon_category',
                name:$('.name').val()
            }

            if (params.pk > 0) {
                obj.pk = params.pk;
                obj.reason_correction = $('.reason-correction').val();
            };

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
            <Breadcrumb title={`쿠폰 카테고리 ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />
            <Card>
                <Row>
                    <Col>
                        <Title>쿠폰 카테고리명</Title>
                        <Input className='name' />
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
                <AddButton onClick={editCouponCateogry}>{'저장'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MCouponCategoryEdit