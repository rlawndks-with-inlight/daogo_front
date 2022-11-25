import axios from "axios";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import SearchComponent from "../../../components/SearchComponent";
import $ from 'jquery';
import ContentTable from "../../../components/ContentTable";
import { useEffect, useState } from "react";
import { columnObjFormat } from "../../../data/Manager/ManagerContentFormat";
const NoticeList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        async function fetchPosts(){
            const { data: response } = await axios.post('/api/items', {
                table: 'notice',
            });
            setPosts(response.data)
        }
        fetchPosts();
    },[])
    const onSearch = async () => {
        const { data: response } = await axios.post('/api/items', {
            table: 'notice',
            keyword: $('.search-input').val(),
            keyword_columns: ['title', 'date']
        });
        setPosts(response.data)
        console.log(response)
    }
    return (
        <>
            <Wrappers>
                <Title>공지사항</Title>
                <SearchComponent onSearch={onSearch} />
                <ContentTable columns={[
                    columnObjFormat('title', 70, 'text', 'title'),
                    columnObjFormat('date', 30, 'text', 'date'),
                ]}
                    is_not_display_thead={true}
                    data={posts} />
            </Wrappers>
        </>
    )
}
export default NoticeList;