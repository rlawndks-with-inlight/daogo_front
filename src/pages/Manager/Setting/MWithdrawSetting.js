//데일리 지급 확률 (수정)
import Breadcrumb from "../../../common/manager/Breadcrumb"
import SideBar from "../../../common/manager/SideBar"
import ManagerContentWrappers from '../../../components/elements/ManagerContentWrappers';
import ManagerWrappers from "../../../components/elements/ManagerWrappers";
import { Card, Title, Input, Row, Col, ImageContainer, Select, Explain, Text, Textarea } from '../../../components/elements/ManagerTemplete';
import ButtonContainer from "../../../components/elements/button/ButtonContainer";
import AddButton from "../../../components/elements/button/AddButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { confirmAsk } from "../../../data/ContentData";
import $ from 'jquery';
import { dateFormat, returnMoment } from '../../../functions/utils';
import { useParams } from "react-router-dom";
import { managerNoteObj, objManagerListContent } from "../../../data/Manager/ManagerContentData";
const MWithdrawSetting = () => {
    const params = useParams();

    const [post, setPost] = useState({});
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.get('/api/getsetting');
            setPost(response.data);
        }
        fetchPost();
    }, [])
    const onUpdateDailyPercent = async () => {
        if (window.confirm(confirmAsk)) {
            if (!$('.withdraw_commission_percent').val()) {
                alert('필요값이 비어 있습니다.');
                return;
            }
            if (isNaN(parseFloat($('.withdraw_commission_percent').val()))) {
                alert('출금 수수료에 숫자 이외의 값이 들어 있습니다.');
                return;
            }
            const { data: response } = await axios.post('/api/updatesetting', {
                withdraw_commission_percent: $('.withdraw_commission_percent').val(),
                pk: post.pk,
                withdraw_0: $('.withdraw_0').val(),
                withdraw_5: $('.withdraw_5').val(),
                withdraw_10: $('.withdraw_10').val(),
                withdraw_15: $('.withdraw_15').val(),
                withdraw_20: $('.withdraw_20').val(),
                withdraw_25: $('.withdraw_25').val(),
                withdraw_note: $('.withdraw_note').val(),
                manager_note: "출금 환경설정을 수정 하였습니다."
            });
            if (response.result > 0) {
                alert('성공적으로 저장되었습니다.');
                const { data: response } = await axios.get('/api/getsetting');
                setPost(response.data);
            } else {
                alert(response.message);
            }
        }
    }
    return (
        <>
            <Breadcrumb title={`출금 환경설정`} nickname={``} />

            <Card>
                <Row>
                    <Col>
                        <Title>마지막 수정일</Title>
                        <Text>{dateFormat(post?.date)}</Text>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Title>출금 수수료 %</Title>
                        <Input className='withdraw_commission_percent' placeholder="5.5" defaultValue={post?.withdraw_commission_percent} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>일반 출금제한 금액 (스타)</Title>
                        <Input className='withdraw_0' placeholder="스타를 입력해 주세요." defaultValue={post?.withdraw_0} />
                    </Col>
                    <Col>
                        <Title>화이트 출금제한 금액 (스타)</Title>
                        <Input className='withdraw_5' placeholder="스타를 입력해 주세요." defaultValue={post?.withdraw_5} />
                    </Col>
                    <Col>
                        <Title>그린 출금제한 금액 (스타)</Title>
                        <Input className='withdraw_10' placeholder="스타를 입력해 주세요." defaultValue={post?.withdraw_10} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>실버 출금제한 금액 (스타)</Title>
                        <Input className='withdraw_15' placeholder="스타를 입력해 주세요." defaultValue={post?.withdraw_15} />
                    </Col>
                    <Col>
                        <Title>골드 출금제한 금액 (스타)</Title>
                        <Input className='withdraw_20' placeholder="스타를 입력해 주세요." defaultValue={post?.withdraw_20} />
                    </Col>
                    <Col>
                        <Title>플레티넘 출금제한 금액 (스타)</Title>
                        <Input className='withdraw_25' placeholder="스타를 입력해 주세요." defaultValue={post?.withdraw_25} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>관리자 글</Title>
                        <Textarea className='withdraw_note' defaultValue={post?.withdraw_note} />
                    </Col>
                </Row>
            </Card>

            <ButtonContainer>
                <AddButton onClick={onUpdateDailyPercent}>{'저장'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MWithdrawSetting