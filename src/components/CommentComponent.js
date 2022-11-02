import { IoImageOutline } from 'react-icons/io5'
import AddButton from "./elements/button/AddButton";
import theme from '../styles/theme';
import { Content } from './elements/UserContentTemplete';
import { backUrl } from '../data/Data';
import axios from 'axios';
import defaultImg from '../assets/images/icon/default-profile.png';
const CommentComponent = (props) => {
    const { data, addComment, fetchComments } = props;
    const deleteComment = async (pk) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            let obj = {
                pk: pk,
                table: 'comment'
            }
            const { data: response } = await axios.post(`/api/deleteitem`, obj)
            if (response.result > 0) {
                fetchComments();
            } else {
                alert('error')
            }
        }
    }
    return (
        <>

            <Content style={{ marginTop: '32px' }}>
                {JSON.parse(localStorage.getItem('auth'))?.pk > 0 ?
                    <>
                        <div style={{ border: `1px solid ${theme.color.font3}`, display: 'flex', flexDirection: 'column', padding: '16px' }}>
                            <textarea style={{ outline: 'none', resize: 'none', border: 'none', height: '54px', fontSize: theme.size.font4 }} className='comment' />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px' }}>
                                <IoImageOutline style={{ color: theme.color.font3 }} />
                                <AddButton style={{ background: theme.color.font2, boxShadow: 'none' }} onClick={addComment}>작성</AddButton>
                            </div>
                        </div>
                    </>
                    :
                    <>
                    </>
                }
            </Content>


            <Content>
                {data.length > 0 ?
                    <>
                        {data.map((item, idx) => (
                            <>
                                <div style={{ borderBottom: `1px solid ${theme.color.font3}`, display: 'flex', padding: '16px', fontSize: theme.size.font4 }}>
                                    <img alt="프로필 사진" src={item?.profile_img ? (item?.profile_img?.substring(0, 4) == 'http' ? item.profile_img : backUrl + item.profile_img) : defaultImg} style={{ width: '64px', height: '64px', borderRadius: '50%', marginRight: '16px' }} />
                                    <div>
                                        <div style={{ marginBottom: '6px', display: 'flex' }}><div style={{ marginRight: '6px' }}>{item.nickname}</div> <div style={{ color: theme.color.font3 }}>{item.date.substring(0, 16)}</div></div>
                                        <div style={{ wordBreak: 'break-all', marginBottom: '6px', fontSize: theme.size.font3 }}>{item.note}</div>
                                        <div style={{ display: 'flex' }}>
                                            {JSON.parse(localStorage.getItem('auth'))?.pk == item.user_pk || JSON.parse(localStorage.getItem('auth'))?.user_level >= 40 ?
                                                <>
                                                    <div style={{ marginRight: '6px', cursor: 'pointer' }}>수정</div>
                                                    <div style={{ cursor: 'pointer' }} onClick={() => deleteComment(item.pk)}>지우기</div>
                                                </>
                                                :
                                                <>
                                                </>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                    </>
                    :
                    <>
                    </>}
            </Content>
        </>
    )
}
export default CommentComponent;