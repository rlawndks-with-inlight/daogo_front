import Breadcrumb from "../../../common/manager/Breadcrumb"
import SideBar from "../../../common/manager/SideBar"
import ManagerContentWrappers from '../../../components/elements/ManagerContentWrappers';
import ManagerWrappers from "../../../components/elements/ManagerWrappers";
import { Card, Title, Input, Row, Col, ImageContainer, Select } from '../../../components/elements/ManagerTemplete';
import ButtonContainer from "../../../components/elements/button/ButtonContainer";
import AddButton from "../../../components/elements/button/AddButton";
import { useParams } from "react-router-dom";
import { objManagerListContent } from "../../../data/Manager/ManagerContentData";

const MProductEdit = () =>{
    const params = useParams();

    return (
        <>
            <Breadcrumb title={`${objManagerListContent[params.table]?.breadcrumb} ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />
       
                    <Card>

                    </Card>

                    <ButtonContainer>
                        <AddButton>{'저장'}</AddButton>
                    </ButtonContainer>
                
        </>
    )
}
export default MProductEdit