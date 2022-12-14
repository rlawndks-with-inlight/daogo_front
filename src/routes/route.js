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
    { link: '/', element: <Login />, title: "?????????" },
    { link: '/login', element: <Login />, title: "?????????" },
    { link: '/home', element: <Home />, title: "???" },
    { link: '/mypage', element: <MyPage />, title: "???????????????" },
    { link: '/editmyinfo', element: <EditMyInfo />, title: "????????????" },
    { link: '/findmyinfo', element: <FindMyInfo />, title: "?????????/???????????? ??????" },
    { link: '/signup', element: <SignUp />, title: "????????????" },
    { link: '/signup/:id', element: <SignUp />, title: "????????????" },
    { link: '/resign', element: <Resign />, title: "????????????" },
    { link: '/randombox/lottery', element: <Lottery />, title: "??????" },
    { link: '/shoppingmall/coupon', element: <CouponShoppingMall />, title: "???????????????" },
    { link: '/shoppingmall/outlet', element: <OutletShoppingMall />, title: "???????????????" },
    { link: '/randombox/register', element: <RegisterRandomBox />, title: "??????????????????" },
    { link: '/buyesgwpoint', element: <BuyESGWPoint />, title: "ESGW ??????" },
    { link: '/gift', element: <Gift />, title: "????????????" },
    { link: '/gift/history', element: <GiftHistory />, title: "????????? ??????" },
    { link: '/withdrawrequest', element: <WithdrawRequest />, title: "????????????" },
    { link: '/exchange/history', element: <LogExchangeHistory />, title: "??????????????????" },
    { link: '/user_money/history', element: <LogMoneyHistory />, title: "????????????" },
    { link: '/recommendgenealogy', element: <RecommendGenealogy />, title: "????????????" },
    { link: '/eventgame', element: <EventGame />, title: "???????????????" },
    { link: '/randombox_rolling/history', element: <RandomboxRollingHistory />, title: "???????????? ?????? ??????" },
    { link: '/:schema/history', element: <History />, title: "?????????" },
    { link: '/qrcode', element: <QrCode />, title: "QR??????" },
    

    { link: '/noticelist', element: <NoticeList />, title: "????????????" },
    { link: '/circlecanvas', element: <CircleCanvas />, title: "????????????" },
    { link: '/subscriptiondeposit', element: <SubscriptionDeposit />, title: "??????????????? ??????" },
    { link: '/item/outlet/:pk', element: <Outlet />, title: "???????????????" },
    { link: '/item/outlet/order/:pk', element: <OutletOrder />, title: "???????????????" },
    { link: '/item/coupon/:pk', element: <Coupon />, title: "???????????????" },

    { link: '/post/:table/:pk', element: <Post />, title: "?????????" },
    

]
const zManagerRoute = [
    { link: '/manager', element: <MLogin />, title: "??????????????????" },
    { link: '/manager/login', element: <MLogin />, title: "??????????????????" },

    { link: '/manager/user_organization_chart', element: <MUserOrganizationChart />, title: "" },
    { link: '/manager/edit/daily_payment_probability', element: <MDailyPaymentProbabilityEdit />, title: "" },
    { link: '/manager/edit/withdraw_setting', element: <MWithdrawSetting />, title: "" },
    { link: '/manager/edit/gift_setting', element: <MGiftSetting />, title: "" },
    { link: '/manager/daily_manual_payment', element: <MDailyManualPayment />, title: "" },
    { link: '/manager/edit/main_banner/:pk', element: <MMainBannerEdit />, title: "????????????" },
    { link: '/manager/edit/notice/:pk', element: <MNoticeEdit />, title: "??????????????????" },

    { link: '/manager/edit/user/:pk', element: <MUserEdit />, title: "????????????" },
    { link: '/manager/usermoneyedit/:pk', element: <MUserMoneyEdit />, title: "??????????????????" },
    { link: '/manager/usermoneyeditbyexcel', element: <MUserMoneyEditByExcel />, title: "???????????? ?????? ?????????" },
    { link: '/manager/usersubscriptiondepositedit/:pk', element: <MUserSubscriptionDepositEdit />, title: "?????? ??????????????? ??????" },
    { link: '/manager/usermarketing/:pk', element: <MUserMarketingEdit />, title: "??????(?????????)" },
    { link: '/manager/userprideredit/:pk', element: <MUserPriderEdit />, title: "????????????" },

    { link: '/manager/monthsettle', element: <MMonthSettle />, title: "?????????" },
    { link: '/manager/weeksettle', element: <MWeekSettle />, title: "?????????" },


    { link: '/manager/edit/coupon/:pk', element: <MCouponEdit />, title: "????????????" },
    { link: '/manager/edit/coupon_category/:pk', element: <MCouponCategoryEdit />, title: "????????????????????????" },
    { link: '/manager/edit/coupon_brand/:pk', element: <MCouponBrandEdit />, title: "?????????????????????" },

    { link: '/manager/edit/outlet/:pk', element: <MOutletEdit />, title: "???????????????" },
    { link: '/manager/edit/outlet_brand/:pk', element: <MOutletBrandEdit />, title: "????????????????????????" },
    { link: '/manager/edit/outlet_category/:pk', element: <MOutletCategoryEdit />, title: "???????????????????????????" },

    { link: '/manager/edit/:table/:pk', element: <MItemEdit />, title: "" },
    { link: '/manager/edit/:table', element: <MItemEdit />, title: "" },
    { link: '/manager/list/:table/:pk', element: <MItemList />, title: "" },
    { link: '/manager/list/:table', element: <MItemList />, title: "" },
]

export { zUserRoute, zManagerRoute }