// 회원 조직도
import Breadcrumb from "../../../common/manager/Breadcrumb"
import { Card, Title, Input, Row, Col, ImageContainer, Select } from '../../../components/elements/ManagerTemplete';
import ButtonContainer from "../../../components/elements/button/ButtonContainer";
import AddButton from "../../../components/elements/button/AddButton";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from "styled-components";
import { commarNumber, getTierByUserTier, range } from "../../../functions/utils";
import theme from "../../../styles/theme";
import { admin_pk, max_child_depth } from "../../../data/ContentData";
const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid green;
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
const MUserOrganizationChart = () => {
    const params = useParams();
    const [treeList, setTreeList] = useState([]);
    const [allTreeList, setAllTreeList] = useState([]);
    const [rangeList, setRangeList] = useState([]);
    const [tree, setTree] = useState(undefined);
    const [userCount, setUserCount] = useState(0);
    const [topUser, setTopUser] = useState({})
    useEffect(() => {
        async function fetchPosts() {
            setRangeList(range(0, max_child_depth));
            const { data: response } = await axios.post('/api/getgenealogy');
            let tree_list = [];
            for (var i = 0; i < max_child_depth; i++) {
                tree_list[i] = {};
            }
            setTreeList([...tree_list]);
            setTopUser(response?.data?.data[1][74][0])
            setAllTreeList(response?.data?.data ?? []);
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
                returnChildTree(topUser?.pk, topUser?.depth)
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
        }
        setTreeList([...tree_list]);
    }
    return (
        <>
            <Breadcrumb title={`회원 조직도`} nickname={``} />
            <div style={{ width: '100%', overflowX: 'scroll', marginTop: '0.5rem',minHeight:'90vh' }} className='scroll-table-green'>
                <Tree
                    lineWidth={'2px'}
                    lineColor={'green'}
                    lineBorderRadius={'10px'}
                    label={<StyledNode style={{ cursor: 'pointer' }} onClick={() => { onClickUser(topUser?.pk, topUser?.depth) }}>
                        <div style={{ fontSize: theme.size.font5 }}>{`${topUser?.id}`}</div>
                        <div style={{ fontSize: theme.size.font5 }}>{`${topUser?.name}`}</div>
                        <div style={{ fontSize: theme.size.font6 }}>{`${getTierByUserTier(topUser?.tier)}`}</div>
                    </StyledNode>}
                >
                    {tree}
                </Tree>
            </div>
        </>
    )
}
export default MUserOrganizationChart;