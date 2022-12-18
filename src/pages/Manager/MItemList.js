import React from 'react'
import styled from 'styled-components'
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../../common/manager/Breadcrumb';
import DataTable from '../../common/manager/DataTable';
import MBottomContent from '../../components/elements/MBottomContent';
import PageContainer from '../../components/elements/pagination/PageContainer';
import PageButton from '../../components/elements/pagination/PageButton';
import { range } from '../../functions/utils';
import AddButton from '../../components/elements/button/AddButton';
import Loading from '../../components/Loading';
import theme from '../../styles/theme';
import { Row, Select, Input } from '../../components/elements/ManagerTemplete';
import { objManagerListContent } from '../../data/Manager/ManagerContentData';
import $ from 'jquery';
import { AiOutlineSearch } from 'react-icons/ai'
import { SiMicrosoftexcel } from 'react-icons/si'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { returnColumn } from '../../common/manager/ColumnType';
const OptionCardWrappers = styled.div`
width:95%;
margin:0.5rem auto;
border-spacing: 0 10px;
min-width:700px;
box-shadow:1px 1px 1px #00000029;
font-size:14px;
background:#fff;
color:${props => props.theme.color.manager.font2};
`
const SearchContainer = styled.div`
display: flex; 
align-items: center;
margin-left: auto;
@media screen and (max-width:700px) {
    margin-left: 0;
}
`
const MItemList = () => {

    const { pathname } = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const [zColumn, setZColumn] = useState([])
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [pageList, setPageList] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [apiStr, setApiStr] = useState("/api/items");
    const notAddList = [
        'comment'
    ]
    useEffect(() => {
        setZColumn(objManagerListContent[`${params.table}`].zColumn ?? {})
        async function fetchPost() {
            console.log(objManagerListContent[`${params.table}`])
            let api_str = "/api/items";
            if(objManagerListContent[`${params.table}`]?.api_str){
                setApiStr(objManagerListContent[`${params.table}`]?.api_str);
                api_str = objManagerListContent[`${params.table}`]?.api_str;
            }else{
                setApiStr("/api/items");
                api_str = "/api/items";
            }
            setLoading(true)
            $('.page-cut').val(10);
            setPage(1)
            let obj = {};
            obj['page'] = 1;
            obj['table'] = objManagerListContent[`${params.table}`].schema;
            obj['page_cut'] = 10;
            if(params?.pk && ( params.table=='log_star' || params.table=='log_point' || params.table=='log_randombox' || params.table=='log_esgw' )){
                obj['user_pk'] = params?.pk;
            }
            if (objManagerListContent[`${params.table}`].is_move) {
                obj['order'] = 'sort';
            }
            for (var i = 0; i < objManagerListContent[`${params.table}`].queries.length; i++) {
                obj[objManagerListContent[`${params.table}`].queries[i].split("=")[0]] = objManagerListContent[`${params.table}`].queries[i].split("=")[1];
            }
            const { data: response } = await axios.post(api_str, obj);
            console.log(response)
            setPosts(response.data.data)
            setPageList(range(1, response.data.maxPage));
            setLoading(false)

        }
        fetchPost();
    }, [pathname])
    const changePage = async (num) => {
        setLoading(true)
        setPage(num)
        let obj = {};
        obj['page'] = num;
        obj['table'] = objManagerListContent[`${params.table}`].schema;
        obj['page_cut'] = $('.page-cut').val();
        obj['keyword'] = $('.search').val();
        if(params?.pk && ( params.table=='log_star' || params.table=='log_point' || params.table=='log_randombox' || params.table=='log_esgw' )){
            obj['user_pk'] = params?.pk;
        }
        if (objManagerListContent[`${params.table}`].is_move) {
            obj['order'] = 'sort';
        }
        for (var i = 0; i < objManagerListContent[`${params.table}`].queries.length; i++) {
            if(objManagerListContent[`${params.table}`].queries[i].split("=")[1]){
                obj[objManagerListContent[`${params.table}`].queries[i].split("=")[0]] = objManagerListContent[`${params.table}`].queries[i].split("=")[1];
            }else{
                if($(`.${objManagerListContent[`${params.table}`].queries[i].split("=")[0]}`).val()!='all'){
                    obj[objManagerListContent[`${params.table}`].queries[i].split("=")[0]] = $(`.${objManagerListContent[`${params.table}`].queries[i].split("=")[0]}`).val();
                }
            }
        }
        const { data: response } = await axios.post(apiStr, obj);
        setPosts(response.data.data)
        setPageList(range(1, response.data.maxPage));
        setLoading(false)
    }
    const onchangeSelectPageCut = (e) => {
        changePage(page)
    }
    const opTheTopItem = useCallback(async (pk, sort, schema) => {
        if (window.confirm('가장 위로 올리겠습니까?')) {
            const { data: response } = await axios.post('/api/onthetopitem', { table: schema, pk: pk, sort: sort });
            if (response.result > 0) {
                changePage(page)
            } else {
                alert(response.message)
            }
        }
    })
    const changeItemSequence = useCallback(async (pk, sort, schema, idx) => {
        if (posts[idx].pk == pk) {
            return;
        } else {
            const { data: response } = await axios.post('/api/changeitemsequence', {
                pk: pk,
                sort: sort,
                table: schema,
                change_pk: posts[idx].pk,
                change_sort: posts[idx].sort
            });
            if (response.result > 0) {
                changePage(page)
            } else {
                alert('잘못된 값입니다.')
                changePage(page)
            }
        }
    })
    const deleteItem = useCallback(async (pk, schema) => {
        let obj = {
            pk: pk,
            table: schema
        }
        if (schema == 'master' || schema == 'channel') {
            obj.table = 'user';
        }
        const { data: response } = await axios.post(`/api/deleteitem`, obj)

        if (response.result > 0) {
            alert('삭제 되었습니다.');
            changePage(page)
        } else {
            alert('error')
        }
    })
    const changeStatus = useCallback(async (num, pk, column) => {
        const { data: response } = await axios.post('/api/updatestatus', {
            table: objManagerListContent[params.table].schema,
            column: column,
            pk: pk,
            num: num,
        })
        changePage(page)
    });
    const exportExcel = async () => {
        let obj = {};
        obj['table'] = objManagerListContent[`${params.table}`].schema;
        obj['keyword'] = $('.search').val();
        if(params?.pk && ( params.table=='log_star' || params.table=='log_point' || params.table=='log_randombox' || params.table=='log_esgw' )){
            obj['user_pk'] = params?.pk;
        }
        if (objManagerListContent[`${params.table}`].is_move) {
            obj['order'] = 'sort';
        }
        for (var i = 0; i < objManagerListContent[`${params.table}`].queries.length; i++) {
            if(objManagerListContent[`${params.table}`].queries[i].split("=")[1]){
                obj[objManagerListContent[`${params.table}`].queries[i].split("=")[0]] = objManagerListContent[`${params.table}`].queries[i].split("=")[1];
            }else{
                if($(`.${objManagerListContent[`${params.table}`].queries[i].split("=")[0]}`).val()!='all'){
                    obj[objManagerListContent[`${params.table}`].queries[i].split("=")[0]] = $(`.${objManagerListContent[`${params.table}`].queries[i].split("=")[0]}`).val();
                }
            }
        }
        const { data: response } = await axios.post(apiStr, obj);
        //setPosts(response?.data);
        excelDownload(response.data ?? []);
    }
    const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const excelFileExtension = '.xlsx';
    const excelFileName = params.table;
    const excelDownload = async (excelData) => {
        let ignore_name_list = ['맨위로', '수정', '삭제', '관리'];
        let name_list = [];
        let column_list = [];
        for (var i = 0; i < objManagerListContent[`${params.table}`].zColumn.length; i++) {
            if (!ignore_name_list.includes(objManagerListContent[`${params.table}`].zColumn[i].name)) {
                name_list.push(objManagerListContent[`${params.table}`].zColumn[i].name)
                column_list.push(objManagerListContent[`${params.table}`].zColumn[i])
            }
        }
        const ws = XLSX.utils.aoa_to_sheet([
            ['daogo - 다오고']
            , []
            , name_list
        ]);

        let result = [...excelData];
        let excel_list = [];
        for (var i = 0; i < result.length; i++) {
            excel_list[i] = [];
            for (var j = 0; j < column_list.length; j++) {
                let data = await returnColumn(result[i], column_list[j]?.type, column_list[j]?.column, objManagerListContent[`${params.table}`].schema);;
                await excel_list[i].push(data);
            }
        }
        await excel_list.map(async (data, idx) => {
            XLSX.utils.sheet_add_aoa(
                ws,
                [
                    data
                ],
                { origin: -1 }
            );
            ws['!cols'] = [
                { wpx: 50 },
                { wpx: 50 }
            ]
            return false;
        });
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const excelFile = new Blob([excelButter], { type: excelFileType });
        FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
    }
    const onChangeType = (e) =>{
        changePage(1);
    }
    return (
        <>
            <Breadcrumb title={`${objManagerListContent[params.table]?.breadcrumb}`} nickname={``} />
            <div style={{ overflowX: 'auto' }}>
                {/* 옵션카드 */}
                <OptionCardWrappers>
                    <Row>
                        {objManagerListContent[`${params.table}`].schema == 'user' ?
                            <>
                                <div style={{ margin: '20px 0px 12px 24px' }}>프라이더 여부</div>
                                <Select className='prider' style={{ margin: '12px 24px 12px 24px' }} onChange={onChangeType}>
                                    <option value={'all'}>전체</option>
                                    <option value={0}>없음</option>
                                    <option value={1}>그린리더</option>
                                    <option value={2}>프라이더</option>
                                    <option value={3}>로얄프라이더</option>
                                </Select>
                                <div style={{ margin: '20px 0px 12px 24px' }}>티어별</div>
                                <Select className='tier' style={{ margin: '12px 24px 12px 24px' }} onChange={onChangeType}>
                                    <option value={'all'}>전체</option>
                                    <option value={0}>일반회원</option>
                                    <option value={5}>화이트</option>
                                    <option value={10}>그린</option>
                                    <option value={15}>실버</option>
                                    <option value={20}>골드</option>
                                    <option value={25}>플레티넘</option>
                                </Select>
                            </>
                            :
                            <>
                            </>}
                        {objManagerListContent[`${params.table}`].schema == 'exchange' ?
                            <>
                                <Select className='status' style={{ margin: '12px 24px 12px 24px' }} onChange={onChangeType}>
                                    <option value={'all'}>전체</option>
                                    <option value={-1}>반송</option>
                                    <option value={0}>접수대기</option>
                                    <option value={1}>접수완료</option>
                                    <option value={2}>지급완료</option>
                                </Select>
                            </>
                            :
                            <>
                            </>}
                            {objManagerListContent[`${params.table}`].schema == 'outlet_order' ?
                            <>
                                <Select className='status' style={{ margin: '12px 24px 12px 24px' }} onChange={onChangeType}>
                                    <option value={'all'}>전체</option>
                                    <option value={-1}>반품처리</option>
                                    <option value={0}>확인대기</option>
                                    <option value={1}>주문확인</option>
                                    <option value={2}>배송완료</option>
                                </Select>
                            </>
                            :
                            <>
                            </>}
                        <SearchContainer>
                            <Input style={{ margin: '12px 0 12px 24px', border: 'none' }} className='search' placeholder='두 글자 이상 입력해주세요.' onKeyPress={(e) => { e.key == 'Enter' ? changePage(1) : console.log("") }} />
                            <AiOutlineSearch className='search-button' style={{ padding: '14px', cursor: 'pointer' }} onClick={() => changePage(1)} />
                        </SearchContainer>
                        <Select className='page-cut' style={{ margin: '12px 24px 12px 24px' }} onChange={onchangeSelectPageCut}>
                            <option value={10}>10개</option>
                            <option value={20}>20개</option>
                            <option value={50}>50개</option>
                            <option value={100}>100개</option>
                        </Select>

                        <AddButton style={{ margin: '12px 24px 12px 24px', width: '96px', alignItems: 'center', display: 'flex', justifyContent: 'space-around' }} onClick={exportExcel}><SiMicrosoftexcel /> 액셀추출</AddButton>

                    </Row>

                </OptionCardWrappers>
            </div>
            {loading ?
                <>
                    <Loading text={loadingText} />
                </>
                :
                <>
                    <DataTable width={objManagerListContent[`${params.table}`]?.width} data={posts} column={zColumn} schema={params.table}
                        opTheTopItem={opTheTopItem} changeItemSequence={changeItemSequence} deleteItem={deleteItem} changeStatus={changeStatus} changePage={changePage} page={page} />
                </>}

            <MBottomContent>
                <div />
                <PageContainer>
                    <PageButton onClick={() => changePage(1)}>
                        처음
                    </PageButton>
                    {pageList.map((item, index) => (
                        <>
                            <PageButton onClick={() => changePage(item)} style={{ color: `${page == item ? '#fff' : ''}`, background: `${page == item ? theme.color.background1 : ''}`, display: `${Math.abs(index + 1 - page) > 4 ? 'none' : ''}` }}>
                                {item}
                            </PageButton>
                        </>
                    ))}
                    <PageButton onClick={() => changePage(pageList.length ?? 1)}>
                        마지막
                    </PageButton>
                </PageContainer>
                {objManagerListContent[`${params.table}`].is_edit ?
                    <>
                        <AddButton onClick={() => navigate(`/manager/edit/${params.table}/0`)}>+ 추가</AddButton>
                    </>
                    :
                    <>
                        <div />
                    </>
                }
            </MBottomContent>

        </>
    )
}
export default MItemList;