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
const MWithdrawSetting = () => {
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
                withdraw_start_time: $('.withdraw_start_time').val(),
                withdraw_end_time: $('.withdraw_end_time').val(),
                withdraw_0: $('.withdraw_0').val(),
                withdraw_5: $('.withdraw_5').val(),
                withdraw_10: $('.withdraw_10').val(),
                withdraw_15: $('.withdraw_15').val(),
                withdraw_20: $('.withdraw_20').val(),
                withdraw_25: $('.withdraw_25').val(),
                withdraw_30: $('.withdraw_30').val(),
                withdraw_35: $('.withdraw_35').val(),
                withdraw_note: $('.withdraw_note').val(),
                withdraw_days: JSON.stringify(selectDaysList),
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
                        <Title>출금 가능 시작시간</Title>
                        <Input className='withdraw_start_time' type={'time'} defaultValue={post?.withdraw_start_time} />
                    </Col>
                    <Col>
                        <Title>출금 가능 종료시간</Title>
                        <Input className='withdraw_end_time' type={'time'} defaultValue={post?.withdraw_end_time} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>출금 가능 요일</Title>
                        <div style={{ margin: '12px auto 6px 24px', display: 'flex' }}>
                            {zDays.map((item, idx) => (
                                <>
                                    <div style={{
                                        background: `${selectDaysList.includes(idx) ? theme.color.background1 : theme.color.font3}`,
                                        color: `${selectDaysList.includes(idx) ? '#fff' : theme.color.font1}`, fontSize: theme.size.font4, padding: '8px',
                                        borderRadius: '4px', marginRight: '4px', cursor: 'pointer'
                                    }}
                                        onClick={() => {
                                            let list = [...selectDaysList];
                                            for (var i = 0; i < list.length; i++) {
                                                if (list[i] == idx) {
                                                    break;
                                                }
                                            }
                                            if (i == list.length) {
                                                list.push(idx);
                                            } else {
                                                list.splice(i, 1);
                                            }
                                            setSelectDaysList(list);
                                        }}>{item.name}</div>
                                </>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title style={{ width: '100%' }}>랜덤박스보유포인트 제한 출금스타</Title>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ width: '300px' }}>
                        <Title>0 ~ 8,999 랜덤박스 포인트</Title>
                        <Input className='withdraw_0' placeholder="스타를 입력해 주세요." defaultValue={post?.withdraw_0} />
                    </Col>
                    <Col style={{ width: '300px' }}>
                        <Title>9,000 ~ 29,999 랜덤박스 포인트</Title>
                        <Input className='withdraw_5' placeholder="스타를 입력해 주세요." defaultValue={post?.withdraw_5} />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ width: '300px' }}>
                        <Title>30,000 ~ 89,999 랜덤박스 포인트</Title>
                        <Input className='withdraw_10' placeholder="스타를 입력해 주세요." defaultValue={post?.withdraw_10} />
                    </Col>
                    <Col style={{ width: '300px' }}>
                        <Title>90,000 ~ 149,999 랜덤박스 포인트</Title>
                        <Input className='withdraw_15' placeholder="스타를 입력해 주세요." defaultValue={post?.withdraw_15} />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ width: '300px' }}>
                        <Title>150,000 ~ 299,999 랜덤박스 포인트</Title>
                        <Input className='withdraw_20' placeholder="스타를 입력해 주세요." defaultValue={post?.withdraw_20} />
                    </Col>
                    <Col style={{ width: '300px' }}>
                        <Title>300,000 ~ 899,999 랜덤박스 포인트</Title>
                        <Input className='withdraw_25' placeholder="스타를 입력해 주세요." defaultValue={post?.withdraw_25} />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ width: '300px' }}>
                        <Title>900000 ~ 1,499,999 랜덤박스 포인트</Title>
                        <Input className='withdraw_30' placeholder="스타를 입력해 주세요." defaultValue={post?.withdraw_30} />
                    </Col>
                    <Col style={{ width: '300px' }}>
                        <Title>1,500,000 이상 랜덤박스 포인트</Title>
                        <Input className='withdraw_35' placeholder="스타를 입력해 주세요." defaultValue={post?.withdraw_35} />
                    </Col>
                </Row>
                {/* <Row>
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
                </Row> */}
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