import albumImg from '../assets/images/icon/albums.svg';
import albumWhiteImg from '../assets/images/icon/albums-white.svg';
import albumActiveImg from '../assets/images/icon/albums-active.svg';
import bulbImg from '../assets/images/icon/bulb.svg';
import bulbWhiteImg from '../assets/images/icon/bulb-white.svg';
import bulbActiveImg from '../assets/images/icon/bulb-active.svg';
import featureImg from '../assets/images/icon/features.svg';
import featureWhiteImg from '../assets/images/icon/features-white.svg';
import featureActiveImg from '../assets/images/icon/features-active.svg';
import talkImg from '../assets/images/icon/talk.svg';
import talkWhiteImg from '../assets/images/icon/talk-white.svg';
import talkActiveImg from '../assets/images/icon/talk-active.svg';
import thumbImg from '../assets/images/icon/thumb.svg';
import thumbWhiteImg from '../assets/images/icon/thumb-white.svg';
import thumbActiveImg from '../assets/images/icon/thumb-active.svg';
import logoImg from '../assets/images/icon/logo.png'
import { EditorState } from "draft-js"
import {BsPerson} from 'react-icons/bs';
import {GrEdit} from 'react-icons/gr';
import {AiOutlineGift, AiOutlineWallet} from 'react-icons/ai';
import theme from '../styles/theme';
export const backUrl = "http://localhost:8001";
export const logoSrc = logoImg;
export const confirmAsk = "저장 하시겠습니까?";
export const deleteAsk = "정말 삭제 하시겠습니까?";

//http://weare-first.com:8001
export const editorState = {
    editorState: EditorState.createEmpty()
}

export const zBottomMenu = [
    { name: '선물하기', link: '#', icon: <BsPerson src={localStorage.getItem('dark_mode') ? bulbWhiteImg : bulbImg} className='menu-icon' alt="#" />, activeIcon: <BsPerson src={bulbActiveImg} className='menu-icon' alt="#" />, allowList: [] },
    // { name: '핵심비디오', link: '/videolist', icon: <img src={playImg} className='menu-icon' alt="#" />, activeIcon: <img src={playActiveImg} className='menu-icon' alt="#" />, allowList: ['/videolist'] },
    { name: '지갑변동내역', link: '#', icon: <AiOutlineWallet src={localStorage.getItem('dark_mode') ? featureWhiteImg : featureImg} className='menu-icon' alt="#" />, activeIcon: <AiOutlineWallet src={featureActiveImg} className='menu-icon' alt="#" />, allowList: [] },
    { name: '개인정보수정', link: '#', icon: <GrEdit src={localStorage.getItem('dark_mode') ? albumWhiteImg : albumImg} className='menu-icon' alt="#" />, activeIcon: <GrEdit src={albumActiveImg} className='menu-icon' alt="#" />, allowList: [] },
    { name: '마이페이지', link: '/login', icon: <AiOutlineGift src={localStorage.getItem('dark_mode') ? talkWhiteImg : talkImg} className='menu-icon' alt="#" />, activeIcon: <AiOutlineGift src={talkActiveImg} className='menu-icon' alt="#" />, allowList: [] }
];
export const zSidebarMenu = [
    { name: '아울렛 쇼핑', link: '#'},
    { name: '쿠폰 이벤트', link: '#'},
    { name: '이벤트 게임', link: '#'},
    { name: '랜덤박스 등록', link: '#'},
    { name: '선물하기', link: '#'},
    { name: '랜덤박스 변동내역', link: '#'},
    { name: '스타 변동내역', link: '#'},
    { name: '포인트 변동내역', link: '#'},
    { name: '공유코드', link: '#'},
    { name: '추천계보', link: '#'},
    { name: 'QR CODE', link: '#'},
    { name: '개인정보 수정', link: '#'},
    { name: '출금신청', link: '#'},
    { name: '공지사항', link: '#'},
]


export const cardDefaultColor = {
    font: "#000",
    background: "#f4f4f4"
}
export const needTwoImage = ['issue', 'theme', 'feature'];

export const getManagerListApi = (table, num) => {
    let str = "";
    return str;
}
export const slideSetting = {
    infinite: false,
    dots: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 2500,
    slidesToShow: 1.15,
    slidesToScroll: 1,
    breakpoint: 480,
    beforeChange: (current, next) => { console.log(current) },
    afterChange: current => { console.log(current) },
}