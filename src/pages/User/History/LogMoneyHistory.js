import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { OneCard, Title, Wrappers } from "../../../components/elements/UserContentTemplete"
import { commarNumber, range } from "../../../functions/utils";
import MBottomContent from "../../../components/elements/MBottomContent";
import PageButton from "../../../components/elements/pagination/PageButton";
import PageContainer from "../../../components/elements/pagination/PageContainer";
import theme from "../../../styles/theme";
import { ItemComponent } from "./logmoney-utiles";
import styled from "styled-components";

const RowComponent = styled.div`
display:flex;
align-items:center;
@media screen and (max-width:500px) {
    flex-direction:column;
    align-items:flex-start;
}
`
const LogMoneyComponent = (props) => {
    let { data } = props;
    let [returnType, setReturnType] = useState({});
    useEffect(() => {
        setReturnType(return_obj_by_type[data?.type]);
    }, [props])
    const returnTypeFormat = (name, color, s_cal, s_per, p_cal, p_per, r_cal, r_per, e_cal, e_per) => {
        return {
            name: name,
            color: color,
            s_cal: s_cal,
            s_per: s_per,
            p_cal: p_cal,
            p_per: p_per,
            r_cal: r_cal,
            r_per: r_per,
            e_cal: e_cal,
            e_per: e_per,
        }
    }
    let return_obj_by_type = {
        0: returnTypeFormat(`쇼핑몰 ${data?.s_t_price > 0 ? '반환' : '구매'}`, 'rgb(0, 210, 211)'),
        1: returnTypeFormat(`쿠폰 ${data?.s_t_price > 0 ? '반환' : '구매'}`, ''),
        2: returnTypeFormat('랜덤박스 변환', 'rgb(243, 104, 224)'),
        3: returnTypeFormat('선물', 'rgb(243, 156, 18)'),
        4: returnTypeFormat('출금', 'rgb(95, 39, 205)'),
        5: returnTypeFormat('관리자 수정', 'rgb(52, 73, 94)'),
        6: returnTypeFormat(`데일리자동 ${data?.s_t_price > 0 ? '적립' : '차감'}`, 'rgb(22, 160, 133)'),
        7: returnTypeFormat('출석보너스', 'rgb(252, 66, 123)'),
        8: returnTypeFormat('청약예치금', 'rgb(211, 84, 0)'),
        9: returnTypeFormat('ESGW(P) 변환', 'rgb(16, 172, 132)'),
        10: returnTypeFormat(`${data?.s_t_explain_obj?.introduced_id?'추천수당':'매출등록'}`, 'rgb(125, 95, 255)'),
        11: returnTypeFormat('이벤트보너스', 'rgb(234, 181, 67)'),
        12: returnTypeFormat(`직대회원 아울렛 ${data.r_t_price > 0 ? '구매' : '구매취소'}`, 'rgb(196, 229, 56)'),
        13: returnTypeFormat(''),
        14: returnTypeFormat('월결산', 'rgb(205, 132, 241)'),
        15: returnTypeFormat('주결산', 'rgb(197, 108, 240)'),
    }
    return (
        <>
            <OneCard style={{ marginTop: '8px', boxShadow: '0px 2px 2px #00000029', height: 'auto', minHeight: '56px', fontSize: theme.size.font4, lineHeight: '30px', padding: '16px',minWidth:'300px' }}>
                <RowComponent>
                    <button style={{ background: returnType?.color, width: 'auto', border: 'none', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{returnType?.name}</button>
                    <div style={{ marginLeft: '8px', color: 'rgb(27, 20, 100)', fontWeight: 'bold' }}>{data?.date}</div>
                </RowComponent>
                {data?.type==11 || data?.type==12?
                <>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontSize: theme.size.font5, color: theme.color.font5, width: '64px' }}>From</div>
                    <div>{data?.r_t_explain_obj?.user_id}</div>
                </div>
                </>
                :
                <>
                </>}
                {data?.type==3?
                <>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontSize: theme.size.font5, color: theme.color.font5, width: '64px' }}>{(data?.s_t_price>0 || data?.p_t_price>0 || data?.e_t_price>0)?'From':'To'}</div>
                    <div>{data?.s_t_explain_obj?.user_id}</div>
                </div>
                </>
                :
                <>
                </>}
                {data?.type==10 && data?.s_t_explain_obj?.introduced_id ?
                <>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontSize: theme.size.font5, color: theme.color.font5, width: '64px' }}>From</div>
                    <div>{data?.s_t_explain_obj?.introduced_id}</div>
                </div>
                </>
                :
                <>
                </>}
                <div style={{ width: '100%', borderBottom: `1px solid ${theme.color.font6}`, display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontSize: theme.size.font5, color: theme.color.font5, width: '64px' }}>적용</div>
                    <div><ItemComponent schema={'apply'} data={data} /></div>
                </div>
                <RowComponent>
                    <div style={{ fontSize: theme.size.font5, color: theme.color.font5, width: '64px' }}>스타</div>
                    <div><ItemComponent schema={'star'} data={data} /></div>
                </RowComponent>
                <RowComponent>
                    <div style={{ fontSize: theme.size.font5, color: theme.color.font5, width: '64px' }}>포인트</div>
                    <div><ItemComponent schema={'point'} data={data} /></div>
                </RowComponent>
                <RowComponent>
                    <div style={{ fontSize: theme.size.font5, color: theme.color.font5, width: '64px' }}>랜덤박스</div>
                    <div><ItemComponent schema={'randombox'} data={data} /></div>
                </RowComponent>
                <RowComponent>
                    <div style={{ fontSize: theme.size.font5, color: theme.color.font5, width: '64px' }}>ESGWP</div>
                    <div><ItemComponent schema={'esgw'} data={data} /></div>
                </RowComponent>
            </OneCard>
        </>
    )
}
const LogMoneyHistory = () => {
    const params = useParams();
    const { pathname } = useLocation();
    const [posts, setPosts] = useState([]);
    const [isPlus, setIsPlus] = useState(false);
    const [isMinus, setIsMinus] = useState(false);
    const [pageList, setPageList] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        fetchPosts(1);
    }, [])
    async function fetchPosts(num) {
        setPage(num)
        const { data: response } = await axios.get(`/api/items?table=log_money&page=${num}&page_cut=10`);
        let list = [...response.data.data];
        for (var i = 0; i < list.length; i++) {
            let money_categories = ['s', 'e', 'r', 'p'];
            for (var j = 0; j < money_categories.length; j++) {
                if (!list[i][`${money_categories[j]}_t_explain_obj`]) {
                    list[i][`${money_categories[j]}_t_explain_obj`] = {};
                } else {
                    list[i][`${money_categories[j]}_t_explain_obj`] = JSON.parse(list[i][`${money_categories[j]}_t_explain_obj`] ?? {});
                }
                if (!list[i][`${money_categories[j]}_t_price`]) {
                    list[i][`${money_categories[j]}_t_price`] = 0;
                }
            }
        }
        setPosts([...list]);
        setPageList(range(1, response.data.maxPage));
    }
    return (
        <>
            <Wrappers className='wrappers'>
                <Title not_arrow={true}>{'변동로그'}</Title>
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
export default LogMoneyHistory;