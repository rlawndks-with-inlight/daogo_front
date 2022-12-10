import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ContentTable from "../../../components/ContentTable";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import { historyContent } from "../../../data/ContentData";
import theme from "../../../styles/theme";

const RandomboxRollingHistory = () => {
    const params = useParams();
    const { pathname } = useLocation();
    const point_data = [{ note: '데일리포인트에서 발생', date: '2022-11-25', point: -3000 }, { note: '데일리', date: '2022-11-25 17:03:00', point: 2000 }, { note: '데일리포인트에서 발생', date: '2022-11-25', point: 1000 }];
    const [posts, setPosts] = useState([]);
    const [isPlus, setIsPlus] = useState(false);
    const [isMinus, setIsMinus] = useState(false);
    useEffect(() => {
        async function fetchPosts() {
            const { data: response } = await axios.get(`/api/randomboxrollinghistory`)
            setPosts(response?.data)
        }
        fetchPosts();
    }, [])
    const onClickPlusMinus = async (num) => {
        let is_plus = isPlus;
        let is_minus = isMinus;
        if (num == 1) {
            setIsPlus(!isPlus);
            is_plus = !isPlus;
        } else {
            setIsMinus(!isMinus);
            is_minus = !isMinus;
        }
        let api_str = `/api/randomboxrollinghistory`;
        if ((!is_plus && !is_minus) || (is_plus && is_minus)) {

        } else {
            if (is_plus) {
                api_str += '?increase=1';
            } else {
                api_str += '?increase=0';
            }
        }
        const { data: response } = await axios.get(api_str);
        setPosts(response?.data);
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
                }>{'랜덤박스 이벤트 롤링 변동내역'}</Title>
                <ContentTable columns={historyContent['randombox_rolling'].columns}
                    data={posts}
                    schema={'randombox_rolling'} />
            </Wrappers>
        </>
    )
}
export default RandomboxRollingHistory;