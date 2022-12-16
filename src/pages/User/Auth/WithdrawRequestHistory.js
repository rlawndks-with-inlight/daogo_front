import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ContentTable from "../../../components/ContentTable";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import { historyContent } from "../../../data/ContentData";
import { range } from "../../../functions/utils";
import MBottomContent from "../../../components/elements/MBottomContent";
import PageButton from "../../../components/elements/pagination/PageButton";
import PageContainer from "../../../components/elements/pagination/PageContainer";
import theme from "../../../styles/theme";
const WithdrawRequestHistory = () => {
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
        const { data: response } = await axios.get(`/api/items?table=exchange&page=${num}&page_cut=20`)
        setPosts(response.data.data)
        setPageList(range(1, response.data.maxPage));
    }
    return (
        <>
            <Wrappers className='wrappers'>
                <Title not_arrow={true}>{'출금 내역'}</Title>
                <ContentTable columns={historyContent['exchange'].columns}
                    data={posts}
                    schema={'exchange'} />
                <MBottomContent>
                    <div />
                    <PageContainer>
                        <PageButton onClick={() => fetchPosts(1)}>
                            처음
                        </PageButton>
                        {pageList.map((item, index) => (
                            <>
                                <PageButton onClick={() => fetchPosts(item)} style={{ color: `${page == item ? '#fff' : ''}`, background: `${page == item ? theme.color.background1 : ''}`, display: `${Math.abs(index + 1 - page) > 4 ? 'none' : ''}` }}>
                                    {item}
                                </PageButton>
                            </>
                        ))}
                        <PageButton onClick={() => fetchPosts(pageList.length ?? 1)}>
                            마지막
                        </PageButton>
                    </PageContainer>
                    <div />
                </MBottomContent>
            </Wrappers>
        </>
    )
}
export default WithdrawRequestHistory;