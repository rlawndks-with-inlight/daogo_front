import axios from "axios";
import { useEffect, useState } from "react";
import { OneCard, Row, Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import { AnimatedTree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import { useParams } from "react-router-dom";
import { commarNumber, getTierByUserTier, range } from "../../../functions/utils";
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from "styled-components";
import theme from "../../../styles/theme";
import { max_child_depth } from "../../../data/ContentData";
import $ from 'jquery';
import { Select } from "../../../components/elements/ManagerTemplete";
const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid ${props => props.theme.color.background1};
  animation: fadein 0.5s;
@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
`;
const RecommendGenealogy = () => {
    const params = useParams();
    const [treeList, setTreeList] = useState([]);
    const [allTreeList, setAllTreeList] = useState([]);
    const [rangeList, setRangeList] = useState([]);
    const [tree, setTree] = useState(undefined);
    const [auth, setAuth] = useState({});
    const [downLevel, setDownLevel] = useState(1);
    useEffect(() => {
        async function fetchPosts() {
            setRangeList(range(0, max_child_depth));
            const { data: response } = await axios.post('/api/getgenealogy');
            let tree_list = [];
            for (var i = 0; i < max_child_depth; i++) {
                tree_list[i] = {};
            }
            setTreeList([...tree_list]);
            setAllTreeList(response?.data?.data ?? []);
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
        if (depth > max_child_depth - 1) {
            return;
        } else {
            return getChildByUserPk(pk, depth).map((item, idx) => (
                <>
                    <TreeNode label={<StyledNode style={{ cursor: 'pointer', border: `1px solid ${(allTreeList[item?.depth + 1][item?.pk] && allTreeList[item?.depth + 1][item?.pk].length > 0) ? `${theme.color.background1}` : `${theme.color.red}`}` }} onClick={() => { onClickUser(item?.pk, item?.depth) }}>
                        <div style={{ fontSize: theme.size.font5 }}>{`${item?.id}`}</div>
                        <div style={{ fontSize: theme.size.font5 }}>{`${item?.name}`}</div>
                        <div style={{ fontSize: theme.size.font5 }}>{`${commarNumber(item?.marketing_score ?? 0)} PV`}</div>
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
    const onClickUser = (pk, depth) => {
        let tree_list = [...treeList];
        if (tree_list[depth + 1][pk] && tree_list[depth + 1][pk].length > 0) {
            let parent_list = [pk];
            for (var i = depth + 1; i < max_child_depth; i++) {
                let last_parent_list = [...parent_list];
                for (var j = 0; j < last_parent_list.length; j++) {
                    if (tree_list[i][last_parent_list[j]] && tree_list[i][last_parent_list[j]].length > 0) {
                        parent_list = [...parent_list, ...tree_list[i][last_parent_list[j]].map((item) => { return item?.pk })];
                    }
                    delete tree_list[i][last_parent_list[j]];
                }
            }
        } else {
            tree_list[depth + 1][pk] = allTreeList[depth + 1][pk] ?? [];
            if (downLevel > 1) {
                let last_parent_list = tree_list[depth + 1][pk].map((item) => { return item?.pk });
                for (var i = 2; i <= downLevel; i++) {
                    let parent_list = [...last_parent_list];
                    last_parent_list = [];
                    for (var j = 0; j < parent_list.length; j++) {
                        tree_list[depth+i][parent_list[j]] = allTreeList[depth+i][parent_list[j]]??[];
                        last_parent_list = [...last_parent_list,...allTreeList[depth+i][parent_list[j]].map((item)=>{return item?.pk})];
                    }
                }
            }
        }
        setTreeList([...tree_list]);
    }
    const onChangeDownLevel = async (e) => {
        if (e.target.value == 'all') {
            const { data: response } = await axios.post('/api/getgenealogy');
            setTreeList(response?.data?.data ?? []);
            $('.down-level').val(downLevel);
        } else {
            setDownLevel(parseInt(e.target.value));
        }
    }
    return (
        <>
            <OneCard style={{ position: 'fixed', background: '#fff', zIndex: '10', left: '2rem', top: `${window.innerWidth >= 700 ? '8rem' : '4rem'}`, height: '30px', opacity: '0.8', flexDirection: 'row', alignItems: 'center', width: '180px', justifyContent: 'space-between', padding: '8px' }}>
                <div style={{ fontSize: theme.size.font5, width: '50px' }}>추천계보</div>
                <Select style={{ margin: '0', width: '100px' }} className='down-level' onChange={onChangeDownLevel}>
                    {range(1, 10).map((item, idx) => (
                        <>
                            <option value={item}>{item}</option>
                        </>
                    ))}
                    <option value={'all'}>전체보기</option>
                </Select>
            </OneCard>
            {/* <div style={{ marginTop: '8rem', width: '90%', maxWidth: '900px', margin: '8rem auto 0 auto' }}>
                <Title>추천계보</Title>
            </div> */}
            <div style={{ marginTop: '8rem', minHeight: `${$(window).height() - 300}px` }}>
                <Row style={{ margin: '0 0 64px 0' }}>
                    <div style={{ width: '100%', overflowX: 'scroll' }} className='scroll-table-green'>
                        <Tree
                            lineWidth={'2px'}
                            lineColor={'green'}
                            lineBorderRadius={'10px'}
                            label={<StyledNode style={{ cursor: 'pointer' }} onClick={() => { onClickUser(auth?.pk, auth?.depth) }}>
                                <div style={{ fontSize: theme.size.font5 }}>{`${auth?.id}`}</div>
                                <div style={{ fontSize: theme.size.font5 }}>{`${auth?.name}`}</div>
                                <div style={{ fontSize: theme.size.font6 }}>{`${getTierByUserTier(auth?.tier)}`}</div>
                            </StyledNode>}
                        >
                            {tree}
                        </Tree>
                    </div>

                </Row>
            </div>
        </>
    )
}
export default RecommendGenealogy;