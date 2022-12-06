import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ContentTable from "../../../components/ContentTable";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import { historyContent } from "../../../data/ContentData";

const History = () => {
    const params = useParams();
    const { pathname } = useLocation();
    const point_data = [{ note: '데일리포인트에서 발생', date: '2022-11-25', point: -3000 }, { note: '데일리', date: '2022-11-25 17:03:00', point: 2000 }, { note: '데일리포인트에서 발생', date: '2022-11-25', point: 1000 }];
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchPosts() {
            const { data: response } = await axios.get(`/api/items?table=log_${params.schema}`)
            setPosts(response?.data)
        }
        fetchPosts();
    }, [pathname])
    return (
        <>
            <Wrappers className='wrappers'>
                <Title>{historyContent[params.schema].title}</Title>
                <ContentTable columns={historyContent[params.schema].columns}
                    data={posts}
                    schema={params.schema} />
            </Wrappers>
        </>
    )
}
export default History;