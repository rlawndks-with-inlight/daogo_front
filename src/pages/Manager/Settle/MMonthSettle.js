//메인배너 추가 및 수정
import Breadcrumb from "../../../common/manager/Breadcrumb"
import { Card, Title, Input, Row, Col, ImageContainer, Select, Explain } from '../../../components/elements/ManagerTemplete';
import ButtonContainer from "../../../components/elements/button/ButtonContainer";
import AddButton from "../../../components/elements/button/AddButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CancelButton from "../../../components/elements/button/CancelButton";
import $ from 'jquery';
import axios from "axios";
import { commarNumber } from "../../../functions/utils";
import DataTable from "../../../common/manager/DataTable";
import { objManagerListContent } from "../../../data/Manager/ManagerContentData";

const MMonthSettle = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [userObj, setUserObj] = useState({
        1: 0, 2: 0, 3: 0
    });
    const [allUserCount, setAllUserCount] = useState(0);
    const [posts, setPosts] = useState([]);
    
    async function fetchPosts(num){
        const {data:response} = await axios.get(`/api/items?table=user&prider=${num}`);
        setPosts([...posts,...response?.data])
    }
    useEffect(() => {
        if (params.pk <= 0) {
            navigate(-1);
        }
        async function fetchPost() {
            $('.all_price').val(0);
            $('.divide_price').val(0);
            $('.divide_star').val(0);
            const { data: response } = await axios.get(`/api/items?table=user&not_prider=0`);
            let user_list = [...response?.data];
            let user_obj = { ...userObj };
            for (var i = 0; i < user_list.length; i++) {
                user_obj[user_list[i].prider]++;
            }
            setUserObj(user_obj);
        }
        fetchPost();
    }, [])
    const addMarketing = async () => {
        if (!$('.settle_price').val() || !$('.provider_percent').val()) {
            alert('필수 값이 비어있습니다.');
        } else {
            let user_list = [];
            for(var i =1;i<=3;i++){
                if($(`#settle-${i}`).is(':checked')){
                    user_list.push(i);
                }
            }
            if(user_list.length==0){
                alert('필수 값이 비어있습니다.');
                return;
            }
            if (window.confirm('저장 하시겠습니까?')) {
                
                let obj = {
                    manager_note: `월 정산을 완료 하였습니다.`,
                    user_prider_list:user_list,
                    price:parseInt($('.settle_price').val()),
                    percent:parseInt($('.provider_percent').val()),
                }
                const { data: response } = await axios.post(`/api/addmonthsettle`, obj);
                if (response.result > 0) {
                    alert("성공적으로 저장되었습니다.");
                    navigate(-1);
                } else {
                    alert(response.message);
                }
            }
        }
    }
    const onChangePrice = (e) => {
        let price = e.target.value;
        if(isNaN(parseInt(price[price.length-1]))){
            $('.settle_price').val($('.settle_price').val().substring(0,$('.settle_price').val().length-1))
            return;
        }
        if(allUserCount>0){
            $('.all_price').val(price*($('.provider_percent').val()/100));
            $('.divide_price').val(price*($('.provider_percent').val()/100)/allUserCount);
            $('.divide_star').val(price*($('.provider_percent').val()/100)/allUserCount/100);
        }else{
            $('.all_price').val(0);
            $('.divide_price').val(0);
            $('.divide_star').val(0);
        }
    }
    const onchangePercent = (e) => {
        let percent = e.target.value;
        if(isNaN(parseInt(percent[percent.length-1]))){
            $('.provider_percent').val($('.provider_percent').val().substring(0,$('.provider_percent').val().length-1));
            return;
        }
        if(allUserCount>0){
            $('.all_price').val(percent*($('.settle_price').val()/100));
            $('.divide_price').val(percent*($('.settle_price').val()/100)/allUserCount);
            $('.divide_star').val(percent*($('.settle_price').val()/100)/allUserCount/100);
        }else{
            $('.all_price').val(0);
            $('.divide_price').val(0);
            $('.divide_star').val(0);
        }
    }
    const onChangeCheck = (e) => {
        let prider = e.target.id.split('-')[1];
        let user_count = 0;
        if(e.target.checked){
            setAllUserCount(allUserCount+userObj[prider]);
            user_count = allUserCount+userObj[prider];
            fetchPosts(prider);
        }else{
            setAllUserCount(allUserCount-userObj[prider]);
            user_count = allUserCount-userObj[prider];
            let post_s = [];
            for(var i = 0;i<posts.length;i++){
                if(posts[i]?.prider==prider){
                    
                }else{
                    post_s.push(posts[i]);
                }
            }
            setPosts(post_s);
        }
        if(user_count>0){
            $('.all_price').val($('.provider_percent').val()*($('.settle_price').val()/100));
            $('.divide_price').val($('.provider_percent').val()*($('.settle_price').val()/100)/user_count);
            $('.divide_star').val($('.provider_percent').val()*($('.settle_price').val()/100)/user_count/100);
        }else{
            $('.all_price').val(0);
            $('.divide_price').val(0);
            $('.divide_star').val(0);
        }
    }
    return (
        <>
            <Breadcrumb title={`월 정산`} nickname={``} />
            <Card>
                <Row>
                    <Col>
                        <Title>정산 금액</Title>
                        <Input className='settle_price' onChange={onChangePrice} />
                        <Explain>숫자만 입력</Explain>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>지급 금액 퍼센트 %</Title>
                        <Input className='provider_percent' onChange={onchangePercent} />
                        <Explain>숫자만 입력</Explain>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>지급 받을 리더</Title>
                        <Row style={{ margin: '12px auto 6px 24px' }}>
                            <div style={{ display: 'flex', alignItems: 'column', margin: '0 8px 8px 0' }}>
                                <input type={'checkbox'} id='settle-1' onChange={onChangeCheck}/>
                                <label for='settle-1'>그린리더 ({commarNumber(userObj[1])}명)</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'column', margin: '0 8px 8px 0' }}>
                                <input type={'checkbox'} id='settle-2' onChange={onChangeCheck}/>
                                <label for='settle-2'>프라이더 ({commarNumber(userObj[2])}명)</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'column', margin: '0 8px 8px 0' }}>
                                <input type={'checkbox'} id='settle-3' onChange={onChangeCheck}/>
                                <label for='settle-3'>로얄프라이더 ({commarNumber(userObj[3])}명)</label>
                            </div>
                        </Row>
                        <Explain>여러개 선택 가능</Explain>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>지급 총 금액</Title>
                        <Input className='all_price' disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>각자 지급될 금액</Title>
                        <Input className='divide_price' disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>각자 지급될 스타</Title>
                        <Input className='divide_star' disabled={true} />
                    </Col>
                </Row>
            </Card>
            <ButtonContainer>
                <CancelButton onClick={() => navigate('/manager/list/month_settle')}>x 취소</CancelButton>
                <AddButton onClick={addMarketing}>{'저장'}</AddButton>
            </ButtonContainer>
            {posts.length>0?
            <>
            <DataTable width={'100%'} data={posts} column={objManagerListContent[`prider`].zColumn ?? {}} schema={'prider'} />
            </>
            :
            <>
            </>}
        </>
    )
}
export default MMonthSettle