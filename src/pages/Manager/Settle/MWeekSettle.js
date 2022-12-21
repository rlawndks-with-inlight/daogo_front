//데일리 수동 지급
import Breadcrumb from "../../../common/manager/Breadcrumb"
import SideBar from "../../../common/manager/SideBar"
import ManagerContentWrappers from '../../../components/elements/ManagerContentWrappers';
import ManagerWrappers from "../../../components/elements/ManagerWrappers";
import { Card, Title, Input, Row, Col, ImageContainer, Select } from '../../../components/elements/ManagerTemplete';
import ButtonContainer from "../../../components/elements/button/ButtonContainer";
import AddButton from "../../../components/elements/button/AddButton";
import { useNavigate, useParams } from "react-router-dom";
import { objManagerListContent } from "../../../data/Manager/ManagerContentData";
import DataTable from "../../../common/manager/DataTable";
import { useEffect, useState } from "react";
import axios from "axios";
import MBottomContent from "../../../components/elements/MBottomContent";
import PageContainer from "../../../components/elements/pagination/PageContainer";
import PageButton from "../../../components/elements/pagination/PageButton";
import theme from "../../../styles/theme";
import { excelDownload, range } from "../../../functions/utils";
import { SiMicrosoftexcel } from "react-icons/si";

const MWeekSettle = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [settleList, setSettleList] = useState([]);
    const [selectUser, setSelectUser] = useState({});
    const [selectUserPk, setSelectUserPk] = useState(0);
    const [page, setPage] = useState(1);
    const [pageList, setPageList] = useState([]);
    useEffect(()=>{
        fetchPosts();
    },[])
    async function fetchPosts(){
        const {data:response} = await axios.get('/api/items?table=user&prider=true');
        setPosts(response?.data);
    }
    //감가는 아래의 프라이더 유저까지는 감가 안당함

    const lookWeekSettle = async(pk, num) =>{
        setSelectUserPk(pk);
        setPage(num);
        const {data:response} = await axios.get(`/api/getweeksettlechild?pk=${pk}&page=${num}`);
        console.log(response)
        setSettleList(response?.data?.data);
        setSelectUser(response?.data?.user);
        setPageList(range(1, response.data.maxPage));
    }
    const onWeekSettle =  async () =>{
        if(window.confirm('이번 주 정산을 진행합니다.')){
            const {data:response} = await axios.post('/api/onweeksettle',{
                manager_note: `주 정산을 완료 하였습니다.`
            });
            if (response.result > 0) {
                alert("성공적으로 저장되었습니다.");
                navigate(-1);
            } else {
                alert(response.message);
            }
        }
    }
    const exportExcel = async () =>{
        const {data:response} = await axios.get(`/api/getweeksettlechild?pk=${selectUserPk}`);
        await excelDownload(response?.data?.data, objManagerListContent, 'week_marketing');
    }
    return (
        <>
            <Breadcrumb title={`주 정산`} nickname={``} />
            <Card style={{minHeight:'120px'}}>
                <Title>
                    <AddButton style={{ width: '132px' }} onClick={onWeekSettle}>주 정산 발행</AddButton>
                </Title>
            </Card>
            <Title style={{margin:'8px auto',width:'95%'}}>프라이더 리스트</Title>
            <DataTable width={'100%'} data={posts} column={objManagerListContent[`week_prider`].zColumn ?? {}} schema={'week_prider'} lookWeekSettle={lookWeekSettle} />
            {settleList?.length>0?
            <>
            <Title style={{margin:'8px auto',width:'95%',display:'flex',justifyContent:'space-between'}}>
            <div style={{margin:'auto 0'}}>이번주 {selectUser?.id} 회원 산하 매출 리스트</div>
            <AddButton style={{ margin: '12px 24px 12px 24px', width: '96px', alignItems: 'center', display: 'flex', justifyContent: 'space-around' }} onClick={exportExcel}><SiMicrosoftexcel /> 액셀추출</AddButton>
            </Title>
            <DataTable width={'100%'} data={settleList} column={objManagerListContent[`week_marketing`].zColumn ?? {}} schema={'week_marketing'} />
            <MBottomContent>
                <div />
                <PageContainer>
                    <PageButton onClick={() => lookWeekSettle(selectUserPk, 1)}>
                        처음
                    </PageButton>
                    {pageList.map((item, index) => (
                        <>
                            <PageButton onClick={() => lookWeekSettle(selectUserPk, item)} style={{ color: `${page == item ? '#fff' : ''}`, background: `${page == item ? theme.color.background1 : ''}`, display: `${Math.abs(index + 1 - page) > 4 ? 'none' : ''}` }}>
                                {item}
                            </PageButton>
                        </>
                    ))}
                    <PageButton onClick={() => lookWeekSettle(selectUserPk, pageList.length ?? 1)}>
                        마지막
                    </PageButton>
                </PageContainer>
                <div/>
            </MBottomContent>
            </>
            :
            <>
            </>}
           
        </>
    )
}
export default MWeekSettle;