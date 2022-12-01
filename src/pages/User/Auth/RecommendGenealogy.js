import axios from "axios";
import { useEffect, useState } from "react";
import { OneCard, Row, Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import { AnimatedTree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'

const RecommendGenealogy = () => {
    const [treeData, setTreeData] = useState({})
    
    useEffect(() => {
        async function fetchPosts() {
            const { data: response } = await axios.post('/api/getgenealogy')
            console.log(response)
        }
        fetchPosts();
    }, [])
    return (
        <>
            <Wrappers>
                <Title>추천계보</Title>
                <Row style={{ margin: '0 0 64px 0' }}>
                    <OneCard width={96} style={{ height: '1000px', cursor: 'default' }}>
                        
                    </OneCard>
                </Row>
            </Wrappers>
        </>
    )
}
export default RecommendGenealogy;