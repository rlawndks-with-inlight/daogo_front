import { useNavigate } from "react-router-dom";
import { commarNumber, returnMoment, dateFormat } from "../functions/utils";
import theme from "../styles/theme";
import { Table, Tr, Td } from "./elements/UserContentTemplete";
const ContentTable = (props) => {
    const navigate = useNavigate();
    const { columns, data, is_not_display_thead, schema, onClick } = props;

    const getHistoryByObj = (obj_, width) => {
        let obj = { ...obj_ };
        let result = "";
        if (obj?.type == 0) {//아울렛구매
            obj['explain_obj'] = JSON.parse(obj?.explain_obj ?? "{}");
            result = `아울렛쇼핑 ${obj['explain_obj']?.item_name ?? ""} 구매로 인해 사용 되었습니다.`;
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
                result = `${obj['explain_obj']?.user_id}(${obj['explain_obj']?.user_name}) 에게 ${commarNumber(obj?.price * (-1))} ${sche}를 선물 했습니다.`;
            }
        } else if (obj?.type == 4) {//출금
            obj['explain_obj'] = JSON.parse(obj?.explain_obj ?? "{}");
            result = "출금신청 하였습니다 " + `(`;
            if (obj['explain_obj']?.status == 0) {
                result += "접수대기";
            } else if (obj['explain_obj']?.status == 1) {
                result += "접수완료";
            } else if (obj['explain_obj']?.status == 2) {
                result += "지급완료";
            }
            result += ')';
        } else if (obj?.type == 5) {//관리자가 수정
            result = obj?.note;
        } else if (obj?.type == 6) {//데일리자동지급
            result = "";
        } else if (obj?.type == 7) {//데일리수동지급
            obj['explain_obj'] = JSON.parse(obj?.explain_obj ?? "{}");
            result = `출석 데일리포인트 ${obj['explain_obj']?.percent ? (obj['explain_obj']?.percent + '%') : ""} ${obj?.category ? obj?.category : ''} ${obj?.price >= 0 ? '지급 되었습니다.' : '차감 되었습니다.'}`;
        } else if (obj?.type == 8) {//청약예치금등록
            if (schema == 'star' || schema == 'point' || schema == 'esgw') {
                result = `청약예치금에 등록 하였습니다.`;
            } else {
                result = "";
            }
        } else if (obj?.type == 9) {//esgw포인트구매
            if (schema == 'point') {
                result = "ESGW포인트로 전환 하였습니다.";
            } else if (schema == 'esgw') {
                result = `${commarNumber(obj?.price * 10)} 포인트에서 ESGW포인트로 전환 하였습니다.`;
            }
        } else if (obj?.type == 10) {//매출등록
            obj['explain_obj'] = JSON.parse(obj?.explain_obj ?? "{}");
            if (schema == 'point' || schema == 'star') {
                result = `${obj['explain_obj']?.introduced_id}(${obj['explain_obj']?.introduced_name}) 회원에 의한 소개수익 발생하였습니다.`;
            } else if (schema == 'randombox') {
                result = `매출등록 랜덤박스 포인트 발생 하였습니다.`;
            }
        } else if (obj?.type == 11) {//이벤트 랜덤수익
            result = "이벤트 랜덤수익 발생하였습니다.";
        } else if (obj?.type == 12) {//이벤트 랜덤수익
            obj['explain_obj'] = JSON.parse(obj?.explain_obj ?? "{}");
            result = `직대 ${obj['explain_obj']?.user_id}회원의 아울렛 구매에 대한 수익이 발생하였습니다.`;
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
            if (obj['explain_obj']?.status == -1) {
                result = "반품처리";
            } else if (obj['explain_obj']?.status == 0) {
                result = "확인대기";
            } else if (obj['explain_obj']?.status == 1) {
                result = "주문확인";
            } else if (obj['explain_obj']?.status == 2) {
                result = "배달완료";
            } else {
                result = "---";
            }
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
        console.log(column)
        if (column == 'status') {
            if (obj['explain_obj']?.status == -1) {
                result = "반송";
            } else if (obj['explain_obj']?.status == 0) {
                result = "접수대기";
            } else if (obj['explain_obj']?.status == 1) {
                result = "접수완료";
            } else if (obj['explain_obj']?.status == 2) {
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

                <div style={{ width: '100%', background: '#fff', padding: '12px 0', boxShadow: theme.boxShadow, borderRadius: '8px', minHeight: '50vh', marginBottom: '16px' }}>
                    <Table>
                        {data.map((item, idx) => (
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
                                        {column.type === 'outlet_order' ?
                                            <>

                                                {getOutletHistoryByObj(item, column.column, column.width)}
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