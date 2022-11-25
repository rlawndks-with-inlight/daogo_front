import { useNavigate } from "react-router-dom";
import { commarNumber } from "../functions/utils";
import theme from "../styles/theme";
import { Table, Tr, Td } from "./elements/UserContentTemplete";

const ContentTable = (props) => {
    const navigate = useNavigate();
    const { columns, data, is_not_display_thead } = props;
    console.log(props)
    return (
        <>
            <div className='subtype-container' style={{ overflowX: 'auto', display: 'flex', flexDirection: 'column', width: '100%', margin: '0 auto' }} >
                {is_not_display_thead ?
                    <>
                    </>
                    :
                    <>
                        <div style={{ width: '100%', padding: '16px 0', borderRadius: '8px', background: theme.color.background1, color: '#fff', display: 'flex', boxShadow: theme.itemBoxShadow, fontSize: theme.size.font3, marginBottom: '16px' }}>
                            {columns.map((item, idx) => (
                                <>
                                    <div style={{ width: `${item.width}%`, textAlign: 'center', borderLeft: `${idx !== 0 ? '1px solid #fff' : ''}` }}>{item.name}</div>
                                </>
                            ))}
                        </div>
                    </>}

                <div style={{ width: '100%', background: '#fff', padding: '12px 0', boxShadow: theme.itemBoxShadow, borderRadius: '8px', minHeight: '50vh', marginBottom: '16px' }}>
                    <Table>
                        {data.map((item, idx) => (
                            <Tr>
                                {columns.map((column, idx) => (
                                    <>
                                        {column.type == 'text' ?
                                            <>
                                                <Td style={{ width: `${column.width}%` }}>{item[`${column.column}`]}</Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type == 'number' ?
                                            <>
                                                <Td style={{ width: `${column.width}%`, color: `${item[`${column.column}`] >= 0 ? '#1A7EFC' : '#FF0000'}` }}>{commarNumber(item[`${column.column}`])}</Td>
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