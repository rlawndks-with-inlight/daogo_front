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
import { getTierByUserTier, range } from "../../../functions/utils";
import theme from "../../../styles/theme";
const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid green;
`;
const MUserOrganizationChart = () => {
    const params = useParams();
    const [treeList, setTreeList] = useState([]);
    const [rangeList, setRangeList] = useState([]);
    const [tree, setTree] = useState(undefined);
    useEffect(() => {
        async function fetchPosts() {
            setRangeList(range(0, 100));
            const { data: response } = await axios.post('/api/getgenealogy');
            setTreeList([...response?.data?.data])
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
        if (depth > 99) {
            return;
        } else {
            return getChildByUserPk(pk, depth).map((item, idx) => (
                <>
                    <TreeNode label={<StyledNode>
                        <div style={{fontSize:theme.size.font5}}>{`${item?.id}`}</div>
                        <div style={{fontSize:theme.size.font5}}>{`${item?.name}`}</div>
                        <div style={{fontSize:theme.size.font6}}>{`${getTierByUserTier(item?.tier)}`}</div>
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
                returnChildTree(1, 0)
            )
        }
    }, [treeList])
    return (
        <>
            <Breadcrumb title={`회원 조직도`} nickname={``} />
            <Card>
                <Tree
                    lineWidth={'2px'}
                    lineColor={'green'}
                    lineBorderRadius={'10px'}
                    label={<StyledNode>회원 조직도</StyledNode>}
                >
                    {tree}
                </Tree>
            </Card>
        </>
    )
}
export default MUserOrganizationChart;