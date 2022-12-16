import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ContentTable from "../../../components/ContentTable";
import MBottomContent from "../../../components/elements/MBottomContent";
import PageButton from "../../../components/elements/pagination/PageButton";
import PageContainer from "../../../components/elements/pagination/PageContainer";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import { historyContent } from "../../../data/ContentData";
import { range } from "../../../functions/utils";
import theme from "../../../styles/theme";

const History = () => {
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
    }, [pathname])
    async function fetchPosts(num) {
        setPage(num)
        const { data: response } = await axios.get(`/api/items?table=log_${params.schema}&page=${num}&page_cut=20`)
        setPosts(response.data.data)
        setPageList(range(1, response.data.maxPage));

    }
    const onClickPlusMinus = async (num) => {
        setPage(1);
        let is_plus = isPlus;
        let is_minus = isMinus;
        if (num == 1) {
            setIsPlus(!isPlus);
            is_plus = !isPlus;
        } else {
            setIsMinus(!isMinus);
            is_minus = !isMinus;
        }
        let api_str = `/api/items?table=log_${params.schema}&page=1&page_cut=20`;
        if ((!is_plus && !is_minus) || (is_plus && is_minus)) {

        } else {
            if (is_plus) {
                api_str += '&increase=1';
            } else {
                api_str += '&increase=0';
            }
        }
        const { data: response } = await axios.get(api_str);
        setPosts(response.data.data)
        setPageList(range(1, response.data.maxPage));
    }
    return (
        <>
            <Wrappers className='wrappers'>
                <Title not_arrow={true} textIcon={
                    <>
                        <div style={{ display: 'flex' }}>
                            <div style={{ background: `${theme.color.blue}${isPlus ? '' : '55'}`, color: '#fff', padding: '6px 16px', borderRadius: '8px', marginRight: '4px', cursor: 'pointer' }} onClick={() => { onClickPlusMinus(1) }}>증가</div>
                            <div style={{ background: `${theme.color.red}${isMinus ? '' : '55'}`, color: '#fff', padding: '6px 16px', borderRadius: '8px', cursor: 'pointer' }} onClick={() => { onClickPlusMinus(0) }}>차감</div>
                        </div>
                    </>
                }>{historyContent[params.schema].title}</Title>
                <ContentTable columns={historyContent[params.schema].columns}
                    data={posts}
                    schema={params.schema} />
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
export default History;