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
import theme from "../../../styles/theme";
const MGiftSetting = () => {
    const params = useParams();
    const [selectDaysList, setSelectDaysList] = useState([]);
    const zDays = [
        { name: '일', val: 0 },
        { name: '월', val: 1 },
        { name: '화', val: 2 },
        { name: '수', val: 3 },
        { name: '목', val: 4 },
        { name: '금', val: 5 },
        { name: '토', val: 6 }
    ]
    const [post, setPost] = useState({});
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.get('/api/getsetting');
            setPost(response.data);
            setSelectDaysList(JSON.parse(response.data.withdraw_days));
        }
        fetchPost();
    }, [])
    const onUpdateDailyPercent = async () => {
        if (window.confirm(confirmAsk)) {
            if(!$('.gift_star_commission_percent').val() || !$('.gift_point_commission_percent').val() || !$('.gift_esgw_commission_percent').val()){
                alert("필요값이 비어 있습니다.");
                return;
            }
            if (isNaN(parseFloat($('.gift_star_commission_percent').val()))) {
                alert('스타 이체 수수료에 숫자 이외의 값이 들어 있습니다.');
                return;
            }
            if (isNaN(parseFloat($('.gift_point_commission_percent').val()))) {
                alert('포인트 이체 수수료에 숫자 이외의 값이 들어 있습니다.');
                return;
            }
            if (isNaN(parseFloat($('.gift_esgw_commission_percent').val()))) {
                alert('ESGWP 이체 수수료에 숫자 이외의 값이 들어 있습니다.');
                return;
            }
            const { data: response } = await axios.post('/api/updatesetting', {
                pk: post.pk,
                gift_star_commission_percent: $('.gift_star_commission_percent').val(),
                gift_point_commission_percent: $('.gift_point_commission_percent').val(),
                gift_esgw_commission_percent: $('.gift_esgw_commission_percent').val(),
                manager_note: "선물 환경설정을 수정 하였습니다."
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
            <Breadcrumb title={`선물 환경설정`} nickname={``} />

            <Card>
                <Row>
                    <Col>
                        <Title>마지막 수정일</Title>
                        <Text>{dateFormat(post?.date)}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>스타 이체 수수료 %</Title>
                        <Input className='gift_star_commission_percent' placeholder="5.5" defaultValue={post?.gift_star_commission_percent} />
                    </Col>
                    <Col>
                        <Title>포인트 이체 수수료 %</Title>
                        <Input className='gift_point_commission_percent' placeholder="5.5" defaultValue={post?.gift_point_commission_percent} />
                    </Col>
                    <Col>
                        <Title>ESGWP 이체 수수료 %</Title>
                        <Input className='gift_esgw_commission_percent' placeholder="5.5" defaultValue={post?.gift_esgw_commission_percent} />
                    </Col>
                </Row>
            </Card>

            <ButtonContainer>
                <AddButton onClick={onUpdateDailyPercent}>{'저장'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MGiftSetting;