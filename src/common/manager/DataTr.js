import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'
import { backUrl } from '../../data/Manager/ManagerContentData'
import { BiEditAlt } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { CgToggleOn, CgToggleOff } from 'react-icons/cg'
import { AiOutlineDollar } from 'react-icons/ai'
import theme from '../../styles/theme'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { GrLinkTop } from 'react-icons/gr'
import { commarNumber, dateFormat, getTierByUserTier, numberToCategory } from '../../functions/utils'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { RiMoneyDollarBoxFill } from 'react-icons/ri'
import { TbReportMoney } from 'react-icons/tb';
import { Button } from '../../components/elements/AuthContentTemplete'
import AddButton from '../../components/elements/button/AddButton'
import $ from 'jquery';
import { Input } from '../../components/elements/ManagerTemplete'
const Tr = styled.tr`
box-shadow:1px 1px 1px #00000029;
font-size:11px;
background:#fff;
color:${props => props.theme.color.manager.font2};

`
const Td = styled.td`
text-align:center;
padding:14px 0;
margin-bottom:6px;
`
const ItemTypes = { CARD: 'card' }
export const getTextByLogType = (obj_, schema) => {
    let obj = { ...obj_ };

    let result = "";

    if (obj?.type == 0) {//아울렛구매
        result = `아울렛쇼핑 구매로 인해 사용 되었습니다.`;
        if (obj?.price > 0) {
            result = "아울렛 반환된 건 지급되었습니다."
        }
    } else if (obj?.type == 1) {//쿠폰 구매
        result = "";
    } else if (obj?.type == 2) {//랜덤박스 등록
        if (schema == 'log_star') {
            result = "랜덤박스로 전환 하였습니다.";
        } else if (schema == 'log_randombox') {
            result = ` ${commarNumber(obj?.price / 3)} 스타에서 랜덤박스로 전환 하였습니다.`;
        } else {
            result = "";
        }
    } else if (obj?.type == 3) {//선물하기
        let sche = "";
        if (schema == 'log_star') {//쿠폰 구매
            sche = "스타";
        } else if (schema == 'log_point') {
            sche = "포인트";
        }
        if (obj?.price > 0) {
            result = `${obj['explain_obj']?.user_id}(${obj['explain_obj']?.user_name}) 로부터 ${commarNumber(obj?.price)} ${sche}를 선물 받았습니다.`;
        } else {
            result = `${obj['explain_obj']?.user_id}(${obj['explain_obj']?.user_name}) 에게 ${commarNumber(obj?.price * (-1))} ${sche}를 선물 했습니다.`;
        }
    } else if (obj?.type == 4) {//출금
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
        result = "관리자의 수정에 의해 변경 되었습니다.";
    } else if (obj?.type == 6) {//데일리자동지급
        result = "";
    } else if (obj?.type == 7) {//데일리수동지급
        result = `출석 데일리포인트 ${obj['explain_obj']?.percent ? (obj['explain_obj']?.percent + '%') : ""} 발생 하였습니다.`;
    } else if (obj?.type == 8) {//청약예치금등록
        if (schema == 'log_star' || schema == 'log_point' || schema == 'log_esgw') {
            result = `청약예치금에 등록 하였습니다.`;
        } else {
            result = "";
        }
    } else if (obj?.type == 9) {//ESGWP구매
        if (schema == 'log_point') {
            result = "ESGWP로 전환 하였습니다.";
        } else if (schema == 'log_esgw') {
            result = `${commarNumber(obj?.price * 10)} 포인트에서 ESGWP로 전환 하였습니다.`;
        }
    } else if (obj?.type == 10) {//매출등록
        obj['explain_obj'] = JSON.parse(obj['explain_obj'] ?? "{}");
        if (schema == 'log_point' || schema == 'log_star') {
            result = `${obj['explain_obj']?.introduced_id}(${obj['explain_obj']?.introduced_name}) 회원에 의한 소개수익 발생하였습니다.`;
        } else if (schema == 'log_randombox') {
            result = `매출등록 랜덤박스 포인트 발생 하였습니다.`;
        }
    } else if (obj?.type == 11) {//이벤트 랜덤수익
        result = "이벤트 랜덤수익 발생하였습니다.";
    } else if (obj?.type == 12) {//이벤트 랜덤수익
        obj['explain_obj'] = JSON.parse(obj['explain_obj'] ?? "{}");
        if (obj?.price > 0) {
            result = `직대 ${obj['explain_obj']?.user_id}회원의 아울렛 구매에 대한 수익이 발생하였습니다.`;
        } else {
            result = `직대 ${obj['explain_obj']?.user_id}회원의 아울렛 구매 반환에 대해 차감되었습니다.`;
        }
    } else if (obj?.type == 13) {//상품구매시 랜덤박스 포인트 받기
        if (obj?.price > 0) {
            result = `아울렛 상품 구매 후 랜덤박스 포인트 혜택 지급 받았습니다.`;
        } else {
            result = `아울렛 상품 구매 반환에 대해 차감되었습니다.`;
        }
    }else if (obj?.type == 14) {//상품구매시 랜덤박스 포인트 받기
        result = `월 정산 지급 되었습니다.`;
    } else {
        result = "";
    }
    return result;
}
const DataTr = ({ id, data, index, moveCard, column, schema, list, sort, opTheTopItem, changeItemSequence, deleteItem, obj, changeStatus, changePage, page }) => {
    const navigate = useNavigate();
    const ref = useRef(null)
    const [status, setStatus] = useState(data?.status);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop(item) {
            changeItemSequence(item.id, item.sort, schema, item.index);
        },
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {

            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            const itemPk = data.pk
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex, itemPk)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index, sort }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))


    const getLoginTypeByNumber = (num) => {
        if (num == 0) {
            return "일반";
        } else if (num == 1) {
            return "카카오";
        } else if (num == 2) {
            return "네이버";
        } else if (num == 3) {
            return "애플";
        }
    }

    const getMarketingTier = (obj_) => {
        let obj = { ...obj_ };
        obj['explain_obj'] = JSON.parse(obj['explain_obj']);
        if (obj['explain_obj']?.tier) {
            return getTierByUserTier(obj['explain_obj']?.tier);
        } else {
            return "---";
        }
    }
    const outletOrderFormat = (column) => {
        return "---";
    }
    const onClickExchangeStatus = async (num, item) => {//출금 상태관리
        let confirm_str = "";
        let manager_note = "";
        if (num == -1) {
            confirm_str = "정말 반송 하시겠습니까?";
            manager_note = `${item['user_id']}(${item['user_name']}) 회원의 출금신청을 반송 하였습니다.`;
        } else if (num == 1) {
            confirm_str = "접수완료 하시겠습니까?";
            manager_note = `${item['user_id']}(${item['user_name']}) 회원의 출금신청을 접수완료 하였습니다.`;
        } else if (num == 2) {
            confirm_str = "지급완료 하시겠습니까?";
            manager_note = `${item['user_id']}(${item['user_name']}) 회원의 출금신청을 지급완료 하였습니다.`;
        } else {
            alert("잘못된 값입니다.");
            return;
        }
        if (window.confirm(confirm_str)) {
            const { data: response } = await axios.post('/api/onchangeexchangestatus', {
                status: num,
                pk: item?.pk,
                manager_note: manager_note
            })
            if (response?.result < 0) {
                alert(response?.message);
            } else {
                alert("성공적으로 저장되었습니다.");
                changePage(page);
                await new Promise((r) => setTimeout(r, 500));
                $('.scroll-table').scrollLeft(100000);
            }
        }
    }
    const onChangeOutletOrderStatus = async (num, item) => {//아울렛 주문 상태관리
        let confirm_str = "";
        let manager_note = "";
        if (num == -1) {
            if (!$(`.invoice-${item?.pk}`).val()) {
                alert("반송사유를 입력해 주세요.");
                return;
            }
            confirm_str = "주문취소 하시겠습니까?";
            manager_note = `${item['user_id']}(${item['user_name']}) 회원의 아울렛 상품 주문을 취소 하였습니다.`;
        } else if (num == 1) {
            if (!$(`.invoice-${item?.pk}`).val()) {
                alert("송장을 입력해 주세요.");
                return;
            }
            confirm_str = "주문확인 하시겠습니까?";
            manager_note = `${item['user_id']}(${item['user_name']}) 회원의 아울렛 상품 주문을 확인 하였습니다.`;
        } else if (num == 2) {
            confirm_str = "배송완료 처리 하시겠습니까?";
            manager_note = `${item['user_id']}(${item['user_name']}) 회원의 아울렛 상품 배송을 완료처리 하였습니다.`;
        } else {
            alert("잘못된 값입니다.");
            return;
        }
        if (window.confirm(confirm_str)) {
            const { data: response } = await axios.post('/api/onchangeoutletorderstatus', {
                status: num,
                pk: item?.pk,
                manager_note: manager_note,
                invoice: $(`.invoice-${item?.pk}`).val(),
                return_reason: $(`.invoice-${item?.pk}`).val(),
            })
            if (response?.result < 0) {
                alert(response?.message);
            } else {
                alert("성공적으로 저장되었습니다.");
                changePage(page);
                await new Promise((r) => setTimeout(r, 500));
                $('.scroll-table').scrollLeft(100000);
            }
        }
    }
    return (
        <>
            <Tr ref={obj.is_move ? ref : null} data-handler-id={handlerId}>
                {column.map((col, index) => (
                    <>

                        {col.type == 'text' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>{data[`${col.column}`] ?? "---"}</Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'number' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>{commarNumber(data[`${col.column}`] ?? 0)}</Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'minus_number' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>{commarNumber((data[`${col.column}`] ?? 0) * (-1))}</Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'date' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>{dateFormat(data[`${col.column}`])}</Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'abs' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>{commarNumber(Math.abs(data[`${col.column}`]))}</Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'link' ?
                            <>
                                <Td style={{ width: `${col.width}%`, cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { window.open(data[`${col.column}`]) }}>{data[`${col.column}`]}</Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'marketing_tier' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>{getMarketingTier(data)}</Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'login_type' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>{getLoginTypeByNumber(data[col.column])}</Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'level' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>{data[col.column] == 0 ? '일반유저' : data[col.column] == 40 ? '관리자' : data[col.column] == 30 ? '대가' : '개발자'}</Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'prider' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>{data[col.column] == 0 ? '없음' : data[col.column] == 1 ? '그린리더' : data[col.column] == 2 ? '프라이더' : '로얄프라이더'}</Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'tier' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>{getTierByUserTier(data[col.column])}</Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'img' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>
                                    {data[`${col.column}`] ?
                                        <>
                                            <img alt={`${col.column}`} src={backUrl + data[`${col.column}`]} style={{ height: '5rem' }} />
                                        </>
                                        :
                                        <>
                                            ---
                                        </>}
                                </Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'top' ?
                            <>
                                <Td style={{ width: `${col.width}%`, fontSize: '22px' }}>
                                    <GrLinkTop style={{ color: '#aaaaaa', cursor: 'pointer' }} onClick={() => opTheTopItem(data.pk, data.sort, schema)} />
                                </Td>
                            </>
                            :
                            <>
                            </>}

                        {col.type == 'target' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>{data[`${col.column}`] == 0 ? '현재창' : '새창'}</Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'status' ?
                            <>
                                <Td style={{ width: `${col.width}%`, fontSize: '28px' }}>
                                    {data[`${col.column}`] > 0 ?
                                        <CgToggleOn style={{ color: `${theme.color.background1}`, cursor: 'pointer' }} onClick={() => { changeStatus(0, data.pk, col.column) }} /> :
                                        <CgToggleOff style={{ color: '#aaaaaa', cursor: 'pointer' }} onClick={() => { changeStatus(1, data.pk, col.column) }} />}
                                </Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'type_note' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>
                                    {getTextByLogType(data, schema)}
                                </Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'alarm_type' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>
                                    {data[`${col.column}`] == 1 ?
                                        '스케줄링' :
                                        '즉시실행'}
                                </Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'category_type' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>
                                    {numberToCategory(data[`${col.column}`]).name}
                                </Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == '---' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>
                                    ---
                                </Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'increase' ?
                            <>
                                <Td style={{ width: `${col.width}%`, color: `${data[`${col.column}`] > 0 ? theme.color.blue : theme.color.red}` }}>
                                    {data[`${col.column}`] > 0 ? <AiOutlinePlus /> : <AiOutlineMinus />}
                                </Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'minus_increase' ?
                            <>
                                <Td style={{ width: `${col.width}%`, color: `${data[`${col.column}`] < 0 ? theme.color.blue : theme.color.red}` }}>
                                    {data[`${col.column}`] < 0 ? <AiOutlinePlus /> : <AiOutlineMinus />}
                                </Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'edit' ?
                            <>
                                <Td style={{ width: `${col.width}%`, fontSize: '20px' }}>
                                    <BiEditAlt style={{ cursor: 'pointer', color: theme.color.blue }} onClick={() => navigate(`/manager/edit/${schema}/${data.pk}`)} />
                                </Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'user_money_edit' ?
                            <>
                                <Td style={{ width: `${col.width}%`, fontSize: '20px' }}>
                                    <AiOutlineDollar style={{ cursor: 'pointer', color: theme.color.background1 }} onClick={() => navigate(`/manager/usermoneyedit/${data.pk}`)} />
                                </Td>
                            </>
                            :
                            <>
                            </>}
                            {col.type == 'user_prider_edit' ?
                            <>
                                <Td style={{ width: `${col.width}%`, fontSize: '20px' }}>
                                    <TbReportMoney style={{ cursor: 'pointer', color: theme.color.pink }} onClick={() => navigate(`/manager/userprideredit/${data.pk}`)} />
                                </Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'user_subscriptiondeposit_edit' ?
                            <>
                                <Td style={{ width: `${col.width}%`, fontSize: '20px' }}>
                                    <AiOutlineDollar style={{ cursor: 'pointer', color: theme.color.background1 }} onClick={() => navigate(`/manager/usersubscriptiondepositedit/${data.pk}`)} />
                                </Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'user_marketing' ?
                            <>
                                <Td style={{ width: `${col.width}%`, fontSize: '20px' }}>
                                    <RiMoneyDollarBoxFill style={{ cursor: 'pointer', color: theme.color.gold }} onClick={() => navigate(`/manager/usermarketing/${data.pk}`)} />
                                </Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'delete' ?
                            <>
                                <Td style={{ width: `${col.width}%`, fontSize: '20px' }}>
                                    <RiDeleteBinLine style={{ cursor: 'pointer', color: '#e15f41' }} onClick={() => {
                                        if (window.confirm("정말로 삭제하시겠습니까?")) {
                                            deleteItem(data.pk, schema)
                                        }
                                    }} />
                                </Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type.includes('exchange') ?
                            <>
                                {col.type.split('_')[1] == 'star' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {JSON.parse(data[`explain_obj`])?.star ?
                                                <>
                                                    {commarNumber(JSON.parse(data[`explain_obj`])?.star)}
                                                </>
                                                :
                                                <>
                                                    ---
                                                </>}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('_')[1] == 'money' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {JSON.parse(data[`explain_obj`])?.star ?
                                                <>
                                                    {commarNumber(JSON.parse(data[`explain_obj`])?.star * 100)}
                                                </>
                                                :
                                                <>
                                                    ---
                                                </>}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('_')[1] == 'moneycommission' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {JSON.parse(data[`explain_obj`])?.star ?
                                                <>
                                                    {commarNumber(JSON.parse(data[`explain_obj`])?.star * (JSON.parse(data[`explain_obj`])?.withdraw_commission_percent / 100))}
                                                </>
                                                :
                                                <>
                                                    ---
                                                </>}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('_')[1] == 'moneypayment' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {JSON.parse(data[`explain_obj`])?.star ?
                                                <>
                                                    {commarNumber(JSON.parse(data[`explain_obj`])?.star * 100)}
                                                </>
                                                :
                                                <>
                                                    ---
                                                </>}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('_')[1] == 'status' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {data?.status == -1 ?
                                                <>반송</>
                                                :
                                                <></>}
                                            {data?.status == 0 ?
                                                <>접수대기</>
                                                :
                                                <></>}
                                            {data?.status == 1 ?
                                                <>접수완료</>
                                                :
                                                <></>}
                                            {data?.status == 2 ?
                                                <>지급완료</>
                                                :
                                                <></>}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('_')[1] == 'date' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {JSON?.parse(data['explain_obj'])?.date ?
                                                <>
                                                    {JSON?.parse(data['explain_obj'])?.date}
                                                </>
                                                :
                                                <>
                                                    ---
                                                </>}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}

                                {col.type.split('_')[1] == 'edit' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {data?.status == -1 ?
                                                <>
                                                    반송완료
                                                </>
                                                :
                                                <>
                                                </>}
                                            {data?.status == 0 ?
                                                <>
                                                    <AddButton style={{ width: '84px', marginRight: '4px', background: theme.color.blue }} onClick={() => { onClickExchangeStatus(1, data) }}>접수완료</AddButton>
                                                    <AddButton style={{ background: theme.color.red }} onClick={() => { onClickExchangeStatus(-1, data) }}>반송</AddButton>
                                                </>
                                                :
                                                <>
                                                </>}
                                            {data?.status == 1 ?
                                                <>
                                                    <AddButton style={{ width: '84px', marginRight: '4px', background: theme.color.blue }} onClick={() => { onClickExchangeStatus(2, data) }}>지급완료</AddButton>
                                                </>
                                                :
                                                <>
                                                </>}
                                            {data?.status == 2 ?
                                                <>
                                                    지급완료
                                                </>
                                                :
                                                <>
                                                </>}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                            </>
                            :
                            <>
                            </>}

                        {col.type.includes('outlet_order') ?
                            <>
                                {col.type.split('order_')[1] == 'name' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {data['user_id']}({data['user_name']})
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('order_')[1] == 'count' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {commarNumber(JSON?.parse(data['explain_obj'])?.count ?? 0)}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('order_')[1] == 'point' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {commarNumber(JSON?.parse(data['explain_obj'])?.point ?? 0)}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('order_')[1] == 'phone' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {JSON?.parse(data['explain_obj'])?.name ?? "---"}({JSON?.parse(data['explain_obj'])?.phone ?? "---"})
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('order_')[1] == 'address' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {JSON?.parse(data['explain_obj'])?.address ?? ""} {JSON?.parse(data['explain_obj'])?.address_detail ?? ""}({JSON?.parse(data['explain_obj'])?.refer ?? ""})
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('order_')[1] == 'request' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {JSON?.parse(data['explain_obj'])?.request ?? ""}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('order_')[1] == 'refer' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {commarNumber(data[`${col.column}`] * (-1))}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('order_')[1] == 'sell_user' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {data[`sell_user_id`]}({data[`sell_user_name`]})({data[`sell_user_phone`]})
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('order_')[1] == 'sell_user_price' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {commarNumber(data['sell_revenue_percent'] / 100 * data['item_price'])}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('order_')[1] == 'status' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {data?.status == -1 ?
                                                <>반품처리</>
                                                :
                                                <></>}
                                            {data?.status == 0 ?
                                                <>확인대기</>
                                                :
                                                <></>}
                                            {data?.status == 1 ?
                                                <>주문확인</>
                                                :
                                                <></>}
                                            {data?.status == 2 ?
                                                <>배송완료</>
                                                :
                                                <></>}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('order_')[1] == 'date' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {JSON?.parse(data['explain_obj'])?.date ?
                                                <>
                                                    {JSON?.parse(data['explain_obj'])?.date}
                                                </>
                                                :
                                                <>
                                                    ---
                                                </>}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('order_')[1] == 'invoice' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>{JSON?.parse(data['explain_obj'])?.invoice ?? "---"}</Td>
                                    </>
                                    :
                                    <>
                                    </>
                                }
                                {col.type.split('order_')[1] == 'return_reason' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>{JSON?.parse(data['explain_obj'])?.return_reason ?? "---"}</Td>
                                    </>
                                    :
                                    <>
                                    </>
                                }
                                {col.type.split('order_')[1] == 'edit' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {data?.status == -1 ?
                                                <>
                                                    취소완료
                                                </>
                                                :
                                                <>
                                                </>}
                                            {data?.status == 0 ?
                                                <>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <Input style={{ width: '156px', margin: '4px auto' }} placeholder="송장 또는 반송사유" className={`invoice-${data['pk']}`} />
                                                        <div>
                                                            <AddButton style={{ width: '84px', marginRight: '4px', background: theme.color.blue }} onClick={() => { onChangeOutletOrderStatus(1, data) }}>주문확인</AddButton>
                                                            <AddButton style={{ width: '84px', background: theme.color.red }} onClick={() => { onChangeOutletOrderStatus(-1, data) }}>주문취소</AddButton>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                </>}
                                            {data?.status == 1 ?
                                                <>
                                                    <AddButton style={{ width: '84px', marginRight: '4px', background: theme.color.blue }} onClick={() => { onChangeOutletOrderStatus(2, data) }}>배송완료</AddButton>
                                                </>
                                                :
                                                <>
                                                </>}
                                            {data?.status == 2 ?
                                                <>
                                                    배송완료
                                                </>
                                                :
                                                <>
                                                </>}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                            </>
                            :
                            <>
                            </>}
                    </>
                ))}

            </Tr>
        </>
    )
}
export default DataTr