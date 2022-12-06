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
import { commarNumber, getTierByUserTier, numberToCategory } from '../../functions/utils'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import {RiMoneyDollarBoxFill} from 'react-icons/ri'
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

const DataTr = ({ id, data, index, moveCard, column, schema, list, sort, opTheTopItem, changeItemSequence, deleteItem, obj, changeStatus }) => {
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
    const getTextByLogType = (obj_) => {
        let obj = { ...obj_ };
        
        let result = "";
        if (obj?.type == 0) {//아울렛구매
            result = "";
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
            obj['explain_obj'] = JSON.parse(obj?.explain_obj ?? "{}");
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
            result = "관리자의 수정에 의해 변경 되었습니다.";
        } else if (obj?.type == 6) {//데일리자동지급
            result = "";
        } else if (obj?.type == 7) {//데일리수동지급
            obj['explain_obj'] = JSON.parse(obj?.explain_obj ?? "{}");
            result = `출석 데일리포인트 ${obj['explain_obj']?.percent ? (obj['explain_obj']?.percent + '%') : ""} 발생 하였습니다.`;
        } else if (obj?.type == 8) {//청약예치금등록
            if (schema == 'log_star' || schema == 'log_point' || schema == 'log_esgw') {
                result = `청약예치금에 등록 하였습니다.`;
            } else {
                result = "";
            }
        } else if (obj?.type == 9) {//esgw포인트구매
            if (schema == 'log_point') {
                result = "ESGW포인트로 전환 하였습니다.";
            } else if (schema == 'log_esgw') {
                result = `${commarNumber(obj?.price * 10)} 포인트에서 ESGW포인트로 전환 하였습니다.`;
            }
        }else if (obj?.type == 10) {//매출등록
            obj['explain_obj'] = JSON.parse(obj?.explain_obj ?? "{}");
            if (schema == 'log_point'||schema == 'log_star') {
                result = `${obj['explain_obj']?.introduced_id}(${obj['explain_obj']?.introduced_name}) 회원에 의한 소개수익 발생하였습니다.`;
            } else if (schema == 'log_randombox') {
                result = `매출등록 랜덤박스 포인트 발생 하였습니다.`;
            }
        } else {
            result = "";
        }
        return result;
    }
    const getMarketingTier = (obj_) =>{
        let obj ={...obj_};
        obj['explain_obj'] = JSON.parse(obj['explain_obj']);
        if(obj['explain_obj']?.tier){
            return getTierByUserTier(obj['explain_obj']?.tier);
        }else{
            return "---";
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
                                <Td style={{ width: `${col.width}%` }}>{commarNumber(data[`${col.column}`])}</Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'date' ?
                            <>
                                <Td style={{ width: `${col.width}%` }}>{data[`${col.column}`].substring(0, 10)}</Td>
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
                                    {getTextByLogType(data)}
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
                                <Td style={{ width: `${col.width}%`, color: `${data[`${col.column}`] > 0 ? '#546de5' : '#ff0000'}` }}>
                                    {data[`${col.column}`] > 0 ? <AiOutlinePlus /> : <AiOutlineMinus />}
                                </Td>
                            </>
                            :
                            <>
                            </>}
                        {col.type == 'edit' ?
                            <>
                                <Td style={{ width: `${col.width}%`, fontSize: '20px' }}>
                                    <BiEditAlt style={{ cursor: 'pointer', color: '#546de5' }} onClick={() => navigate(`/manager/edit/${schema}/${data.pk}`)} />
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
                            {col.type == 'user_marketing' ?
                            <>
                                <Td style={{ width: `${col.width}%`, fontSize: '20px' }}>
                                    <RiMoneyDollarBoxFill style={{ cursor: 'pointer', color: 'ffd700' }} onClick={() => navigate(`/manager/usermarketing/${data.pk}`)} />
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
                                            {commarNumber(data[`${col.column}`] * (-1))}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('_')[1] == 'money' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {commarNumber(data[`${col.column}`] * (-1) * 100)}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('_')[1] == 'moneycommission' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {commarNumber(data[`${col.column}`] * (-1) * 3.3)}
                                        </Td>
                                    </>
                                    :
                                    <>
                                    </>}
                                {col.type.split('_')[1] == 'moneypayment' ?
                                    <>
                                        <Td style={{ width: `${col.width}%` }}>
                                            {commarNumber(data[`${col.column}`] * (-1) * 96.7)}
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