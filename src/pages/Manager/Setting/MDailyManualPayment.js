//데일리 수동 지급
import Breadcrumb from "../../../common/manager/Breadcrumb"
import SideBar from "../../../common/manager/SideBar"
import ManagerContentWrappers from '../../../components/elements/ManagerContentWrappers';
import ManagerWrappers from "../../../components/elements/ManagerWrappers";
import { Card, Title, Input, Row, Col, ImageContainer, Select } from '../../../components/elements/ManagerTemplete';
import ButtonContainer from "../../../components/elements/button/ButtonContainer";
import AddButton from "../../../components/elements/button/AddButton";
import { useParams } from "react-router-dom";
import { objManagerListContent } from "../../../data/Manager/ManagerContentData";

const MDailyManualPayment = () => {
    const params = useParams();

    return (
        <>
            <Breadcrumb title={`데일리수동지급`} nickname={``} />

            <Card>
                <Title>
                    <AddButton style={{ width: '132px' }}>데일리수동 발행</AddButton>
                </Title>
            </Card>

        </>
    )
}
export default MDailyManualPayment