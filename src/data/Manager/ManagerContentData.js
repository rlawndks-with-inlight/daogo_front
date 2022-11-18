import { logoSrc, backUrl } from "../ContentData";
import { EditorState } from "draft-js"
import { columnObjFormat, editColumnObjFormat, editContentFormat, sidebarContentFormat, sidebarObjFormat, sidebarObjListFormat } from "./ManagerContentFormat";

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
        sidebarObjListFormat('데일리지급확률', '/manager/edit/daily_payment_probability', 40, ['/manager/edit/daily_payment_probability']),//edit
        sidebarObjListFormat('데일리수동지급', '/manager/daily_manual_payment', 40, ['/manager/daily_manual_payment'])
    ]),
    sidebarContentFormat('회원관리', [
        sidebarObjListFormat('회원리스트', '/manager/list/user', 40, ['/manager/list/user']),//list
        sidebarObjListFormat('회원조직도(레벨별)', '/manager/user_organization_chart', 40, ['/manager/user_organization_chart']),
    ]),
    sidebarContentFormat('매출관리', [
        sidebarObjListFormat('수당지급리스트', '/manager/list/extra_pay', 40, ['/manager/list/extra_pay']),//list
        sidebarObjListFormat('스타 변동 LOG', '/manager/list/log_star', 40, ['/manager/list/log_star']),//list
        sidebarObjListFormat('포인트 변동 LOG', '/manager/list/log_point', 40, ['/manager/list/log_point']),//list
        sidebarObjListFormat('랜덤박스 변동 LOG', '/manager/list/log_randombox', 40, ['/manager/list/log_randombox']),//list
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
        sidebarObjListFormat('마케팅등록예약', '#', 40, ['#']),
        sidebarObjListFormat('마케팅예약리스트', '#', 40, ['#']),//list ?
        sidebarObjListFormat('수당신청리스트', '#', 40, ['#']),//list
    ]),
    sidebarContentFormat('결산관리', [
        sidebarObjListFormat('월결산리스트', '/manager/list/month_settle', 40, ['/manager/list/month_settle']),//list ?
    ]),
    sidebarContentFormat('쿠폰이벤트관리', [
        sidebarObjListFormat('카테고리리스트', '/manager/list/coupon_category', 40, ['/manager/list/coupon_category']),//list
        sidebarObjListFormat('상품리스트', '/manager/list/coupon', 40, ['/manager/list/coupon']),//list
        sidebarObjListFormat('주문리스트', '/manager/list/coupon_order', 40, ['/manager/list/coupon_order']),//list
        sidebarObjListFormat('예치금 변동 LOG', '/manager/list/log_coupon', 40, ['/manager/list/log_coupon']),//list
    ]),
    sidebarContentFormat('잭팟관리', [
        sidebarObjListFormat('추첨대기자', '/manager/list/jackpot_wait', 40, ['/manager/list/jackpot_wait']),//list
        sidebarObjListFormat('행운의전당', '/manager/list/jackpot_winner', 40, ['/manager/list/jackpot_winner']),//list
    ]),
    sidebarContentFormat('아울렛관리', [
        sidebarObjListFormat('상품리스트', '/manager/list/product', 40, ['/manager/list/product']),//list
        sidebarObjListFormat('주문리스트', '/manager/list/product_order', 40, ['/manager/list/product_order']),//list
    ]),
];

export const objManagerListContent = {
    user: sidebarObjFormat(
        '회원 리스트',
        'user',
        [
            columnObjFormat('로그인타입', 11, 'login_type', 'type'),
            columnObjFormat('아이디', 11, 'text', 'id'),
            columnObjFormat('닉네임', 11, 'text', 'nickname'),
            columnObjFormat('이름', 11, 'text', 'name'),
            columnObjFormat('폰번호', 11, 'text', 'phone'),
            columnObjFormat('레벨', 11, 'level', 'user_level'),
            columnObjFormat('로그인시간', 22, 'text', 'last_login'),
            columnObjFormat('수정', 11, 'edit', 'edit'),
        ],
        [],
        true,
        true),

    extra_pay: sidebarObjFormat(
        '수당지급 리스트',
        'extra_pay',
        [
            columnObjFormat('타이틀', 20, 'text', 'user_id'),
            columnObjFormat('메모', 20, 'text', 'user_name'),
            columnObjFormat('지급타입', 20, 'text', 'date'),
            columnObjFormat('지급내용', 20, 'text', 'ip'),
            columnObjFormat('지급일', 20, 'text', 'ip'),
        ],
        [],
        false,
        false
    ),
    log_star: sidebarObjFormat(
        '스타 변동 LOG',
        'log_star',
        [
            columnObjFormat('아이디', 15, 'text', 'user_id'),
            columnObjFormat('회원명', 15, 'text', 'user_name'),
            columnObjFormat('증감', 10, 'text', 'date'),
            columnObjFormat('금액', 20, 'text', 'ip'),
            columnObjFormat('메모', 20, 'text', 'ip'),
            columnObjFormat('등록일', 20, 'text', 'ip'),
        ],
        [],
        false,
        false
    ),
    log_point: sidebarObjFormat(
        '포인트 변동 LOG',
        'log_point',
        [
            columnObjFormat('타이틀', 20, 'text', 'user_id'),
            columnObjFormat('메모', 20, 'text', 'user_name'),
            columnObjFormat('지급타입', 20, 'text', 'date'),
            columnObjFormat('지급내용', 20, 'text', 'ip'),
            columnObjFormat('지급일', 20, 'text', 'ip'),
        ],
        [],
        false,
        false
    ),
    log_randombox: sidebarObjFormat(
        '랜덤박스 변동 LOG',
        'log_randombox',
        [
            columnObjFormat('타이틀', 20, 'text', 'user_id'),
            columnObjFormat('메모', 20, 'text', 'user_name'),
            columnObjFormat('지급타입', 20, 'text', 'date'),
            columnObjFormat('지급내용', 20, 'text', 'ip'),
            columnObjFormat('지급일', 20, 'text', 'ip'),
        ],
        [],
        false,
        false
    ),
    main_banner: sidebarObjFormat(
        '메인 배너 리스트',
        'main_banner',
        [
            columnObjFormat('베너이미지', 20, 'img', 'img_src'),
            columnObjFormat('베너링크', 20, 'text', 'link'),
            columnObjFormat('타겟설정', 20, 'target', 'target'),
            columnObjFormat('노출여부', 20, 'status', 'status'),
            columnObjFormat('수정', 10, 'edit', 'edit'),
            columnObjFormat('삭제', 10, 'delete', 'delete'),
        ],
        [],
        true,
        true
    ),
    notice: sidebarObjFormat(
        '공지사항 리스트',
        'notice',
        [
            columnObjFormat('타이틀', 20, 'text', 'title'),
            columnObjFormat('지급일', 20, 'text', 'date'),
            columnObjFormat('노출여부', 10, 'status', 'status'),
            columnObjFormat('팝업여부', 10, 'status', 'is_popup'),
            columnObjFormat('수정', 10, 'edit', 'edit'),
            columnObjFormat('삭제', 10, 'delete', 'delete'),
        ],
        [],
        true,
        true
    ),
    log_user: sidebarObjFormat(
        '회원 접속 LOG',
        'log_login',
        [
            columnObjFormat('UID', 22, 'text', 'user_id'),
            columnObjFormat('이름', 22, 'text', 'user_name'),
            columnObjFormat('최근접속일', 28, 'text', 'date'),
            columnObjFormat('접속아이피', 28, 'text', 'ip'),
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
            columnObjFormat('UID', 22, 'text', 'user_id'),
            columnObjFormat('이름', 22, 'text', 'user_name'),
            columnObjFormat('최근접속일', 28, 'text', 'date'),
            columnObjFormat('접속아이피', 28, 'text', 'ip'),
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
            columnObjFormat('UID', 22, 'text', 'user_id'),
            columnObjFormat('이름', 22, 'text', 'user_name'),
            columnObjFormat('최근접속일', 28, 'text', 'date'),
            columnObjFormat('접속아이피', 28, 'text', 'ip'),
        ],
        [],
        false,
        false
    ),
    month_settle: sidebarObjFormat(
        '월 결산 리스트',
        'month_settle',
        [
            columnObjFormat('타이틀', 20, 'text', 'user_id'),
            columnObjFormat('메모', 20, 'text', 'user_name'),
            columnObjFormat('지급타입', 20, 'text', 'date'),
            columnObjFormat('지급내용', 20, 'text', 'ip'),
            columnObjFormat('지급일', 20, 'text', 'ip'),
        ],
        [],
        false,
        false
    ),
    coupon_category: sidebarObjFormat(
        '쿠폰 카테고리 리스트',
        'coupon',
        [
            columnObjFormat('이름', 50, 'text', 'name'),
            columnObjFormat('추가일', 50, 'text', 'date'),
        ],
        [],
        true,
        true
    ),
    coupon: sidebarObjFormat(
        '쿠폰 상품 리스트',
        'coupon',
        [
            columnObjFormat('타이틀', 20, 'text', 'user_id'),
            columnObjFormat('메모', 20, 'text', 'user_name'),
            columnObjFormat('지급타입', 20, 'text', 'date'),
            columnObjFormat('지급내용', 20, 'text', 'ip'),
            columnObjFormat('지급일', 20, 'text', 'ip'),
        ],
        [],
        true,
        true
    ),
    coupon_order: sidebarObjFormat(
        '쿠폰 주문 리스트',
        'coupon_order',
        [
            columnObjFormat('타이틀', 20, 'text', 'user_id'),
            columnObjFormat('메모', 20, 'text', 'user_name'),
            columnObjFormat('지급타입', 20, 'text', 'date'),
            columnObjFormat('지급내용', 20, 'text', 'ip'),
            columnObjFormat('지급일', 20, 'text', 'ip'),
        ],
        [],
        false,
        false
    ),
    log_coupon: sidebarObjFormat(
        '예치금 변동 LOG',
        'log_coupon',
        [
            columnObjFormat('타이틀', 20, 'text', 'user_id'),
            columnObjFormat('메모', 20, 'text', 'user_name'),
            columnObjFormat('지급타입', 20, 'text', 'date'),
            columnObjFormat('지급내용', 20, 'text', 'ip'),
            columnObjFormat('지급일', 20, 'text', 'ip'),
        ],
        [],
        false,
        false
    ),
    jackpot_wait: sidebarObjFormat(
        '추첨 대기자 리스트',
        'jackpot_wait',
        [
            columnObjFormat('타이틀', 20, 'text', 'user_id'),
            columnObjFormat('메모', 20, 'text', 'user_name'),
            columnObjFormat('지급타입', 20, 'text', 'date'),
            columnObjFormat('지급내용', 20, 'text', 'ip'),
            columnObjFormat('지급일', 20, 'text', 'ip'),
        ],
        [],
        false,
        false
    ),
    jackpot_winner: sidebarObjFormat(
        '행운의 전당 리스트',
        'jackpot_winner',
        [
            columnObjFormat('타이틀', 20, 'text', 'user_id'),
            columnObjFormat('메모', 20, 'text', 'user_name'),
            columnObjFormat('지급타입', 20, 'text', 'date'),
            columnObjFormat('지급내용', 20, 'text', 'ip'),
            columnObjFormat('지급일', 20, 'text', 'ip'),
        ],
        [],
        false,
        false
    ),
    product: sidebarObjFormat(
        '아울렛 상품 리스트',
        'product',
        [
            columnObjFormat('타이틀', 20, 'text', 'user_id'),
            columnObjFormat('메모', 20, 'text', 'user_name'),
            columnObjFormat('지급타입', 20, 'text', 'date'),
            columnObjFormat('지급내용', 20, 'text', 'ip'),
            columnObjFormat('지급일', 20, 'text', 'ip'),
        ],
        [],
        false,
        false
    ),
    product_order: sidebarObjFormat(
        '아울렛 상품 주문 리스트',
        'product_order',
        [
            columnObjFormat('타이틀', 20, 'text', 'user_id'),
            columnObjFormat('메모', 20, 'text', 'user_name'),
            columnObjFormat('지급타입', 20, 'text', 'date'),
            columnObjFormat('지급내용', 20, 'text', 'ip'),
            columnObjFormat('지급일', 20, 'text', 'ip'),
        ],
        [],
        false,
        false
    ),
}
export const objManagerEditContent = {
    user:editContentFormat(
        [
            [
                editColumnObjFormat("아이디","input","id","id",true,true,"아이디를 입력해주세요.",""),
                editColumnObjFormat("비밀번호","input","pw","pw",true,false,"****",""),
                editColumnObjFormat("이름","input","name","name",true,true,"이름을 입력해 주세요.",""),

            ],
            [
                editColumnObjFormat("아이디","input","id","id",true,"아이디를 입력해주세요.",""),
                editColumnObjFormat("아이디","input","id","id",true,"아이디를 입력해주세요.",""),
                editColumnObjFormat("아이디","input","id","id",true,"아이디를 입력해주세요.",""),

            ],
            [
                editColumnObjFormat("아이디","input","id","id",true,"아이디를 입력해주세요.",""),

            ],
        ]
    )
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
export { backUrl };