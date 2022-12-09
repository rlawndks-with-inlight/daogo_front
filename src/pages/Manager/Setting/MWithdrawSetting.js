//데일리 지급 확률 (수정)
import Breadcrumb from "../../../common/manager/Breadcrumb"
import SideBar from "../../../common/manager/SideBar"
import ManagerContentWrappers from '../../../components/elements/ManagerContentWrappers';
import ManagerWrappers from "../../../components/elements/ManagerWrappers";
import { Card, Title, Input, Row, Col, ImageContainer, Select, Explain, Text } from '../../../components/elements/ManagerTemplete';
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
            if ( !$('.withdraw_commission_percent').val()) {
                alert('필요값이 비어 있습니다.');
                return;
            }
            if(isNaN(parseFloat($('.withdraw_commission_percent').val()))){
                alert('출금 수수료에 숫자 이외의 값이 들어 있습니다.');
                return;
            }
            const { data: response } = await axios.post('/api/updatesetting', {
                withdraw_commission_percent: $('.withdraw_commission_percent').val(),
                pk: post.pk
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
                        <Input className='withdraw_commission_percent' placeholder="0,95,4,1" defaultValue={post?.withdraw_commission_percent} />
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