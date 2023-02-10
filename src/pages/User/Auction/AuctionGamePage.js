import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Content, OneCard, Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { commarNumber } from "../../../functions/utils";
import MBottomContent from "../../../components/elements/MBottomContent";
import AddButton from "../../../components/elements/button/AddButton";
import { BsCheck2, BsCheck2All } from "react-icons/bs";
import { backUrl } from "../../../data/ContentData";
const Table = styled.div`
display:flex;
flex-wrap:wrap;
max-width:740px;
margin:8px auto;
`
const Tr = styled.div`
border:1px solid ${props => props.theme.color.font3};
display:flex;
font-size:${props => props.theme.size.font4};
color:${props => props.theme.color.background0};
background:${props => props.theme.color.background1}18;
transition: 0.3s;
margin:1px;
font-weight:bold;
${props => props.hover};
`
const Td = styled.div`
width:72px;
padding:8px;
height:17px;
`

export const AuctionContent = (props) => {
    const [cellList, setCellList] = useState([]);
    const { game, onClickTr, myCheckList, myNewCheckList, allCheckList, isManager } = props;
    const hover = (game?.status == 1 && !isManager) ? `
    &:hover{  
        border:1px solid ${theme.color.background0};
        color:#fff;
        background:${theme.color.background0};
    }
    cursor:pointer;
    `: '';
    useEffect(() => {
        let list = [];
        for (var i = game?.min_price; i <= game?.max_price; i += game?.price_unit) {
            list.push(i);
        }
        setCellList(list);
    }, [props]);
    return (
        <>
            <Table>
                {cellList && cellList.map((item) => (
                    <>
                        <Tr onClick={() => onClickTr ? onClickTr(item) : console.log(null)} hover={hover}>
                            <Td style={{ borderRight: `1px solid ${theme.color.font3}`, color: `${item == game?.winner_price ? theme.color.red : ''}` }}>{commarNumber(item)}</Td>
                            <Td style={{ textAlign: 'center', display: 'flex' }}>
                                <div style={{ display: 'flex', margin: '0 auto', alignItems: 'center' }}>
                                    {(myCheckList && myCheckList.includes(item)) || (myNewCheckList && myNewCheckList.includes(item)) ?
                                        <>
                                            <BsCheck2All
                                                style={{
                                                    color: `${item == game?.winner_price ? theme.color.red : ''}`,
                                                }} />
                                        </>
                                        :
                                        <>
                                            {(allCheckList && allCheckList.includes(item)) ?
                                                <>
                                                    <BsCheck2
                                                        style={{
                                                            color: `${item == game?.winner_price ? theme.color.red : ''}`,
                                                        }} />
                                                </>
                                                :
                                                <>
                                                </>}
                                        </>}
                                    <div style={{ marginLeft: '4px', color: `${item == game?.winner_price ? theme.color.red : ''}` }}>{
                                        allCheckList
                                        &&
                                        allCheckList.filter(element => item === element).length > 0
                                        &&
                                        commarNumber(allCheckList.filter(element => item === element).length)
                                    }</div>
                                </div>
                            </Td>
                        </Tr>
                    </>
                ))}
            </Table>
        </>
    )
}
const AuctionGamePage = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState({});
    const [myCheckList, setMyCheckList] = useState([]);//이미 체크한 리스트
    const [myNewCheckList, setMyNewCheckList] = useState([]);//이번에 새로 체크한 리스트
    const [allCheckList, setAllCheckList] = useState([]);
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.get(`/api/item?table=auction&pk=${params?.pk}`);
            if (response?.result < 0) {
                alert(response?.message);
                navigate(-1);
                return;
            }
            // if (response?.data?.status != 1) {
            //     alert("종료된 게임 입니다.");
            //     navigate(-1);
            //     return;
            // }
            setGame(response?.data);
            if (response?.data?.status != 1) {
                getAllCheckList();
            }
        }
        fetchPost();
        getMyCheckList();
    }, []);
    const getMyCheckList = async () => {
        const { data: response } = await axios.post('/api/getmyauctionchecklist', {
            game_pk: params?.pk
        });
        setMyCheckList(response?.data ?? []);
    }
    const getAllCheckList = async () => {
        const { data: response } = await axios.post('/api/getallauctionchecklist', {
            game_pk: params?.pk
        });
        setAllCheckList(response?.data ?? []);
    }
    const onClickTr = (num) => {
        if (game?.status == 1) {
            let my_check_list = [...myCheckList];
            let my_new_check_list = [...myNewCheckList];
            if (my_check_list.includes(num) || my_new_check_list.includes(num)) {
                alert("이미 체크 하였습니다.");
                return;
            }
            my_new_check_list = [...my_new_check_list, ...[num]];
            setMyNewCheckList(my_new_check_list);
        }
    }
    const onSave = async () => {
        if (window.confirm("저장 하시겠습니까?")) {
            const { data: response } = await axios.post('/api/onauctionparticipate', {
                game_pk: params?.pk,
                check_list: myNewCheckList
            });
            if (response?.result > 0) {
                alert("성공적으로 저장되었습니다.");
                navigate(-1);
            } else {
                alert(response?.message);
            }
        }
    }
    return (
        <>
            <Wrappers className='wrappers'>
                <OneCard width={96} style={{ height: 'auto', cursor: 'default', flexDirection: 'column', alignItems: 'center' }}>
                    <Content style={{ maxWidth: '740px', width: '100%' }}>
                        <img src={backUrl + game?.img_src} style={{ maxWidth: '500px', height: 'auto', width: '100%' }} />
                        상품명: {game?.title}
                    </Content>
                    <Content style={{ maxWidth: '740px', width: '100%', marginTop: '16px', fontSize: theme.size.font4 }}>
                        1회 참여 스타: {commarNumber(game?.participate_star)}<br />
                        1회 참여 포인트: {commarNumber(game?.participate_point)}
                    </Content>
                    <Content style={{ maxWidth: '740px', width: '100%', fontSize: theme.size.font4 }}>
                        하루 최대 참여 스타: {commarNumber(game?.max_use_star)}<br />
                        하루 최대 참여 포인트: {commarNumber(game?.max_use_point)}
                    </Content>
                    <AuctionContent
                        game={game}
                        onClickTr={onClickTr}
                        myCheckList={myCheckList}
                        setMyCheckList={setMyCheckList}
                        myNewCheckList={myNewCheckList}
                        setMyNewCheckList={setMyNewCheckList}
                        allCheckList={allCheckList}
                    />
                </OneCard>
                <MBottomContent style={{ width: '100%', marginTop: '32px' }}>
                    <div />
                    <AddButton onClick={onSave}>저장</AddButton>
                </MBottomContent>
            </Wrappers>
        </>
    )
}
export default AuctionGamePage;