//데일리 지급 확률 (수정)
import Breadcrumb from "../../../common/manager/Breadcrumb"
import SideBar from "../../../common/manager/SideBar"
import ManagerContentWrappers from '../../../components/elements/ManagerContentWrappers';
import ManagerWrappers from "../../../components/elements/ManagerWrappers";
import { Card, Title, Input, Row, Col, ImageContainer, Select, Explain, Text } from '../../../components/elements/ManagerTemplete';
import ButtonContainer from "../../../components/elements/button/ButtonContainer";
import AddButton from "../../../components/elements/button/AddButton";

const MDailyPaymentProbabilityEdit = () => {
    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={`데일리 당첨확률 설정`} nickname={``} />
                    <Card>
                        <Row>
                            <Col>
                                <Title style={{ margintop: '32px' }}>마지막 수정일</Title>
                                <Text>6 일전</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title style={{ margintop: '32px' }}>지급타입</Title>
                                <Input disabled={true} value={'point,cash'} />
                                <Explain>지급타입 분류 수량만금 입력 ( , 로 구분 / 예시 cash,point)</Explain>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title style={{ margintop: '32px' }}>지급타입확률</Title>
                                <Input className='id' placeholder="70,30" />
                                <Explain>지급타입 순서에 맞추어 입력 ( , 로 구분하고 총 합이 100이 되어야 함 / 최대 소숫점 7자리까지 허용 / 예시 70,30 )</Explain>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title style={{ margintop: '32px' }}>지급금</Title>
                                <Input className='id' disabled={true} value={'0.15,0.2,0.25,0.3'} />
                                <Explain>지급 % 분류 수량만금 입력 ( , 로 구분 / 예시 0.1,0.2,0.5,0.75,1,1.5,2,3)</Explain>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title style={{ margintop: '32px' }}>지급금 확률</Title>
                                <Input className='id' placeholder="0,95,4,1" />
                                <Explain>지급금 순서에 맞추어 입력 ( , 로 구분하고 총 합이 100이 되어야 함 / 최대 소숫점 7자리까지 허용 / 예시 3,10,10,4,50,20,2,1 )</Explain>
                            </Col>
                        </Row>
                    </Card>

                    <ButtonContainer>
                        <AddButton>{'저장'}</AddButton>
                    </ButtonContainer>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MDailyPaymentProbabilityEdit