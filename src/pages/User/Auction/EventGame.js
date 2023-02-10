import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ContentTable from "../../../components/ContentTable";
import MBottomContent from "../../../components/elements/MBottomContent";
import PageButton from "../../../components/elements/pagination/PageButton";
import PageContainer from "../../../components/elements/pagination/PageContainer";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import { historyContent } from "../../../data/ContentData";
import { range } from "../../../functions/utils";
import theme from "../../../styles/theme";

const EventGame = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const point_data = [{ note: '데일리포인트에서 발생', date: '2022-11-25', point: -3000 }, { note: '데일리', date: '2022-11-25 17:03:00', point: 2000 }, { note: '데일리포인트에서 발생', date: '2022-11-25', point: 1000 }];
    const [posts, setPosts] = useState([]);
    const [isPlus, setIsPlus] = useState(false);
    const [isMinus, setIsMinus] = useState(false);
    const [pageList, setPageList] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        fetchPosts(1);
    }, [pathname])
    async function fetchPosts(num) {
        setPage(num)
        const { data: response } = await axios.get(`/api/items?table=auction&page=${num}&page_cut=10&order=sort`)
        setPosts(response.data.data)
        setPageList(range(1, response.data.maxPage));

    }
    const goGamePage = (obj) => {
            navigate(`/auction_game/${obj?.pk}`);
    }
    return (
        <>
            <Wrappers className='wrappers'>
                <Title>이벤트게임</Title>
                <ContentTable columns={historyContent['eventgame'].columns}
                    data={posts}
                    schema={'eventgame'}
                    onClick={goGamePage}
                />
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
export default EventGame;