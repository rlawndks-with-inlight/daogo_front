import { logoSrc, backUrl } from "../ContentData";
import { EditorState } from "draft-js"
import { columnObjFormat, editContentFormat, sidebarContentFormat, sidebarObjFormat, sidebarObjListFormat } from "./ManagerContentFormat";
import $ from 'jquery'
export const editorState = {
    editorState: EditorState.createEmpty()
}

export const cardDefaultColor = {
    font: "#000",
    background: "#f4f4f4"
}
export const needTwoImage = ['issue', 'theme', 'feature'];


export const zSidebar = [
    sidebarContentFormat('기본설정', [
        sidebarObjListFormat('출금 환경설정', '/manager/edit/withdraw_setting', 40, ['/manager/edit/withdraw_setting']),//edit
        sidebarObjListFormat('선물 환경설정', '/manager/edit/gift_setting', 40, ['/manager/edit/gift_setting']),//edit
        sidebarObjListFormat('데일리지급확률', '/manager/edit/daily_payment_probability', 40, ['/manager/edit/daily_payment_probability']),//edit
       // sidebarObjListFormat('데일리수동지급', '/manager/daily_manual_payment', 40, ['/manager/daily_manual_payment'])
    ]),
    sidebarContentFormat('회원관리', [
        sidebarObjListFormat('회원리스트', '/manager/list/user', 40, ['/manager/list/user']),//list
        sidebarObjListFormat('회원 엑셀 머니수정 ', '/manager/usermoneyeditbyexcel', 40, ['/manager/usermoneyeditbyexcel']),//list
        sidebarObjListFormat('회원 청약예치금 리스트', '/manager/list/user_subscriptiondeposit', 40, ['/manager/list/user_subscriptiondeposit']),//list
        sidebarObjListFormat('회원조직도(레벨별)', '/manager/user_organization_chart', 40, ['/manager/user_organization_chart']),
    ]),
    sidebarContentFormat('매출관리', [
        sidebarObjListFormat('매출(패키지)리스트', '/manager/list/marketing', 40, ['/manager/list/marketing']),//list ?
        sidebarObjListFormat('스타 변동 LOG', '/manager/list/log_star', 40, ['/manager/list/log_star']),//list
        sidebarObjListFormat('포인트 변동 LOG', '/manager/list/log_point', 40, ['/manager/list/log_point']),//list
        sidebarObjListFormat('랜덤박스 변동 LOG', '/manager/list/log_randombox', 40, ['/manager/list/log_randombox']),//list
        sidebarObjListFormat('ESGWP 변동 LOG', '/manager/list/log_esgw', 40, ['/manager/list/log_esgw']),//list
        sidebarObjListFormat('청약예치금 LOG', '/manager/list/log_subscriptiondeposit', 40, ['/manager/list/log_subscriptiondeposit']),//list
    ]),
    sidebarContentFormat('게시판관리', [
        sidebarObjListFormat('메인배너', '/manager/list/main_banner', 40, ['/manager/list/main_banner']),//list
        sidebarObjListFormat('공지사항', '/manager/list/notice', 40, ['/manager/list/notice']),//list
    ]),
    sidebarContentFormat('로그관리', [
        sidebarObjListFormat('회원접속 LOG', '/manager/list/log_user', 40, ['/manager/list/log_user']),//list
        sidebarObjListFormat('관리자접속 LOG', '/manager/list/log_admin', 40, ['/manager/list/log_admin']),//list
        sidebarObjListFormat('관리활동 LOG', '/manager/list/log_manager_action', 40, ['/manager/list/log_manager_action']),//list
    ]),
    sidebarContentFormat('운영관리', [
        sidebarObjListFormat('출금신청리스트', '/manager/list/exchange', 40, ['/manager/list/exchange']),//list
    ]),
    sidebarContentFormat('정산관리', [
        sidebarObjListFormat('월정산리스트', '/manager/list/month_settle', 40, ['/manager/list/month_settle']),//list ?
        sidebarObjListFormat('주정산리스트', '/manager/list/week_settle', 40, ['/manager/list/week_settle']),//list ?
        sidebarObjListFormat('월 정산', '/manager/monthsettle', 40, ['/manager/monthsettle']),//list ?
        sidebarObjListFormat('주 정산', '/manager/weeksettle', 40, ['/manager/weeksettle']),//list ?
    ]),
    sidebarContentFormat('쿠폰이벤트관리', [
        sidebarObjListFormat('카테고리리스트', '/manager/list/coupon_category', 40, ['/manager/list/coupon_category']),//list
        sidebarObjListFormat('브랜드리스트', '/manager/list/coupon_brand', 40, ['/manager/list/coupon_brand']),//list
        sidebarObjListFormat('상품리스트', '/manager/list/coupon', 40, ['/manager/list/coupon']),//list
        sidebarObjListFormat('주문리스트', '/manager/list/coupon_order', 40, ['/manager/list/coupon_order']),//list
        //sidebarObjListFormat('예치금 변동 LOG', '/manager/list/log_coupon', 40, ['/manager/list/log_coupon']),//list
    ]),
    sidebarContentFormat('경매이벤트관리', [
        sidebarObjListFormat('경매관리', '/manager/list/auction', 40, ['/manager/list/auction']),//list
        sidebarObjListFormat('행운의전당', '/manager/list/jackpot_winner', 40, ['/manager/list/jackpot_winner']),//list
    ]),
    sidebarContentFormat('아울렛관리', [
        sidebarObjListFormat('카테고리리스트', '/manager/list/outlet_category', 40, ['/manager/list/outlet_category']),//list
        sidebarObjListFormat('브랜드리스트', '/manager/list/outlet_brand', 40, ['/manager/list/outlet_brand']),//list
        sidebarObjListFormat('상품리스트', '/manager/list/outlet', 40, ['/manager/list/outlet']),//list
        sidebarObjListFormat('주문리스트', '/manager/list/outlet_order', 40, ['/manager/list/outlet_order']),//list
    ]),
];

export const objManagerListContent = {
    user: sidebarObjFormat(
        '회원 리스트',
        'user',
        [
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('스타', '', 'number', 'star'),
            columnObjFormat('포인트', '', 'number', 'point'),
            columnObjFormat('랜덤박스', '', 'number', 'randombox'),
            columnObjFormat('ESGW', '', 'number', 'esgw'),
            columnObjFormat('티어', '', 'tier', 'tier'),
            columnObjFormat('프라이더', '', 'prider', 'prider'),
            columnObjFormat('PV점수', '', 'pv_score', 'score'),
            columnObjFormat('파트너점수', '', 'text', 'partner'),
            columnObjFormat('추천인', '', 'text', 'parent_id'),
            columnObjFormat('가입일', '', 'date', 'date'),
            columnObjFormat('로그인시간', '', 'date', 'last_login'),
            columnObjFormat('정보수정', '', 'edit', 'edit'),
            columnObjFormat('머니수정', '', 'user_money_edit', 'user_money_edit'),
            columnObjFormat('매출등록', '', 'user_marketing', 'user_marketing'),
            columnObjFormat('프라이더등록', '', 'user_prider_edit', 'user_prider_edit'),
        ],
        [`prider=`, `tier=`],
        true,
        false),
    prider: sidebarObjFormat(
        '프라이더 리스트',
        'prider',
        [
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('스타', '', 'number', 'star'),
            columnObjFormat('포인트', '', 'number', 'point'),
            columnObjFormat('랜덤박스', '', 'number', 'randombox'),
            columnObjFormat('ESGW', '', 'number', 'esgw'),
            columnObjFormat('티어', '', 'tier', 'tier'),
            columnObjFormat('프라이더', '', 'prider', 'prider'),
            columnObjFormat('파트너점수', '', 'text', 'partner'),
            columnObjFormat('가입일', '', 'date', 'date'),
        ],
        [],
        true,
        false),
    week_prider: sidebarObjFormat(
        '프라이더 리스트',
        'week_prider',
        [
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('스타', '', 'number', 'star'),
            columnObjFormat('포인트', '', 'number', 'point'),
            columnObjFormat('랜덤박스', '', 'number', 'randombox'),
            columnObjFormat('ESGW', '', 'number', 'esgw'),
            columnObjFormat('티어', '', 'tier', 'tier'),
            columnObjFormat('프라이더', '', 'prider', 'prider'),
            columnObjFormat('파트너점수', '', 'text', 'partner'),
            columnObjFormat('가입일', '', 'date', 'date'),
            columnObjFormat('이번주 매출 보기', '', 'week_settle_look', 'week_settle_look'),
        ],
        [],
        true,
        false),
    user_subscriptiondeposit: sidebarObjFormat(
        '회원 청약예치금 리스트',
        'user_subscriptiondeposit',
        [
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('스타', '', 'minus_number', 'star'),
            columnObjFormat('포인트', '', 'minus_number', 'point'),
            columnObjFormat('ESGW', '', 'minus_number', 'esgw'),
            columnObjFormat('티어', '', 'tier', 'tier'),
            columnObjFormat('머니수정', '', 'user_subscriptiondeposit_edit', 'user_subscriptiondeposit_edit'),
        ],
        [],
        false,
        false,
    ),
    extra_pay: sidebarObjFormat(
        '수당지급 리스트',
        'extra_pay',
        [
            columnObjFormat('타이틀', '', 'text', 'user_id'),
            columnObjFormat('메모', '', 'text', 'user_name'),
            columnObjFormat('지급타입', '', 'text', 'date'),
            columnObjFormat('지급내용', '', 'text', 'ip'),
            columnObjFormat('지급일', '', 'text', 'ip'),
        ],
        [],
        false,
        false
    ),
    marketing: sidebarObjFormat(
        '매출(패키지) 리스트',
        'marketing',
        [
            columnObjFormat('지갑아이디', '', 'text', 'user_id'),
            columnObjFormat('회원명', '', 'text', 'user_name'),
            columnObjFormat('신청레벨(레벨명)', '', 'marketing_tier', 'marketing_tier'),
            columnObjFormat('완료일', '', 'text', 'date'),
            columnObjFormat('처리자아이디', '', 'text', 'manager_id'),
            columnObjFormat('처리자이름', '', 'text', 'manager_name'),
        ],
        [],
        false,
        false
    ),
    week_marketing: sidebarObjFormat(
        '주정산 리스트',
        'week_marketing',
        [
            columnObjFormat('아이디', '', 'text', 'user_id'),
            columnObjFormat('회원명', '', 'text', 'user_name'),
            columnObjFormat('매출등록일', '', 'text', 'date'),
            columnObjFormat('매출등급', '', 'week_marketing_tier', 'week_marketing_tier'),
            columnObjFormat('수당%', '', 'week_marketing_percent', 'week_marketing_percent'),
            columnObjFormat('지급될스타', '', 'week_marketing_star', 'week_marketing_star'),
            columnObjFormat('발생사유', '', 'week_marketing_reason', 'week_marketing_reason'),
            columnObjFormat('처리자아이디', '', 'text', 'manager_id'),
            columnObjFormat('처리자이름', '', 'text', 'manager_name'),
        ],
        [],
        false,
        false
    ),
    log_star: sidebarObjFormat(
        '스타 변동 LOG',
        'log_star',
        [
            columnObjFormat('아이디', '', 'text', 'user_id'),
            columnObjFormat('회원명', '', 'text', 'user_name'),
            columnObjFormat('증감', '', 'increase', 'price'),
            columnObjFormat('금액', '', 'abs', 'price'),
            columnObjFormat('메모', '', 'type_note', 'type_note'),
            columnObjFormat('관리자메모', '', 'text', 'note'),
            columnObjFormat('등록일', '', 'text', 'date'),
        ],
        [],
        false,
        false
    ),
    log_point: sidebarObjFormat(
        '포인트 변동 LOG',
        'log_point',
        [
            columnObjFormat('아이디', '', 'text', 'user_id'),
            columnObjFormat('회원명', '', 'text', 'user_name'),
            columnObjFormat('증감', '', 'increase', 'price'),
            columnObjFormat('금액', '', 'abs', 'price'),
            columnObjFormat('메모', '', 'type_note', 'type_note'),
            columnObjFormat('관리자메모', '', 'text', 'note'),
            columnObjFormat('등록일', '', 'text', 'date'),
        ],
        [],
        false,
        false
    ),
    log_randombox: sidebarObjFormat(
        '랜덤박스 변동 LOG',
        'log_randombox',
        [
            columnObjFormat('아이디', '', 'text', 'user_id'),
            columnObjFormat('회원명', '', 'text', 'user_name'),
            columnObjFormat('증감', '', 'increase', 'price'),
            columnObjFormat('금액', '', 'abs', 'price'),
            columnObjFormat('메모', '', 'type_note', 'type_note'),
            columnObjFormat('관리자메모', '', 'text', 'note'),
            columnObjFormat('등록일', '', 'text', 'date'),
        ],
        [],
        false,
        false
    ),
    log_esgw: sidebarObjFormat(
        'ESGWP 변동 LOG',
        'log_esgw',
        [
            columnObjFormat('아이디', '', 'text', 'user_id'),
            columnObjFormat('회원명', '', 'text', 'user_name'),
            columnObjFormat('증감', '', 'increase', 'price'),
            columnObjFormat('금액', '', 'abs', 'price'),
            columnObjFormat('메모', '', 'type_note', 'type_note'),
            columnObjFormat('관리자메모', '', 'text', 'note'),
            columnObjFormat('등록일', '', 'text', 'date'),
        ],
        [],
        false,
        false
    ),
    log_subscriptiondeposit: sidebarObjFormat(
        '청약예치금 LOG',
        'log_subscriptiondeposit',
        [
            columnObjFormat('아이디', '', 'text', 'user_id'),
            columnObjFormat('회원명', '', 'text', 'user_name'),
            columnObjFormat('카테고리', '', 'text', 'category'),
            columnObjFormat('금액', '', 'abs', 'price'),
            columnObjFormat('증감', '', 'minus_increase', 'price'),
            columnObjFormat('금액', '', 'abs', 'price'),
            columnObjFormat('발생일', '', 'text', 'date'),
        ],
        [],
        false,
        false,
        "100%",
        "/api/getsubscriptiondeposithistory"
    ),
    main_banner: sidebarObjFormat(
        '메인 배너 리스트',
        'main_banner',
        [
            columnObjFormat('베너이미지', '', 'img', 'img_src'),
            columnObjFormat('베너링크', '', 'text', 'link'),
            columnObjFormat('타겟설정', '', 'target', 'target'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true
    ),
    notice: sidebarObjFormat(
        '공지사항 리스트',
        'notice',
        [
            columnObjFormat('타이틀', '', 'text', 'title'),
            columnObjFormat('지급일', '', 'text', 'date'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('팝업여부', '', 'status', 'is_popup'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true
    ),
    log_user: sidebarObjFormat(
        '회원 접속 LOG',
        'log_login',
        [
            columnObjFormat('UID', '', 'text', 'user_id'),
            columnObjFormat('이름', '', 'text', 'user_name'),
            columnObjFormat('최근접속일', '', 'date', 'date'),
            columnObjFormat('접속아이피', '', 'text', 'ip'),
        ],
        [
            'level=0'
        ],
        false,
        false
    ),
    log_admin: sidebarObjFormat(
        '관리자 접속 LOG',
        'log_login',
        [
            columnObjFormat('UID', '', 'text', 'user_id'),
            columnObjFormat('이름', '', 'text', 'user_name'),
            columnObjFormat('최근접속일', '', 'date', 'date'),
            columnObjFormat('접속아이피', '', 'text', 'ip'),
        ],
        [
            'level=40'
        ],
        false,
        false
    ),
    log_manager_action: sidebarObjFormat(
        '관리활동 LOG',
        'log_manager_action',
        [
            columnObjFormat('UID', '', 'text', 'user_id'),
            columnObjFormat('이름', '', 'text', 'user_name'),
            columnObjFormat('팀명', '', 'text', 'team_name'),
            columnObjFormat('활동내용', '', 'text', 'manager_note'),
            columnObjFormat('메모', '', 'text', 'reason_correction'),
            columnObjFormat('활동일', '', 'date', 'date'),
            columnObjFormat('접속아이피', '', 'text', 'ip'),
        ],
        [],
        false,
        false
    ),
    exchange: sidebarObjFormat(
        '출금신청 리스트',
        'exchange',
        [
            columnObjFormat('체크', 5, 'check', 'check'),
            columnObjFormat('지갑아이디', 5, 'text', 'user_id'),
            columnObjFormat('회원명', 5, 'text', 'user_name'),
            columnObjFormat('신청스타', 5, 'exchange_star', 'price'),
            columnObjFormat('신청금(원)', 5, 'exchange_money', 'price'),
            columnObjFormat('환전수수료(스타)', 5, 'exchange_moneycommission', 'price'),
            columnObjFormat('실지급금(원)', '', 'exchange_moneypayment', 'price'),
            columnObjFormat('신청일', '', 'text', 'date'),
            columnObjFormat('입금은행', '', 'text', 'bank_name'),
            columnObjFormat('입금계좌', '', 'text', 'account_number'),
            columnObjFormat('계좌소유자명', '', 'text', 'account_name'),
            columnObjFormat('진행상황', '', 'exchange_status', 'status'),
            columnObjFormat('담당자ID', '', 'text', 'manager_id'),
            // columnObjFormat('담당자이름', '', 'text', 'manager_name'),
            columnObjFormat('진행완료일', '', 'exchange_date', 'exchange_date'),
            columnObjFormat('관리', '', 'exchange_edit', 'exchange_edit'),
        ],
        [`status=`],
        false,
        false,
        '150%'
    ),
    month_settle: sidebarObjFormat(
        '월 정산 리스트',
        'month_settle',
        [
            columnObjFormat('정산일', '', 'date', 'date'),
            columnObjFormat('UID', '', 'text', 'user_id'),
            columnObjFormat('유저명', '', 'text', 'user_name'),
            columnObjFormat('총지급수당스타', '', 'number', 'price'),
            columnObjFormat('관리자명', '', 'text', 'manager_id'),
        ],
        [],
        false,
        false
    ),
    week_settle: sidebarObjFormat(
        '주 정산 리스트',
        'week_settle',
        [
            columnObjFormat('정산일', '', 'date', 'date'),
            columnObjFormat('UID', '', 'text', 'user_id'),
            columnObjFormat('유저명', '', 'text', 'user_name'),
            columnObjFormat('총지급수당스타', '', 'number', 'price'),
            columnObjFormat('상세', '', 'week_settle_detail', 'week_settle_detail'),
            columnObjFormat('관리자명', '', 'text', 'manager_id'),
        ],
        [],
        false,
        false
    ),
    coupon_category: sidebarObjFormat(
        '쿠폰 카테고리 리스트',
        'coupon_category',
        [
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('추가일', '', 'text', 'date'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true
    ),
    coupon_brand: sidebarObjFormat(
        '쿠폰 브랜드 리스트',
        'coupon_brand',
        [
            columnObjFormat('브랜드 이미지', '', 'img', 'img_src'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('추가일', '', 'text', 'date'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true
    ),
    coupon: sidebarObjFormat(
        '쿠폰 상품 리스트',
        'coupon',
        [
            columnObjFormat('상품번호', '', 'text', 'pk'),
            columnObjFormat('카테고리명', '', 'text', 'category_name'),
            columnObjFormat('브랜드명', '', 'text', 'brand_name'),
            columnObjFormat('상품명', '', 'text', 'name'),
            columnObjFormat('매입가', '', 'number', 'price'),
            columnObjFormat('판매가', '', 'number', 'sell_price'),
            columnObjFormat('할인률', '', 'number', 'discount_percent'),
            columnObjFormat('할인금', '', 'number', 'discount_price'),
            columnObjFormat('진열여부', '', 'status', 'status'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true
    ),
    coupon_order: sidebarObjFormat(
        '쿠폰 주문 리스트',
        'coupon_order',
        [
            columnObjFormat('문자발송여부(임시)', '', 'text', 'user_id'),
            columnObjFormat('문자발송일(임시)', '', 'text', 'user_id'),
            columnObjFormat('UID', '', 'text', 'user_id'),
            columnObjFormat('회원명', '', 'text', 'user_id'),
            columnObjFormat('발송휴대폰', '', 'text', 'user_id'),
            columnObjFormat('상품명', '', 'text', 'user_id'),
            columnObjFormat('상품코드', '', 'text', 'user_id'),
            columnObjFormat('판매가', '', 'text', 'user_id'),
            columnObjFormat('사용한 머니', '', 'text', 'user_id'),
            columnObjFormat('사용한 POINT', '', 'text', 'user_id'),
            columnObjFormat('상점거래코드', '', 'text', 'user_id'),
            columnObjFormat('날짜', '', 'text', 'user_id'),
            columnObjFormat('관리', '', 'text', 'user_id'),
        ],
        [],
        false,
        false
    ),
    log_coupon: sidebarObjFormat(
        '예치금 변동 LOG',
        'log_coupon',
        [
            columnObjFormat('아이디', '', 'text', 'user_id'),
            columnObjFormat('ETC', '', 'number', 'etc'),
            columnObjFormat('증감', '', 'increase', 'date'),
            columnObjFormat('금액', '', 'number', 'price'),
            columnObjFormat('메모', '', 'text', 'memo'),
            columnObjFormat('최근활동일', '', 'text', 'date'),
        ],
        [],
        false,
        false
    ),
    auction: sidebarObjFormat(
        '경매 리스트',
        'auction',
        [
            columnObjFormat('타이틀', '', 'text', 'title'),
            columnObjFormat('최소금액', '', 'number', 'min_price'),
            columnObjFormat('최대금액', '', 'number', 'max_price'),
            columnObjFormat('단위', '', 'number', 'price_unit'),
            columnObjFormat('상태', '', 'auction_status', 'auction_status'),
            columnObjFormat('당첨자', '', 'text', 'winner_id'),
            columnObjFormat('당첨금액', '', 'number', 'winner_price'),
            columnObjFormat('등록일', '', 'text', 'date'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true
    ),
    auction_participate: sidebarObjFormat(
        '경매 참여자 리스트',
        'auction_participate',
        [
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('참여스타', '', 'number', 's_t_price'),
            columnObjFormat('참여포인트', '', 'number', 'p_t_price'),
        ],
        [],
        false,
        false
    ),
    jackpot_winner: sidebarObjFormat(
        '행운의 전당 리스트',
        'jackpot_winner',
        [
            columnObjFormat('잭팟타이틀', '', 'text', 'title'),
            columnObjFormat('당첨자아이디', '', 'text', 'user_id'),
            columnObjFormat('당첨자명', '', 'text', 'user_name'),
            columnObjFormat('당첨일', '', 'text', 'date'),
        ],
        [],
        false,
        false
    ),
    outlet_category: sidebarObjFormat(
        '아울렛 카테고리 리스트',
        'outlet_category',
        [
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('추가일', '', 'text', 'date'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true
    ),
    outlet_brand: sidebarObjFormat(
        '아울렛 브랜드 리스트',
        'outlet_brand',
        [
            columnObjFormat('브랜드 이미지', '', 'img', 'img_src'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('추가일', '', 'text', 'date'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true
    ),
    outlet: sidebarObjFormat(
        '아울렛 상품 리스트',
        'outlet',
        [
            columnObjFormat('카테고리명', '', 'text', 'category_name'),
            columnObjFormat('브랜드명', '', 'text', 'brand_name'),
            columnObjFormat('상품명', '', 'text', 'name'),
            columnObjFormat('대표이미지', '', 'img', 'img_src'),
            columnObjFormat('판매가', '', 'text', 'sell_star'),
            columnObjFormat('생성코드', '', 'text', 'generated_code_count'),
            columnObjFormat('판매자아이디', '', 'text', 'sell_user_id'),
            columnObjFormat('판매자수익 %', '', 'text', 'sell_revenue_percent'),
            columnObjFormat('상담링크', '', 'text', 'link'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true
    ),
    outlet_order: sidebarObjFormat(
        '아울렛 상품 주문 리스트',
        'outlet_order',
        [
            columnObjFormat('주문일시', '', 'date', 'date'),
            columnObjFormat('UID', '', 'date', 'user_id'),
            columnObjFormat('주문자(이름)', '', 'outlet_order_name', ''),
            columnObjFormat('상품명', '', 'text', 'item_name'),
            columnObjFormat('상품옵션', '', 'outlet_order_option', ''),
            columnObjFormat('상품수량', '', 'outlet_order_count', ''),
            columnObjFormat('사용스타', '', 'minus_number', 'price'),
            columnObjFormat('사용포인트', '', 'minus_number', 'point_price'),
            columnObjFormat('수신자명(연락처)', '', 'outlet_order_phone', ''),
            columnObjFormat('배송지주소우편번호주소(참고항목)상세주소', '', 'outlet_order_address', ''),
            columnObjFormat('주문자 요청사항', '', 'outlet_order_request', ''),
            columnObjFormat('판매자(이름)(연락처)', '', 'outlet_order_sell_user', ''),
            columnObjFormat('판매자지급금', '', 'outlet_order_sell_user_price', ''),
            columnObjFormat('주문상태', '', 'outlet_order_status', ''),
            columnObjFormat('송장', '', 'outlet_order_invoice', ''),
            columnObjFormat('반송사유', '', 'outlet_order_return_reason', ''),
            columnObjFormat('진행완료일', '', 'outlet_order_date', ''),
            columnObjFormat('관리', '', 'outlet_order_edit', ''),
        ],
        [`status=`],
        false,
        false,
        '200%'
    ),
}

export const editColumnObjFormat = (type, title, option, class_name, column, explain, is_add_essential, is_update_essential) => {
    return {
        type: type, //타입 -> input, select, editor, img
        title: title,//제목
        option: option,//옵션
        class_name: class_name,//클래스네임
        column: column,//컬럼
        explain: explain,//설명
        is_add_essential: is_add_essential,//추가에서 필수인지
        is_update_essential: is_update_essential// 수정에서 필수인지
    }
}
export const inputOption = (placeholder, type) => {

}
export const selectOption = () => {

}
export const imgOption = () => {

}
export const editorOption = () => {

}
export const objManagerEditContent = {
    coupon_category: {
        breadcrumb: "쿠폰 카테고리",
        list: [
            [
                editColumnObjFormat('input', '이름', {}, 'name', 'name', '', true, true)
            ]
        ]
    },
    coupon_brand: {
        breadcrumb: "쿠폰 브랜드",
        list: [
            [
                editColumnObjFormat('input', '이름', {}, 'name', 'name', '', true, true)
            ],
            [
                editColumnObjFormat('img', '이미지', {}, 'coupon', 'coupon', '', true, true),
            ]
        ]
    },
    coupon: {
        breadcrumb: "쿠폰",
        list: [
            [
                editColumnObjFormat('select', '카테고리', {}, 'category', 'category_pk', '', true, true),
                editColumnObjFormat('select', '브랜드', {}, 'brand', 'brand_pk', '', true, true)
            ],
            [
                editColumnObjFormat('input', '상품명', {}, 'category', 'category_pk', '', true, true),
            ],
        ]
    },
    outlet_category: {
        breadcrumb: "",
        list: [
        ]
    },
    outlet_brand: {
        breadcrumb: "",
        list: [
        ]
    },
    outlet: {
        breadcrumb: "",
        list: [
        ]
    },
}
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
export const managerNoteObj = {
    DAILY_PAYMENT_PROBABILITY: "데일리 지급 확률이 수정 되었습니다.",
    ADD_USER: "회원이 추가 되었습니다.",
    UPDATE_USER: "회원 정보가 수정 되었습니다.",
    UPDATE_USER_MONEY: "회원 머니가 수정 되었습니다.",
    ADD_MAIN_BANNER: "메인 배너가 추가 되었습니다.",
    UPDATE_MAIN_BANNER: "메인 배너가 수정 되었습니다.",
    ADD_NOTICE: "공지가 추가 되었습니다.",
    UPDATE_NOTICE: "공지가 수정 되었습니다.",
    ADD_MARKETING: "매출이 추가 되었습니다.",
    UPDATE_MARKETING: "매출이 수정 되었습니다.",
    ADD_COUPON_CATEGORY: "쿠폰 카테고리가 추가 되었습니다.",
    UPDATE_COUPON_CATEGORY: "쿠폰 카테고리가 수정 되었습니다.",
    ADD_COUPON_BRAND: "쿠폰 브랜드가 추가 되었습니다.",
    UPDATE_COUPON_BRAND: "쿠폰 브랜드가 수정 되었습니다.",
    ADD_COUPON: "쿠폰 상품이 추가 되었습니다.",
    UPDATE_COUPON: "쿠폰 상품이 수정 되었습니다.",
    ADD_OUTLET_CATEGORY: "아울렛 카테고리가 추가 되었습니다.",
    UPDATE_OUTLET_CATEGORY: "아울렛 카테고리가 수정 되었습니다.",
    ADD_OUTLET_BRAND: "아울렛 브랜드가 추가 되었습니다.",
    UPDATE_OUTLET_BRAND: "아울렛 브랜드가 수정 되었습니다.",
    ADD_OUTLET: "아울렛 상품이 추가 되었습니다.",
    UPDATE_OUTLET: "아울렛 상품이 수정 되었습니다.",
    ADD_AUCTION: "경매 이벤트가 추가 되었습니다.",
    UPDATE_AUCTION: "경매 이벤트가 수정 되었습니다.",
}
export { backUrl };