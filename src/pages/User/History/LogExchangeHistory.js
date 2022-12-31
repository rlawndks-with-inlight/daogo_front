import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { OneCard, Title, Wrappers } from "../../../components/elements/UserContentTemplete"
import { commarNumber, makeMaxPage, range } from "../../../functions/utils";
import MBottomContent from "../../../components/elements/MBottomContent";
import PageButton from "../../../components/elements/pagination/PageButton";
import PageContainer from "../../../components/elements/pagination/PageContainer";
import theme from "../../../styles/theme";
import { ItemComponent } from "./logmoney-utiles";
import styled from "styled-components";
import {BsCheck2All, BsCheck2} from 'react-icons/bs';
import {FcCancel} from 'react-icons/fc';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
const RowComponent = styled.div`
display:flex;
align-items:center;
@media screen and (max-width:500px) {
    align-items:flex-start;
}
`
const LogMoneyComponent = (props) => {
    let { data } = props;
    const getICon = (status)=>{
        if(status==-1){
            return (
                <>
            <FcCancel style={{color:theme.color.red,width:'24px'}}/><div>반송</div>
            </>
            );
        }else if(status==0){
            return (
                <>
            <AiOutlineLoading3Quarters style={{color:theme.color.background2,width:'24px'}}/><div>접수대기</div>
            </>
            );
        }else if(status==1){
            return (
                <>
            <BsCheck2 style={{color:theme.color.blue,width:'24px'}}/><div>접수완료</div>
            </>
            );
        }else if(status==2){
            return (
                <>
            <BsCheck2All style={{color:theme.color.blue,width:'24px'}}/><div>지급완료</div>
            </>
            );
        }
    }
   
    return (
        <>
            <OneCard style={{ marginTop: '8px', boxShadow: '0px 2px 2px #00000029', height: 'auto', minHeight: '56px', fontSize: theme.size.font4, lineHeight: '30px', padding: '16px',minWidth:'300px' }}>
                <RowComponent>
                    <div style={{display:'flex',alignItems:'center'}}>
                        {getICon(data?.status)}
                    </div>
                </RowComponent>
                <RowComponent>
                    <div style={{display:'flex',alignItems:'center'}}>
                    <div style={{fontSize: theme.size.font5, color: theme.color.font5,width:'72px'}}>신청일시</div>
                    <div>{data?.date}</div>
                    </div>
                </RowComponent>
                <RowComponent style={{borderBottom:`1px dashed ${theme.color.font6}`}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                    <div style={{fontSize: theme.size.font5, color: theme.color.font5,width:'72px'}}>지급일시</div>
                    <div style={{fontWeight:'bold'}}>{data?.explain_obj?.date??"---"}</div>
                    </div>
                </RowComponent>
                <RowComponent style={{borderBottom:`1px dashed ${theme.color.font6}`}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                    <div style={{fontSize: theme.size.font5, color: theme.color.font5,width:'72px'}}>차감스타</div>
                    <div>{commarNumber(data?.price*(-1))} ({data?.explain_obj?.withdraw_commission_percent??0}% 정산수수료 포함)</div>
                    </div>
                </RowComponent>
                <RowComponent>
                    <div style={{display:'flex',alignItems:'center'}}>
                    <div style={{fontSize: theme.size.font5, color: theme.color.font5,width:'72px'}}>산출금액</div>
                    <div>{commarNumber(data?.price*(-1)*100)} 원</div>
                    </div>
                </RowComponent>
                <RowComponent>
                    <div style={{display:'flex',alignItems:'center'}}>
                    <div style={{fontSize: theme.size.font5, color: theme.color.font5,width:'72px'}}>정산수수료</div>
                    <div>{commarNumber(data?.price*(-1)*100-data?.explain_obj?.receipt_won??0)}</div>
                    </div>
                </RowComponent>
                <RowComponent style={{borderBottom:`1px dashed ${theme.color.font6}`,marginTop:'48px'}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                    <div style={{fontSize: theme.size.font5, color: theme.color.font5,width:'72px'}}>지급금액</div>
                    <div style={{fontWeight:'bold',color:'#fc427b'}}>{commarNumber(data?.explain_obj?.receipt_won??0)} 원</div>
                    </div>
                </RowComponent>
                <RowComponent>
                    <div style={{display:'flex',alignItems:'center'}}>
                    <div style={{fontSize: theme.size.font5, color: theme.color.font5,width:'72px'}}>출금구분</div>
                    <div>{'현금'}</div>
                    </div>
                </RowComponent>
                <RowComponent>
                    <div style={{display:'flex',alignItems:'center'}}>
                    <div style={{fontSize: theme.size.font5, color: theme.color.font5,width:'72px'}}>입금계좌</div>
                    <div>{data?.bank_name??"---"} / {data?.account_number??"---"} / {data?.account_name??"---"}</div>
                    </div>
                </RowComponent>
            </OneCard>
        </>
    )
}
const LogExchangeHistory = () => {
    const params = useParams();
    const { pathname } = useLocation();
    const [posts, setPosts] = useState([]);
    const [isPlus, setIsPlus] = useState(false);
    const [isMinus, setIsMinus] = useState(false);
    const [pageList, setPageList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    useEffect(() => {
        fetchPosts(1);
    }, [])
    async function fetchPosts(num) {
        setPage(num)
        const { data: response } = await axios.get(`/api/exchangehistory?page=${num}&page_cut=4`);
        let list = [...response.data.data];
        for (var i = 0; i < list.length; i++) {
            if (!list[i][`explain_obj`]) {
                list[i][`explain_obj`] = {};
            } else {
                list[i][`explain_obj`] = JSON.parse(list[i][`explain_obj`] ?? {});
            }
        }
        setPosts([...list]);
        setPageList(range(1, makeMaxPage(response.data.maxPage, 4)));
    }
    return (
        <>
            <Wrappers className='wrappers'>
                <Title not_arrow={true}>{'출금신청 내역'}</Title>
                {posts.map((item, idx) => (
                    <>
                        <LogMoneyComponent data={item} />
                    </>
                ))}
                <MBottomContent>
                    <div />
                    <PageContainer>
                        <PageButton onClick={() => fetchPosts(1)}>
                            처음
                        </PageButton>
                        {pageList.map((item, index) => (
                            <>
                                <PageButton onClick={() => fetchPosts(item)} style={{ color: `${page == item ? '#fff' : ''}`, background: `${page == item ? theme.color.background1 : ''}`, display: `${Math.abs(index + 1 - page) > 4 ? 'none' : ''}` }}>
                                    {item}
                                </PageButton>
                            </>
                        ))}
                        <PageButton onClick={() => fetchPosts(pageList.length ?? 1)}>
                            마지막
                        </PageButton>
                    </PageContainer>
                    <div />
                </MBottomContent>
            </Wrappers>
        </>
    )
}
export default LogExchangeHistory;