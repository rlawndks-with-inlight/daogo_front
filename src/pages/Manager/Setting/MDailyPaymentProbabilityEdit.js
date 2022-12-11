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
import { returnMoment } from '../../../functions/utils';
import { useParams } from "react-router-dom";
import { managerNoteObj, objManagerListContent } from "../../../data/Manager/ManagerContentData";
const MDailyPaymentProbabilityEdit = () => {
    const params = useParams();

    const [post, setPost] = useState({});
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.get('/api/getdailypercent');
            setPost(response.data);
        }
        fetchPost();
    }, [])
    const onUpdateDailyPercent = async () => {
        if (window.confirm(confirmAsk)) {
            if (!$('.type-percent').val() || !$('.money').val() || !$('.money-percent').val()) {
                alert('필요값이 비어 있습니다.');
                return;
            }
            if ($('.type-percent').val().includes(' ') || $('.money').val().includes(' ') || $('.money-percent').val().includes(' ')) {
                alert('필요값에 공백이 있습니다.');
                return;
            }
            let type_percent = $('.type-percent').val().split(',');
            if (type_percent.length != 2) {
                alert('지급타입은 두개를 입력해야 합니다.');
                return;
            }
            if (parseInt(type_percent[0]) + parseInt(type_percent[1]) != 100) {
                alert('지급타입확률은 합이 100이 되어야 합니다.');
                return;
            }
            let money_list = $('.money').val().split(',');
            let money_percent_list = $('.money-percent').val().split(',');
            if (money_list.length != money_percent_list.length) {
                alert('지급금과 지급금 확률의 갯수가 같아야 합니다.');
                return;
            }
            if (money_percent_list.reduce((partialSum, a) => parseInt(partialSum) + parseInt(a), 0) != 100) {
                alert('지급금 확률은 합이 100이 되어야 합니다.');
                return;
            }
            const { data: response } = await axios.post('/api/updatedailypercent', {
                type_percent: $('.type-percent').val(),
                money: $('.money').val(),
                money_percent: $('.money-percent').val(),
                randombox_initialization_time: $('.randombox_initialization_time').val(),
                date: returnMoment(),
                manager_note: `${managerNoteObj.DAILY_PAYMENT_PROBABILITY}`,
                pk: post.pk
            });
            if (response.result > 0) {
                alert('성공적으로 저장되었습니다.');
            } else {
                alert(response.message);
            }
        }
    }
    return (
        <>
            <Breadcrumb title={`데일리지급확률 ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />

            <Card>
                <Row>
                    <Col>
                        <Title>마지막 수정일</Title>
                        <Text>{post?.date?.substring(0, 10)}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>지급타입</Title>
                        <Input disabled={true} value={'point,star'} />
                        <Explain>지급타입 분류 수량만금 입력 ( , 로 구분 / 예시 star,point)</Explain>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>지급타입확률</Title>
                        <Input placeholder="70,30" className='type-percent' defaultValue={post?.type_percent} />
                        <Explain>지급타입 순서에 맞추어 입력 ( , 로 구분하고 총 합이 100이 되어야 함 / 최대 소숫점 7자리까지 허용 / 예시 70,30 )</Explain>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>지급금</Title>
                        <Input className='money' placeholder='0.15,0.2,0.25,0.3' defaultValue={post?.money} />
                        <Explain>지급 % 분류 수량만금 입력 ( , 로 구분 / 예시 0.1,0.2,0.5,0.75,1,1.5,2,3)</Explain>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>지급금 확률</Title>
                        <Input className='money-percent' placeholder="0,95,4,1" defaultValue={post?.money_percent} />
                        <Explain>지급금 순서에 맞추어 입력 ( , 로 구분하고 총 합이 100이 되어야 함 / 최대 소숫점 7자리까지 허용 / 예시 3,10,10,4,50,20,2,1 )</Explain>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>랜덤박스 초기화 시간</Title>
                        <Input className='randombox_initialization_time' type={'time'} defaultValue={post?.randombox_initialization_time} />
                    </Col>
                </Row>

            </Card>

            <ButtonContainer>
                <AddButton onClick={onUpdateDailyPercent}>{'저장'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MDailyPaymentProbabilityEdit