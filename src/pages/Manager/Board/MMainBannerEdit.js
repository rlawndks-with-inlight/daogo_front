//메인배너 추가 및 수정
import Breadcrumb from "../../../common/manager/Breadcrumb"
import SideBar from "../../../common/manager/SideBar"
import ManagerContentWrappers from '../../../components/elements/ManagerContentWrappers';
import ManagerWrappers from "../../../components/elements/ManagerWrappers";
import { Card, Title, Input, Row, Col, ImageContainer, Select } from '../../../components/elements/ManagerTemplete';
import ButtonContainer from "../../../components/elements/button/ButtonContainer";
import AddButton from "../../../components/elements/button/AddButton";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { AiFillFileImage } from 'react-icons/ai';
import theme from "../../../styles/theme";
import { objManagerListContent } from "../../../data/Manager/ManagerContentData";

const MMainBannerEdit = () => {
    const params = useParams();
    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [formData] = useState(new FormData())


    const addFile = (e) => {
        if (e.target.files[0]) {
            setContent(e.target.files[0]);
            setUrl(URL.createObjectURL(e.target.files[0]))
        }
    };
    return (
        <>
            <Breadcrumb title={`${objManagerListContent[params.table]?.breadcrumb} ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />
            <Card>

                <Row>
                    <Col>
                        <Title>이미지</Title>
                        <ImageContainer for="file1">

                            {url ?
                                <>
                                    <img src={url} alt="#"
                                        style={{
                                            width: 'auto', height: '8rem',
                                            margin: '2rem'
                                        }} />
                                </>
                                :
                                <>
                                    <AiFillFileImage style={{ margin: '4rem', fontSize: '4rem', color: `${theme.color.manager.font3}` }} />
                                </>}
                        </ImageContainer>
                        <div>
                            <input type="file" id="file1" onChange={addFile} style={{ display: 'none' }} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>배너링크</Title>
                        <Input className='link' placeholder='링크를 입력해 주세요.' defaultValue={'#'} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>배너타겟</Title>
                        <Select className='target'>
                            <option value={0}>현재창</option>
                            <option value={1}>새창</option>
                        </Select>
                    </Col>
                </Row>
            </Card>

            <ButtonContainer>
                <AddButton>{'저장'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MMainBannerEdit