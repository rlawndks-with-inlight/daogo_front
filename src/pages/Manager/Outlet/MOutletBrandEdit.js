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

const MOutletBrandEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [url, setUrl] = useState('')
    const [setting, setSetting] = useState({});
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
            <Breadcrumb title={`아울렛 브랜드 ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />

            <Card>
                <Row>
                    <Col>
                        <Title>브랜드명</Title>
                        <Input className='id' />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Col>
                            <Title>브랜드 이미지</Title>
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
export default MOutletBrandEdit