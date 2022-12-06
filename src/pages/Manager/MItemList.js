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
    const [isUseLoading, setIsUseLoading] = useState(true)
    const notAddList = [
        'comment'
    ]
    useEffect(() => {
        setZColumn(objManagerListContent[`${params.table}`].zColumn ?? {})
        async function fetchPost() {
            setLoading(true)
            $('.page-cut').val(10);
            setPage(1)
            let str = '';
            let queries = '';
            if(objManagerListContent[`${params.table}`].is_move){
                queries += `&order=sort`
            }
            for (var i = 0; i < objManagerListContent[`${params.table}`].queries.length; i++) {
                queries += `&${objManagerListContent[`${params.table}`].queries[i]}`;
            }
            let auth = JSON.parse(localStorage.getItem('auth'))
            str = `/api/items?table=${objManagerListContent[`${params.table}`].schema}&page=1${queries}`
            if (auth?.user_level < 40) {
                str += `&user_pk=${auth.pk}`
            }
            const { data: response } = await axios.get(str)
            console.log(response)
            setPosts(response.data.data)
            setPageList(range(1, response.data.maxPage))
            setLoading(false)
        }
        fetchPost();
    }, [pathname])
    const changePage = async (num) => {
        setLoading(true)
        setPage(num)
        let keyword = $('.search').val();
        let str = '';
        let queries = '';
        if(objManagerListContent[`${params.table}`].is_move){
            queries += `&order=sort`
        }
        for (var i = 0; i < objManagerListContent[`${params.table}`].queries.length; i++) {
            queries += `&${objManagerListContent[`${params.table}`].queries[i]}`;
        }
        str = `/api/items?table=${objManagerListContent[`${params.table}`].schema}&page=${num}${queries}`
        str += `&page_cut=${parseInt($('.page-cut').val())}&keyword=${keyword}`;
        const { data: response } = await axios.get(str)
        setPosts(response.data.data)
        setPageList(range(1, response.data.maxPage))
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
    const changeStatus = useCallback(async  (num, pk, column) => {
        const { data: response } = await axios.post('/api/updatestatus', {
            table: objManagerListContent[params.table].schema,
            column:column,
            pk: pk,
            num: num,
        })
        changePage(page)
    });
    const exportExcel = async () => {
        let str = '';

        str = `/api/items?table=${params.table}`

        const { data: response } = await axios.get(str)
        excelDownload(response.data);

    }
    const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const excelFileExtension = '.xlsx';
    const excelFileName = params.table;

    const excelDownload = (excelData) => {
        let ignore_name_list = ['맨위로', '수정', '삭제'];
        let ignore_column_list = ['', 'edit', 'delete'];

        let name_list = [];
        let column_list = [];
        for (var i = 0; i < objManagerListContent[`${params.table}`].zColumn.length; i++) {
            if (!ignore_name_list.includes(objManagerListContent[`${params.table}`].zColumn[i].name)) {
                name_list.push(objManagerListContent[`${params.table}`].zColumn[i].name)
                column_list.push(objManagerListContent[`${params.table}`].zColumn[i].column)
            }
        }
        const ws = XLSX.utils.aoa_to_sheet([
            ['daogo - 다오고']
            , []
            , name_list
        ]);
        excelData.map((data) => {
            XLSX.utils.sheet_add_aoa(
                ws,
                [
                    column_list.map(item => {
                        return data[`${item}`]
                    })
                ],
                { origin: -1 }
            );
            ws['!cols'] = [
                { wpx: 200 },
                { wpx: 200 }
            ]
            return false;
        });
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const excelFile = new Blob([excelButter], { type: excelFileType });
        FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
    }
    return (
        <>
            <Breadcrumb title={`${objManagerListContent[params.table]?.breadcrumb}`} nickname={``} />
           
                    <div style={{ overflowX: 'auto' }}>
                        {/* 옵션카드 */}
                        <OptionCardWrappers>
                            <Row>
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
                            <Loading />
                        </>
                        :
                        <>

                            <DataTable width={objManagerListContent[`${params.table}`]?.width} data={posts} column={zColumn} schema={params.table} opTheTopItem={opTheTopItem} changeItemSequence={changeItemSequence} deleteItem={deleteItem} changeStatus={changeStatus}/>
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