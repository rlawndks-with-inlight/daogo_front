import axios from "axios";
import { useNavigate } from "react-router-dom";
import { commarNumber, returnMoment, dateFormat, range } from "../functions/utils";
import theme from "../styles/theme";
import AddButton from "./elements/button/AddButton";
import { Select } from "./elements/ManagerTemplete";
import { Table, Tr, Td } from "./elements/UserContentTemplete";
import { GiBuyCard } from 'react-icons/gi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import $ from 'jquery';
const ContentTable = (props) => {
    const navigate = useNavigate();
    const { columns, data, is_not_display_thead, schema, onClick, onChangeTypeNum, refreshPage } = props;

    const getHistoryByObj = (obj_, width) => {
        let obj = { ...obj_ };
        let result = "";
        if (obj?.type == 0) {//아울렛구매
            obj['explain_obj'] = JSON.parse(obj?.explain_obj ?? "{}");
            if (obj?.price > 0) {
                result = `아울렛쇼핑 반환 금액 지급 되었습니다.`;
            } else {
                result = `아울렛쇼핑 ${obj['explain_obj']?.item_name ?? ""} 구매로 인해 사용 되었습니다.`;
            }
        } else if (obj?.type == 1) {//쿠폰 구매
            result = "";
        } else if (obj?.type == 2) {//랜덤박스 등록
            if (schema == 'star' || obj?.category == 'star') {
                result = "랜덤박스로 전환 하였습니다.";
            } else if (schema == 'randombox' || obj?.category == 'randombox') {
                result = ` ${commarNumber(obj?.price / 3)} 스타에서 랜덤박스로 전환 하였습니다.`;
            } else {
                result = "";
            }
        } else if (obj?.type == 3) {//선물하기
            obj['explain_obj'] = JSON.parse(obj?.explain_obj ?? "{}");
            let sche = "";
            if (schema == 'star') {//쿠폰 구매
                sche = "스타";
            } else if (schema == 'point') {
                sche = "포인트";
            }
            if (schema == 'gift') {
                sche = obj?.category;
            }
            if (obj?.price > 0) {
                result = `${obj['explain_obj']?.user_id}(${obj['explain_obj']?.user_name}) 로부터 ${commarNumber(obj?.price)} ${sche}를 선물 받았습니다.`;
            } else {
                result = `${obj['explain_obj']?.user_id}(${obj['explain_obj']?.user_name}) 에게 ${commarNumber((obj?.price * (100 / (100 + (obj['explain_obj']?.commission ?? 0)))) * (-1))} ${sche}를 선물 했습니다.`;
            }
        } else if (obj?.type == 4) {//출금
            obj['explain_obj'] = JSON.parse(obj?.explain_obj ?? "{}");
            result = "출금신청 하였습니다 " + `(`;
            if (obj?.status == 0) {
                result += "접수대기";
            } else if (obj?.status == -1) {
                result += "반송";
            } else if (obj?.status == 1) {
                result += "접수완료";
            } else if (obj?.status == 2) {
                result += "지급완료";
            }
            result += ')';
            if (obj?.price > 0) {
                result = "출금 반송된 건 지급되었습니다."
            }
        } else if (obj?.type == 5) {//관리자가 수정
            result = obj?.note;
        } else if (obj?.type == 6) {//데일리자동지급
            obj['explain_obj'] = JSON.parse(obj?.explain_obj ?? "{}");
            result = `데일리 자동 차감 랜덤박스 포인트 -${obj['explain_obj'].percent}% 되었습니다.`;
        } else if (obj?.type == 7) {//데일리수동지급
            obj['explain_obj'] = JSON.parse(obj?.explain_obj ?? "{}");
            result = `출석 데일리포인트 ${obj['explain_obj']?.percent ? (obj['explain_obj']?.percent + '%') : ""} ${obj?.category ? obj?.category : ''} ${obj?.price >= 0 ? '지급 되었습니다.' : '차감 되었습니다.'}`;
        } else if (obj?.type == 8) {//청약예치금등록
            if (schema == 'star' || schema == 'point' || schema == 'esgw') {
                result = `청약예치금에 등록 하였습니다.`;
            } else {
                result = "";
            }
        } else if (obj?.type == 9) {//ESGWP구매
            if (schema == 'point') {
                result = "ESGWP로 전환 하였습니다.";
            } else if (schema == 'esgw') {
                result = `${commarNumber(obj?.price * 10)} 포인트에서 ESGWP로 전환 하였습니다.`;
            }
        } else if (obj?.type == 10) {//매출등록
            obj['explain_obj'] = JSON.parse(obj?.explain_obj ?? "{}");
            if (schema == 'point' || schema == 'star') {
                result = `${obj['explain_obj']?.introduced_id}(${obj['explain_obj']?.introduced_name}) 회원에 의한 소개수익 발생하였습니다.`;
            } else if (schema == 'randombox') {
                result = `매출등록 랜덤박스 포인트 발생 하였습니다.`;
            }
        } else if (obj?.type == 11) {//이벤트 랜덤수익
            if (obj['explain_obj'].length == 0) {
                obj['explain_obj'] = "{}";
            }
            obj['explain_obj'] = JSON.parse(obj['explain_obj'] ?? "{}");
            result = ` ${obj['explain_obj']?.user_id} 회원으로 인한 이벤트 롤링수익 발생하였습니다.`;
        } else if (obj?.type == 12) {//산하유저 아울렛 구매
            obj['explain_obj'] = JSON.parse(obj['explain_obj'] ?? "{}");
            if (obj?.price > 0) {
                result = `직대 ${obj['explain_obj']?.user_id}회원의 아울렛 구매에 대한 수익이 발생 하였습니다.`;
            } else {
                result = `직대 ${obj['explain_obj']?.user_id}회원의 아울렛 구매 반환에 대해 차감 되었습니다.`;
            }
        } else if (obj?.type == 13) {//상품구매시 랜덤박스 포인트 받기
            if (obj?.price > 0) {
                result = `아울렛 상품 구매 후 랜덤박스 포인트 혜택 지급 받았습니다.`;
            } else {
                result = `아울렛 상품 구매 반환에 대해 회수 되었습니다.`;
            }
        } else if (obj?.type == 14) {//월정산
            result = `월 정산 지급 되었습니다.`;
        } else if (obj?.type == 15) {//주정산
            result = `주 정산 지급 되었습니다.`;
        } else {
            result = "---";
        }
        return <Td style={{ width: `${width}%`, whiteSpace: 'pre-line' }}>{result}</Td>;
    }
    const getOutletHistoryByObj = (obj_, column_, width) => {
        let obj = { ...obj_ };
        let column = column_;
        let result = "";
        obj['explain_obj'] = JSON.parse(obj?.explain_obj ?? "{}");
        if (column == 'item_count') {
            result = obj['explain_obj']?.count;
        } else if (column == 'use_star') {
            result = commarNumber(obj?.price * (-1));
        } else if (column == 'use_point') {
            result = commarNumber(obj['explain_obj']?.point);
        } else if (column == 'status') {
            if (obj?.status == -2) {
                result = "주문취소";
            } else if (obj?.status == -1) {
                result = "반품처리";
            } else if (obj?.status == 0) {
                result = "확인대기";
            } else if (obj?.status == 1) {
                result = "주문확인";
            } else if (obj?.status == 2) {
                result = "배송완료";
            } else {
                result = "---";
            }
        } else if (column == 'return_reason') {
            result = obj['explain_obj']?.return_reason;
        } else {
            result = "---";
        }
        return <Td style={{ width: `${width}%`, whiteSpace: 'pre-line' }}>{result}</Td>;
    }
    const getWithdrawRequest = (obj_, column_, width) => {
        let obj = { ...obj_ };
        let column = column_;
        let result = "";
        obj['explain_obj'] = JSON.parse(obj?.explain_obj ?? "{}");
        if (column == 'status') {
            if (obj?.status == -1) {
                if (obj?.price > 0) {
                    result = "반송지급";
                } else {
                    result = "반송";
                }
            } else if (obj?.status == 0) {
                result = "접수대기";
            } else if (obj?.status == 1) {
                result = "접수완료";
            } else if (obj?.status == 2) {
                result = "지급완료";
            }
        } else if (column == 'date') {
            result = dateFormat(obj['explain_obj']?.date);
        } else if (column == 'commission') {
            result = commarNumber(obj['explain_obj']?.star * (obj['explain_obj']?.withdraw_commission_percent / 100))
        } else if (column == 'payout') {
            result = commarNumber(obj['explain_obj']?.receipt_won)
        } else {
            result = "---";
        }
        return <Td style={{ width: `${width}%`, whiteSpace: 'pre-line' }}>{result}</Td>;
    }
    const onChangeOutletOrderStatus = async (num, item) => {//아울렛 주문 상태관리
        let confirm_str = "";
        if (num == -2) {
            confirm_str = "주문취소 하시겠습니까?";
        } else {
            return;
        }
        if (window.confirm(confirm_str)) {
            const { data: response } = await axios.post('/api/onchangeoutletorderstatus', {
                status: num,
                pk: item?.pk,
            })
            if (response?.result < 0) {
                alert(response?.message);
            } else {
                alert("성공적으로 저장되었습니다.");
                await onChangeTypeNum(1);
                await new Promise((r) => setTimeout(r, 500));
            }
        }
    }
    const deleteBag = async (idx) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            let bag = await localStorage.getItem('bag');
            bag = JSON.parse(bag);
            bag.splice(idx, 1);
            await localStorage.setItem('bag', JSON.stringify(bag));
            refreshPage();
        }
    }
    return (
        <>
            <div className='subtype-container' style={{ overflowX: 'auto', display: 'flex', flexDirection: 'column', width: '100%', margin: '0 auto' }} >
                {is_not_display_thead ?
                    <>
                    </>
                    :
                    <>
                        <div style={{ width: '100%', padding: '16px 0', borderRadius: '8px', background: theme.color.background1, color: '#fff', display: 'flex', boxShadow: theme.boxShadow, fontSize: theme.size.font3, marginBottom: '16px' }}>
                            {columns.map((item, idx) => (
                                <>
                                    <div style={{ width: `${item.width}%`, textAlign: 'center', borderLeft: `${idx !== 0 ? '1px solid #fff' : ''}` }}>{item.name}</div>
                                </>
                            ))}
                        </div>
                    </>}

                <div style={{ width: '100%', background: '#fff', boxShadow: theme.boxShadow, borderRadius: '8px', minHeight: '50vh', marginBottom: '16px' }}>
                    <Table>
                        {data.map((item, index) => (
                            <Tr style={{ cursor: `${onClick ? 'pointer' : ''}` }} onClick={() => {
                                if (onClick) {
                                    onClick(item?.pk)
                                } else {

                                }
                            }}>
                                {columns.map((column, idx) => (
                                    <>
                                        {column.type === 'text' ?
                                            <>
                                                <Td style={{ width: `${column.width}%` }}>{item[`${column.column}`]}</Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type === 'option_name' ?
                                            <>
                                                <Td style={{ width: `${column.width}%` }}>{JSON.parse(item[`explain_obj`])?.option?.name ?? "---"}</Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type === 'date' ?
                                            <>
                                                <Td style={{ width: `${column.width}%` }}>{dateFormat(item[`${column.column}`])}</Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type === 'number' ?
                                            <>
                                                <Td style={{ width: `${column.width}%`, color: `${item[`${column.column}`] >= 0 ? '#1A7EFC' : theme.color.red}` }}>{item[`${column.column}`] >= 0 ? '+' : ''}{commarNumber(item[`${column.column}`])}</Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type === 'price' ?
                                            <>
                                                <Td style={{ width: `${column.width}%`, color: `${item[`${column.column}`] >= 0 ? '#1A7EFC' : theme.color.red}` }}>{item[`${column.column}`] >= 0 ? '+' : ''}{commarNumber(item[`${column.column}`])}</Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type === 'history' ?
                                            <>
                                                {getHistoryByObj(item, column.width)}
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type === 'select_count' ?
                                            <>
                                                <Td style={{ width: `${column.width}%` }}>
                                                    <Select style={{ width: '80%', margin: '6px 0' }} className={`select-count-${index}`}>
                                                        {range(1, 10).map((item, idx) => (
                                                            <>
                                                                <option value={item}>{item}</option>
                                                            </>
                                                        ))}
                                                    </Select>
                                                </Td>

                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type === 'order' ?
                                            <>
                                                <Td style={{ width: `${column.width}%`, color: theme.color.background1 }}>
                                                    <GiBuyCard style={{ fontSize: theme.size.font2, cursor: 'pointer' }}
                                                        onClick={() => { navigate(`/item/outlet/order/${item?.pk}`, { state: { count: $(`.select-count-${index}`).val(), option: item?.option, index: index } }) }} />
                                                </Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type === 'delete_bag' ?
                                            <>
                                                <Td style={{ width: `${column.width}%`, color: theme.color.red }}>
                                                    <RiDeleteBin5Line style={{ fontSize: theme.size.font2, cursor: 'pointer' }} onClick={() => deleteBag(index)} />
                                                </Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type === 'outlet_order' ?
                                            <>

                                                {getOutletHistoryByObj(item, column.column, column.width)}
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type === 'outlet_order_cancel' ?
                                            <>
                                                {item?.status == 0 ?
                                                    <>
                                                        <Td>
                                                            <AddButton style={{ width: '72px' }} onClick={() => { onChangeOutletOrderStatus(-2, item) }}>주문취소</AddButton>
                                                        </Td>
                                                    </>
                                                    :
                                                    <>
                                                        <Td>---</Td>
                                                    </>
                                                }
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type === 'withdraw_request' ?
                                            <>

                                                {getWithdrawRequest(item, column.column, column.width)}
                                            </>
                                            :
                                            <>
                                            </>}
                                    </>
                                ))}
                            </Tr>
                        ))}

                    </Table>
                </div>

            </div>
        </>
    )
}
export default ContentTable;