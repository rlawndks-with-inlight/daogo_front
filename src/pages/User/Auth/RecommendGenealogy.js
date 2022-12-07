import axios from "axios";
import { useEffect, useState } from "react";
import { OneCard, Row, Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import { AnimatedTree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import { useParams } from "react-router-dom";
import { getTierByUserTier, range } from "../../../functions/utils";
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from "styled-components";
import theme from "../../../styles/theme";
import { max_child_depth } from "../../../data/ContentData";

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;
const RecommendGenealogy = () => {
    const params = useParams();
    const [treeList, setTreeList] = useState([]);
    const [rangeList, setRangeList] = useState([]);
    const [tree, setTree] = useState(undefined);
    const [auth, setAuth] = useState({});
    useEffect(() => {
        async function fetchPosts() {
            setRangeList(range(0, max_child_depth));
            const { data: response } = await axios.post('/api/getgenealogy');
            setTreeList([...response?.data?.data]);
            setAuth({ ...response?.data?.mine });
        }
        fetchPosts();
    }, []);
    const getChildByUserPk = (pk_, depth) => {
        let pk = pk_;
        if (treeList[`${depth + 1}`][pk]) {
            return treeList[`${depth + 1}`][pk];
        } else {
            return [];
        }
    }
    const returnChildTree = (pk, depth) => {
        if (depth > max_child_depth-1) {
            return;
        } else {
            return getChildByUserPk(pk, depth).map((item, idx) => (
                <>
                    <TreeNode label={<StyledNode>
                        <div style={{ fontSize: theme.size.font5 }}>{`${item?.id}`}</div>
                        <div style={{ fontSize: theme.size.font5 }}>{`${item?.name}`}</div>
                        <div style={{ fontSize: theme.size.font6 }}>{`${getTierByUserTier(item?.tier)}`}</div>
                    </StyledNode>}>
                        {returnChildTree(item?.pk, item?.depth)}
                    </TreeNode>
                </>
            ))
        }
    }
    useEffect(() => {
        if (treeList && treeList.length > 0) {
            setTree(
                returnChildTree(auth?.pk, auth?.depth)
            )
        }
    }, [treeList])
    return (
        <>
            <Wrappers>
                <Title>추천계보</Title>
                <Row style={{ margin: '0 0 64px 0' }}>
                    <OneCard width={96} style={{ height: '1000px', cursor: 'default' }}>
                        <Tree
                            lineWidth={'2px'}
                            lineColor={'green'}
                            lineBorderRadius={'10px'}
                            label={<StyledNode><div style={{ fontSize: theme.size.font5 }}>{`${auth?.id}`}</div>
                                <div style={{ fontSize: theme.size.font5 }}>{`${auth?.name}`}</div>
                                <div style={{ fontSize: theme.size.font6 }}>{`${getTierByUserTier(auth?.tier)}`}</div></StyledNode>}
                        >
                            {tree}
                        </Tree>
                    </OneCard>
                </Row>
            </Wrappers>
        </>
    )
}
export default RecommendGenealogy;