import Home from '../pages/User/Home';

import Lottery from '../pages/User/RandomBox/Lottery';

import Login from '../pages/User/Auth/Login';
import MyPage from '../pages/User/Auth/MyPage';
import EditMyInfo from '../pages/User/Auth/EditMyInfo';
import FindMyInfo from '../pages/User/Auth/FindMyInfo';
import SignUp from '../pages/User/Auth/SignUp';
import Resign from '../pages/User/Auth/Resign';

import MLogin from '../pages/Manager/MLogin';

import MItemList from '../pages/Manager/MItemList';

import MMainBannerEdit from '../pages/Manager/Board/MMainBannerEdit';
import MNoticeEdit from '../pages/Manager/Board/MNoticeEdit';

import MCouponEdit from '../pages/Manager/Coupon/MCouponEdit';

import MDailyManualPayment from '../pages/Manager/Daily/MDailyManualPayment';
import MDailyPaymentProbabilityEdit from '../pages/Manager/Daily/MDailyPaymentProbabilityEdit';


import MUserEdit from '../pages/Manager/User/MUserEdit';
import MUserOrganizationChart from '../pages/Manager/User/MUserOrganizationChart';

import MSetting from '../pages/Manager/MSetting';
import MSettingEdit from '../pages/Manager/MSettingEdit';
import MCouponCategoryEdit from '../pages/Manager/Coupon/MCouponCategoryEdit';
import MItemEdit from '../pages/Manager/MItemEdit';
import MCouponBrandEdit from '../pages/Manager/Coupon/MCouponBrandEdit';
import MOutletCategoryEdit from '../pages/Manager/Outlet/MOutletCategoryEdit';
import MOutletBrandEdit from '../pages/Manager/Outlet/MOutletBrandEdit';
import MOutletEdit from '../pages/Manager/Outlet/MOutletEdit';
import CouponShoppingMall from '../pages/User/Coupon/CouponShoppingMall';
import OutletShoppingMall from '../pages/User/Outlet/OutletShoppingMall';

const zUserRoute = [
    { link: '/', element: <Login />, title: "로그인" },
    { link: '/login', element: <Login />, title: "로그인" },
    { link: '/home', element: <Home />, title: "홈" },
    { link: '/mypage', element: <MyPage />, title: "마이페이지" },
    { link: '/editmyinfo', element: <EditMyInfo />, title: "회원수정" },
    { link: '/findmyinfo', element: <FindMyInfo />, title: "아이디/비밀번호 찾기" },
    { link: '/signup', element: <SignUp />, title: "회원가입" },
    { link: '/signup/:id', element: <SignUp />, title: "회원가입" },
    { link: '/resign', element: <Resign />, title: "회원탈퇴" },
    { link: '/lottery', element: <Lottery />, title: "추첨" },
    { link: '/shoppingmall/coupon', element: <CouponShoppingMall />, title: "쿠폰이벤트" },
    { link: '/shoppingmall/outlet', element: <OutletShoppingMall />, title: "아울렛쇼핑" },
    

]
const zManagerRoute = [
    { link: '/manager', element: <MLogin />, title: "관리자로그인" },
    { link: '/manager/login', element: <MLogin />, title: "관리자로그인" },

    { link: '/manager/user_organization_chart', element: <MUserOrganizationChart />, title: "" },

    { link: '/manager/edit/daily_payment_probability', element: <MDailyPaymentProbabilityEdit />, title: "" },
    { link: '/manager/daily_manual_payment', element: <MDailyManualPayment />, title: "" },
    { link: '/manager/edit/main_banner/:pk', element: <MMainBannerEdit />, title: "메인배너" },
    { link: '/manager/edit/notice/:pk', element: <MNoticeEdit />, title: "공지사항관리" },

    { link: '/manager/edit/user/:pk', element: <MUserEdit />, title: "회원관리" },

    { link: '/manager/edit/coupon/:pk', element: <MCouponEdit />, title: "쿠폰관리" },
    { link: '/manager/edit/coupon_category/:pk', element: <MCouponCategoryEdit />, title: "쿠폰카테고리관리" },
    { link: '/manager/edit/coupon_brand/:pk', element: <MCouponBrandEdit />, title: "쿠폰브랜드관리" },

    { link: '/manager/edit/outlet/:pk', element: <MOutletEdit />, title: "아울렛관리" },
    { link: '/manager/edit/outlet_brand/:pk', element: <MOutletBrandEdit />, title: "아울렛브랜드관리" },
    { link: '/manager/edit/outlet_category/:pk', element: <MOutletCategoryEdit />, title: "아울렛카테고리관리" },


    { link: '/manager/user_organization_chart', element: <MDailyPaymentProbabilityEdit />, title: "회원조직도" },

    { link: '/manager/setting', element: <MSetting />, title: "환경설정" },
    { link: '/manager/edit/setting', element: <MSettingEdit />, title: "환경설정" },
    { link: '/manager/edit/:table/:pk', element: <MItemEdit />, title: "" },
    { link: '/manager/edit/:table', element: <MItemEdit />, title: "" },
    { link: '/manager/list/:table/:pk', element: <MItemList />, title: "" },
    { link: '/manager/list/:table', element: <MItemList />, title: "" },
]
export { zUserRoute, zManagerRoute }