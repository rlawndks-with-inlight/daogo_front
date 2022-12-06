import { useEffect, useState } from "react";
import { OneCard, OneThirdCard, Row, Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import axios from "axios";
import SearchComponent from "../../../components/SearchComponent";
import theme from "../../../styles/theme";
import { commarNumber, getSelectButtonColor, range } from "../../../functions/utils";
import styled from "styled-components";
import $ from 'jquery'
import { backUrl } from "../../../data/ContentData";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import nextIcon from '../../../assets/images/icon/next.svg'
const Select = styled.select`
width:100%;
border:none;
outline:none;
`
const ItemImg = styled.img`
margin-bottom: 8px;
width:100%;
height:202.5px;
border-radius: 8px;
border:1px solid ${props => props.theme.color.font3};
@media screen and (max-width:1000px) {
    height:20.25vw;
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

`
const CouponShoppingMall = () => {
    const navigate = useNavigate();
    const [typeNum, setTypeNum] = useState(0);
    const [brandList, setBrandList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            const { data: response } = await axios.post('/api/getalldatabytables', {
                tables: ['coupon_category', 'coupon_brand']
            })
            setBrandList(response?.data?.coupon_brand);
            setCategoryList(response?.data?.coupon_category);
            const { data: item_response } = await axios.get(`/api/items?table=coupon&order=sort`);
            setItemList(item_response?.data ?? []);
            setLoading(false);
        }
        fetchPosts();
    }, [])
    const onChangeTypeNum = (num) => {
        setTypeNum(num)
    }
    const onSearch = async () => {
        setLoading(true);
        let obj = {
            table: 'coupon',
            order: 'sort',
            keyword_columns: ['coupon_table.name'],
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
                <Title>쿠폰이벤트</Title>
                <SearchComponent onSearch={onSearch} />
                <Row style={{ margin: '0 0 12px 0', fontWeight: 'bold'}}>
                    <OneCard width={96} style={{ background: `${getSelectButtonColor(typeNum === 0).background}`, color: `${getSelectButtonColor(typeNum === 0).color}`, height: '48px', flexDirection: 'row', cursor: 'default'  }}
                        onClick={() => { onChangeTypeNum(0) }}>
                        <div style={{ width: '45%', display: 'flex' }}>
                            <div style={{ margin: 'auto' }}>상품리스트</div>
                        </div>
                        <div style={{ width: '10%', display: 'flex' }}>
                            <img src={nextIcon} style={{ margin: 'auto' }} />
                        </div>
                        <div style={{ width: '45%', display: 'flex' }}>
                            <Select className="category select-option" onChange={onSearch} style={{ margin: 'auto', background: 'transparent', fontWeight: 'bold', fontSize: theme.size.font4, width: '30%', minWidth: '100px' }}>
                                <option value={0}>{"카테고리전체"}</option>
                                {categoryList.map((item, idx) => (
                                    <>
                                        <option value={item.pk}>{item?.name ?? ""}</option>
                                    </>
                                ))}
                            </Select>
                        </div>
                    </OneCard>

                </Row>
                <Row style={{ margin: '0 0 16px 0', flexWrap: 'wrap', minHeight: '160px' }}>
                    {brandList.map((item, index) => (
                        <>
                            <Col>
                                <ItemImg src={backUrl + item?.img_src} />
                                <div style={{ marginBottom: '8px' }}>{item.name}</div>
                            </Col>
                        </>
                    ))}
                    {brandList && range(0, ((4 - 1) - 4 % itemList.length)).map(() => (
                        <>
                            <Col style={{ cursor: 'default' }}></Col>
                        </>
                    ))}
                </Row>
                <Row style={{ margin: '0 0 20px 0', fontWeight: 'bold'}}>
                    <OneCard width={96} style={{ background: `${getSelectButtonColor(typeNum === 0).background}`, color: `${getSelectButtonColor(typeNum === 0).color}`, height: '48px', flexDirection: 'row', cursor: 'default'  }}
                        onClick={() => { onChangeTypeNum(0) }}>
                        <div style={{ width: '55%', display: 'flex' }}/>
                        
                        <div style={{ width: '45%', display: 'flex' }}>
                            <Select className="brand select-option" onChange={onSearch} style={{ margin: 'auto', background: 'transparent', fontWeight: 'bold', fontSize: theme.size.font4, width: '30%', minWidth: '100px' }}>
                                <option value={0}>{"브랜드전체"}</option>
                                {brandList.map((item, idx) => (
                                    <>
                                        <option value={item.pk}>{item?.name ?? ""}</option>
                                    </>
                                ))}
                            </Select>
                        </div>
                    </OneCard>

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
                                    <Col onClick={() => { navigate(`/item/coupon/${item?.pk}`) }}>
                                        <ItemImg src={backUrl + item?.img_src} />
                                        <div style={{ marginBottom: '8px' }}>{item.name}</div>
                                    </Col>
                                </>
                            ))}
                            {itemList && range(0, ((4 - 1) - 4 % itemList.length)).map(() => (
                                <>
                                    <Col style={{ cursor: 'default' }}></Col>
                                </>
                            ))}
                        </Row>
                    </>}

            </Wrappers>
        </>
    )
}
export default CouponShoppingMall; 