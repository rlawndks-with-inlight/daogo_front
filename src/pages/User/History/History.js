import { useParams } from "react-router-dom";
import ContentTable from "../../../components/ContentTable";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import { historyContent } from "../../../data/ContentData";

const History = () => {
    const params = useParams();
    const point_data = [{ note: '데일리포인트에서 발생', date: '2022-11-25', point: -3000 },{ note: '데일리', date: '2022-11-25', point: 2000 },{ note: '데일리포인트에서 발생', date: '2022-11-25', point: 1000 }];
    return (
        <>
            <Wrappers className='wrappers'>
                <Title>{historyContent[params.schema].title}</Title>
                <ContentTable columns={historyContent[params.schema].columns}
                    data={params.schema==='sharecode'?[]:[...point_data]}
                    schema={params.schema} />
            </Wrappers>
        </>
    )
}
export default History;