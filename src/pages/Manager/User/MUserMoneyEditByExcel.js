import React from 'react'
import styled from 'styled-components'
import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import ManagerWrappers from '../../../components/elements/ManagerWrappers';
import SideBar from '../../../common/manager/SideBar';
import ManagerContentWrappers from '../../../components/elements/ManagerContentWrappers';
import axios from 'axios';
import Breadcrumb from '../../../common/manager/Breadcrumb';
import ButtonContainer from '../../../components/elements/button/ButtonContainer';
import AddButton from '../../../components/elements/button/AddButton';
import CancelButton from '../../../components/elements/button/CancelButton';
import $ from 'jquery';
import { Card, Title, Input, Select, Row, Col, ImageContainer, Table, Tr, Td, SectorInput, SectorAddButton, Container } from '../../../components/elements/ManagerTemplete';
import { RiDeleteBinLine } from 'react-icons/ri'
import ExcelComponent from '../../../components/ExcelComponent';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import readXlsxFile from 'read-excel-file'
const MUserMoneyEditByExcel = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [myNick, setMyNick] = useState("")
    const [sectorList, setSectorList] = useState([])

    useEffect(() => {
        async function fetchPost() {

        }
        fetchPost();
    }, [])
    const editUserMoney = async () => {
        if (window.confirm("저장 하시겠습니까?")) {
            let sector_list = [];
            for (var i = 0; i < sectorList.length; i++) {
                if ($(`.sector-tr-${i}`).css('display') != 'none') {
                    sector_list.push(
                        [$(`.sector-td-1-${i}`).val(), $(`.sector-td-2-${i}`).val(), $(`.sector-td-3-${i}`).val(), $(`.sector-td-4-${i}`).val(), $(`.sector-td-5-${i}`).val(), $(`.sector-td-6-${i}`).val(), $(`.sector-td-7-${i}`).val()]
                    )
                }
            }
            let obj = {
                list: sector_list,
                manager_note: "유저 머니 엑셀 수정 하였습니다."
            }
            const { data: response } = await axios.post('/api/insertusermoneybyexcel', obj);
            if (response.result > 0) {
                alert('성공적으로 저장되었습니다.');
                navigate(-1);
            } else {
                alert(response.message);
            }
        }

    }
    const uploadExcel = (e) => {
        if (e.target.files[0]) {
            readXlsxFile(e.target.files[0]).then(async(rows) => {
                rows.shift();
                setSectorList(rows)
                await new Promise((r) => setTimeout(r, 500));
                for (var i = 0; i < 5000; i++) {
                    if (i == rows.length) {
                        break;
                    } else {
                        $(`.sector-tr-${i}`).css('display', 'flex');
                        $(`.sector-td-1-${i}`).val(`${rows[i][0]}`);
                        $(`.sector-td-2-${i}`).val(`${rows[i][1]}`);
                        $(`.sector-td-3-${i}`).val(`${rows[i][2]}`);
                        $(`.sector-td-4-${i}`).val(`${rows[i][3]}`);
                        $(`.sector-td-5-${i}`).val(`${rows[i][4]}`);
                        $(`.sector-td-6-${i}`).val(`${rows[i][5]}`);
                        $(`.sector-td-7-${i}`).val(`${rows[i][6]}`);
                    }
                }
            })
        }
    }
    const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const excelFileExtension = '.xlsx';
    const excelFileName = '일괄업로드';
    const extractExcel = async () => {
        let sector_list = [];
        for (var i = 0; i < sectorList.length; i++) {
            if ($(`.sector-tr-${i}`).css('display') != 'none') {
                sector_list.push(
                    {
                        id: $(`.sector-td-1-${i}`).val(), name: $(`.sector-td-2-${i}`).val(), star: $(`.sector-td-3-${i}`).val(),
                        point: $(`.sector-td-4-${i}`).val(), randombox: $(`.sector-td-5-${i}`).val(), esgw: $(`.sector-td-6-${i}`).val()
                        , note: $(`.sector-td-7-${i}`).val()
                    }
                )
            }
        }

        const ws = XLSX.utils.aoa_to_sheet([
            ['아이디', '회원명', '스타', '포인트', '랜덤박스포인트', 'ESGWP', '내용']
        ]);
        sector_list.map((data) => {
            XLSX.utils.sheet_add_aoa(
                ws,
                [
                    [
                        data['id'],
                        data['name'],
                        data['star'],
                        data['point'],
                        data['randombox'],
                        data['esgw'],
                        data['note'],
                    ]
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

            <Breadcrumb title={'회원 머니 엑셀 일괄 업로드'} nickname={myNick} />
            <Card>
                <Row>
                    <Col>
                        <ExcelComponent uploadExcel={uploadExcel} extractExcel={extractExcel} />
                        <Container>
                            <Table>
                                <Tr>
                                    <Td>아이디</Td>
                                    <Td>회원명</Td>
                                    <Td>스타</Td>
                                    <Td>포인트</Td>
                                    <Td>랜덤박스포인트</Td>
                                    <Td>ESGWP</Td>
                                    <Td style={{ width: '50%' }}>내용</Td>
                                    <Td style={{ width: '20%' }}>삭제</Td>
                                </Tr>
                                {sectorList && sectorList.map((item, idx) => (
                                    <>
                                        <Tr className={`sector-tr-${idx}`}>
                                            <Td ><SectorInput className={`sector-td-1-${idx}`} /></Td>
                                            <Td ><SectorInput className={`sector-td-2-${idx}`} /> </Td>
                                            <Td ><SectorInput className={`sector-td-3-${idx}`} placeholder={'only number'} /> </Td>
                                            <Td ><SectorInput className={`sector-td-4-${idx}`} placeholder={'only number'} /> </Td>
                                            <Td ><SectorInput className={`sector-td-5-${idx}`} placeholder={'only number'} /> </Td>
                                            <Td ><SectorInput className={`sector-td-6-${idx}`} placeholder={'only number'} /> </Td>
                                            <Td style={{ width: '50%' }}><SectorInput className={`sector-td-7-${idx}`} /> </Td>
                                            <Td style={{ width: '20%' }}><RiDeleteBinLine style={{ cursor: 'pointer' }} onClick={() => { $(`.sector-tr-${idx}`).css('display', 'none') }} /></Td>
                                        </Tr>
                                    </>
                                ))}
                            </Table>
                            {/* <SectorAddButton onClick={() => { setSectorList([...sectorList, ...[{}]]) }}>+추가</SectorAddButton> */}
                        </Container>
                    </Col>
                </Row>

            </Card>

            <ButtonContainer>
                <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                <AddButton onClick={editUserMoney}>{'저장'}</AddButton>
            </ButtonContainer>

        </>
    )
}
export default MUserMoneyEditByExcel;