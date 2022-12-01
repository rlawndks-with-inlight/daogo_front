// 회원 조직도
import Breadcrumb from "../../../common/manager/Breadcrumb"
import { Card, Title, Input, Row, Col, ImageContainer, Select } from '../../../components/elements/ManagerTemplete';
import ButtonContainer from "../../../components/elements/button/ButtonContainer";
import AddButton from "../../../components/elements/button/AddButton";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const MUserOrganizationChart = () => {
    const params = useParams();
    useEffect(() => {
        async function fetchPosts() {
            const { data: response } = await axios.post('/api/getgenealogy')
            console.log(response)
        }
        fetchPosts();
    }, [])
    return (
        <>
            <Breadcrumb title={`회원 조직도`} nickname={``} />
                    <Card>
                    </Card>
                    <ButtonContainer>
                        <AddButton>{'저장'}</AddButton>
                    </ButtonContainer>
        </>
    )
}
export default MUserOrganizationChart;