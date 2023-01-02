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

import MDailyManualPayment from '../pages/Manager/Setting/MDailyManualPayment';
import MDailyPaymentProbabilityEdit from '../pages/Manager/Setting/MDailyPaymentProbabilityEdit';


import MUserEdit from '../pages/Manager/User/MUserEdit';
import MUserOrganizationChart from '../pages/Manager/User/MUserOrganizationChart';

import MCouponCategoryEdit from '../pages/Manager/Coupon/MCouponCategoryEdit';
import MItemEdit from '../pages/Manager/MItemEdit';
import MCouponBrandEdit from '../pages/Manager/Coupon/MCouponBrandEdit';
import MOutletCategoryEdit from '../pages/Manager/Outlet/MOutletCategoryEdit';
import MOutletBrandEdit from '../pages/Manager/Outlet/MOutletBrandEdit';
import MOutletEdit from '../pages/Manager/Outlet/MOutletEdit';
import CouponShoppingMall from '../pages/User/Coupon/CouponShoppingMall';
import OutletShoppingMall from '../pages/User/Outlet/OutletShoppingMall';
import RegisterRandomBox from '../pages/User/RandomBox/RegisterRandomBox';
import Gift from '../pages/User/Gift/Gift';
import History from '../pages/User/History/History';
import RecommendGenealogy from '../pages/User/Auth/RecommendGenealogy';
import EventGame from '../pages/User/EventGame';
import QrCode from '../pages/User/QrCode';
import WithdrawRequest from '../pages/User/Auth/WithdrawRequest';
import NoticeList from '../pages/User/Notice/NoticeList';
import BuyESGWPoint from '../pages/User/BuyESGWPoint';
import MUserMoneyEdit from '../pages/Manager/User/MUserMoneyEdit';
import SubscriptionDeposit from '../pages/User/SubscriptionDeposit/SubscriptionDeposit';
import Post from '../pages/User/Posts/Post';
import Outlet from '../pages/User/Outlet/Outlet';
import Coupon from '../pages/User/Coupon/Coupon';
import OutletOrder from '../pages/User/Outlet/OutletOrder';
import MUserMarketingEdit from '../pages/Manager/User/MUserMarketingEdit';
import GiftHistory from '../pages/User/Gift/GiftHistory';
import RandomboxRollingHistory from '../pages/User/RandomBox/RandomboxRollingHistory';
import MWithdrawSetting from '../pages/Manager/Setting/MWithdrawSetting';
import WithdrawRequestHistory from '../pages/User/Auth/WithdrawRequestHistory';
import MUserSubscriptionDepositEdit from '../pages/Manager/User/MUserSubscriptionDepositEdit';
import MUserPriderEdit from '../pages/Manager/User/MUserPriderEdit';
import MMonthSettle from '../pages/Manager/Settle/MMonthSettle';
import MWeekSettle from '../pages/Manager/Settle/MWeekSettle';
import CircleCanvas from '../pages/User/CircleCanvas';
import MUserMoneyEditByExcel from '../pages/Manager/User/MUserMoneyEditByExcel';
import LogMoneyHistory from '../pages/User/History/LogMoneyHistory';
import LogExchangeHistory from '../pages/User/History/LogExchangeHistory';
import MGiftSetting from '../pages/Manager/Setting/MGiftSetting';

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
    { link: '/randombox/lottery', element: <Lottery />, title: "추첨" },
    { link: '/shoppingmall/coupon', element: <CouponShoppingMall />, title: "쿠폰이벤트" },
    { link: '/shoppingmall/outlet', element: <OutletShoppingMall />, title: "아울렛쇼핑" },
    { link: '/randombox/register', element: <RegisterRandomBox />, title: "랜덤박스등록" },
    { link: '/buyesgwpoint', element: <BuyESGWPoint />, title: "ESGW 구매" },
    { link: '/gift', element: <Gift />, title: "선물하기" },
    { link: '/gift/history', element: <GiftHistory />, title: "선물한 내역" },
    { link: '/withdrawrequest', element: <WithdrawRequest />, title: "출금신청" },
    { link: '/exchange/history', element: <LogExchangeHistory />, title: "출금신청내역" },
    { link: '/user_money/history', element: <LogMoneyHistory />, title: "변동로그" },
    { link: '/recommendgenealogy', element: <RecommendGenealogy />, title: "추천계보" },
    { link: '/eventgame', element: <EventGame />, title: "이벤트게임" },
    { link: '/randombox_rolling/history', element: <RandomboxRollingHistory />, title: "랜덤박스 롤링 내역" },
    { link: '/:schema/history', element: <History />, title: "리스트" },
    { link: '/qrcode', element: <QrCode />, title: "QR코드" },
    

    { link: '/noticelist', element: <NoticeList />, title: "공지사항" },
    { link: '/circlecanvas', element: <CircleCanvas />, title: "공지사항" },
    { link: '/subscriptiondeposit', element: <SubscriptionDeposit />, title: "청약예치금 등록" },
    { link: '/item/outlet/:pk', element: <Outlet />, title: "아울렛쇼핑" },
    { link: '/item/outlet/order/:pk', element: <OutletOrder />, title: "아울렛쇼핑" },
    { link: '/item/coupon/:pk', element: <Coupon />, title: "쿠폰이벤트" },

    { link: '/post/:table/:pk', element: <Post />, title: "게시물" },
    

]
const zManagerRoute = [
    { link: '/manager', element: <MLogin />, title: "관리자로그인" },
    { link: '/manager/login', element: <MLogin />, title: "관리자로그인" },

    { link: '/manager/user_organization_chart', element: <MUserOrganizationChart />, title: "" },
    { link: '/manager/edit/daily_payment_probability', element: <MDailyPaymentProbabilityEdit />, title: "" },
    { link: '/manager/edit/withdraw_setting', element: <MWithdrawSetting />, title: "" },
    { link: '/manager/edit/gift_setting', element: <MGiftSetting />, title: "" },
    { link: '/manager/daily_manual_payment', element: <MDailyManualPayment />, title: "" },
    { link: '/manager/edit/main_banner/:pk', element: <MMainBannerEdit />, title: "메인배너" },
    { link: '/manager/edit/notice/:pk', element: <MNoticeEdit />, title: "공지사항관리" },

    { link: '/manager/edit/user/:pk', element: <MUserEdit />, title: "회원관리" },
    { link: '/manager/usermoneyedit/:pk', element: <MUserMoneyEdit />, title: "회원머니관리" },
    { link: '/manager/usermoneyeditbyexcel', element: <MUserMoneyEditByExcel />, title: "회원머니 엑셀 업로드" },
    { link: '/manager/usersubscriptiondepositedit/:pk', element: <MUserSubscriptionDepositEdit />, title: "회원 청약예치금 관리" },
    { link: '/manager/usermarketing/:pk', element: <MUserMarketingEdit />, title: "매출(패키지)" },
    { link: '/manager/userprideredit/:pk', element: <MUserPriderEdit />, title: "프라이더" },

    { link: '/manager/monthsettle', element: <MMonthSettle />, title: "월정산" },
    { link: '/manager/weeksettle', element: <MWeekSettle />, title: "주정산" },


    { link: '/manager/edit/coupon/:pk', element: <MCouponEdit />, title: "쿠폰관리" },
    { link: '/manager/edit/coupon_category/:pk', element: <MCouponCategoryEdit />, title: "쿠폰카테고리관리" },
    { link: '/manager/edit/coupon_brand/:pk', element: <MCouponBrandEdit />, title: "쿠폰브랜드관리" },

    { link: '/manager/edit/outlet/:pk', element: <MOutletEdit />, title: "아울렛관리" },
    { link: '/manager/edit/outlet_brand/:pk', element: <MOutletBrandEdit />, title: "아울렛브랜드관리" },
    { link: '/manager/edit/outlet_category/:pk', element: <MOutletCategoryEdit />, title: "아울렛카테고리관리" },

    { link: '/manager/edit/:table/:pk', element: <MItemEdit />, title: "" },
    { link: '/manager/edit/:table', element: <MItemEdit />, title: "" },
    { link: '/manager/list/:table/:pk', element: <MItemList />, title: "" },
    { link: '/manager/list/:table', element: <MItemList />, title: "" },
]

export { zUserRoute, zManagerRoute }