import { useEffect, useState } from "react";
import { OneCard, OneThirdCard, Row, Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import axios from "axios";
import SearchComponent from "../../../components/SearchComponent";
import theme from "../../../styles/theme";
import { commarNumber, getSelectButtonColor, range } from "../../../functions/utils";
import styled from "styled-components";
import $ from 'jquery'
import { backUrl, historyContent } from "../../../data/ContentData";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import ContentTable from "../../../components/ContentTable";
const Select = styled.select`
width:100%;
border:none;
outline:none;
`
const ItemImg = styled.img`
margin-bottom: 8px;
width:100%;
height:202.5px;
box-shadow:${props => props.theme.itemBoxShadow};
border-radius: 8px;
@media screen and (max-width:1000px) {
    height:20.25vw;
}
@media screen and (max-width:650px) {
    height:43.07vw;
}
`
export const Col = styled.div`
display:flex;
flex-direction:column;
text-align:center;
width: 22.5%;
margin-bottom: 16px;
font-size: ${props => props.theme.size.font5};
font-weight:bold;
cursor:pointer;
@media screen and (max-width:650px) {
    width: 48%;
}
`
const OutletShoppingMall = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [typeNum, setTypeNum] = useState(0);
    const [brandList, setBrandList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [outletHistory, setOutletHistory] = useState([]);
    useEffect(() => {
        if(location?.state){
            setTypeNum(location?.state?.type_num);
            onChangeTypeNum(location?.state?.type_num)
        }
        async function fetchPosts() {
            setLoading(true);
            const { data: response } = await axios.post('/api/getalldatabytables', {
                tables: ['outlet_category', 'outlet_brand']
            })
            setBrandList(response?.data?.outlet_brand);
            setCategoryList(response?.data?.outlet_category);
            const { data: item_response } = await axios.get(`/api/items?table=outlet&order=sort`);
            setItemList(item_response?.data ?? []);
            setLoading(false);
        }
        fetchPosts();
    }, [])
    const onChangeTypeNum =  async(num) => {
        setTypeNum(num)
        if(num==1){
            const {data:response} = await axios.get('/api/items?table=outlet_order')
            setOutletHistory(response?.data);
            console.log(response)
        }
    }
    const onSearch = async () => {
        setLoading(true);
        let obj = {
            table: 'outlet',
            order: 'sort',
            keyword_columns: ['outlet_table.name'],
            keyword: $('.search-input').val(),
            category_pk: ($('.category').val() != 0 ? $('.category').val() : undefined),
            brand_pk: ($('.brand').val() != 0 ? $('.brand').val() : undefined),
        }
        const { data: response } = await axios.post(`/api/items`, obj)
        setItemList(response?.data ?? []);
        setLoading(false);
    }
    return (
        <>
            <Wrappers>
                <Title>아울렛쇼핑</Title>
                <SearchComponent onSearch={onSearch} />
                <Row style={{ margin: '0 0 12px 0', fontWeight: 'bold' }}>
                    <OneCard width={44.5} style={{ background: `${getSelectButtonColor(typeNum === 0).background}`, color: `${getSelectButtonColor(typeNum === 0).color}`, height: '48px', cursor: 'default' }}
                        onClick={() => { onChangeTypeNum(0) }}>
                        <div style={{ margin: 'auto' }}>상품리스트</div>
                    </OneCard>
                    <OneCard width={44.5} style={{ background: `${getSelectButtonColor(typeNum === 1).background}`, color: `${getSelectButtonColor(typeNum === 1).color}`, height: '48px', cursor: 'default' }}
                        onClick={() => { onChangeTypeNum(1) }}>
                        <div style={{ margin: 'auto' }}>주문리스트</div>
                    </OneCard>
                </Row>
                {typeNum === 0 ?
                    <>
                        <Row style={{ margin: '0 0 20px 0' }}>
                            <OneThirdCard style={{ width: '44.5%' }}>
                                <Select className="category" onChange={onSearch} style={{ background: 'transparent' }}>
                                    <option value={0}>{"-- 카테고리 --"}</option>
                                    {categoryList.map((item, idx) => (
                                        <>
                                            <option value={item.pk}>{item?.name ?? ""}</option>
                                        </>
                                    ))}
                                </Select>
                            </OneThirdCard>
                            <OneThirdCard style={{ width: '44.5%' }}>
                                <Select className="brand" onChange={onSearch} style={{ background: 'transparent' }}>
                                    <option value={0}>{"-- 브랜드 --"}</option>
                                    {brandList.map((item, idx) => (
                                        <>
                                            <option value={item.pk}>{item?.name ?? ""}</option>
                                        </>
                                    ))}
                                </Select>
                            </OneThirdCard>
                        </Row>
                        {loading ?
                            <>
                                <Loading />
                            </>
                            :
                            <>
                                <Row style={{ margin: '0 0 16px 0', flexWrap: 'wrap' }}>
                                    {itemList.map((item, index) => (
                                        <>
                                            <Col onClick={() => { navigate(`/item/outlet/${item?.pk}`) }}>
                                                <ItemImg src={backUrl + item?.img_src} />
                                                <div style={{ marginBottom: '8px' }}>{item.name}</div>
                                                <div style={{ color: theme.color.background1 }}>{commarNumber(item.sell_star)} 스타</div>
                                            </Col>
                                        </>
                                    ))}
                                    {itemList && range(0, (window.innerWidth >= 650 ? ((4 - 1) - 4 % itemList.length) : ((2 - 1) - 2 % itemList.length))).map(() => (
                                        <>
                                            <Col style={{ cursor: 'default' }}></Col>
                                        </>
                                    ))}
                                </Row>
                            </>}
                    </>
                    :
                    <>
                    <ContentTable columns={historyContent['outlet_order'].columns}
                    data={outletHistory}
                    schema={'outlet_order'} />
                    </>}


            </Wrappers>
        </>
    )
}
export default OutletShoppingMall;