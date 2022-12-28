import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete"
import { range } from "../../../functions/utils";

const LogMoneyHistory = () => {
    const params = useParams();
    const { pathname } = useLocation();
    const point_data = [{ note: '데일리포인트에서 발생', date: '2022-11-25', point: -3000 }, { note: '데일리', date: '2022-11-25 17:03:00', point: 2000 }, { note: '데일리포인트에서 발생', date: '2022-11-25', point: 1000 }];
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
        const { data: response } = await axios.get(`/api/items?table=log_money&page=${num}&page_cut=20`)
        setPosts(response.data.data)
        setPageList(range(1, response.data.maxPage));

    }
    return (
        <>
            <Wrappers className='wrappers'>
                <Title not_arrow={true}>{'변동로그'}</Title>
                {}
            </Wrappers>
        </>
    )
}
export default LogMoneyHistory;