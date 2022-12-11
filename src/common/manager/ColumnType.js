import { commarNumber, dateFormat, getTierByUserTier, numberToCategory } from "../../functions/utils";
import { getTextByLogType } from "./DataTr";

export const returnColumn = (data_, type_, column_, schema) => {
    let data = { ...data_ };
    let type = type_;
    let column = column_;
    data['explain_obj'] = JSON.parse(data['explain_obj'] ?? "{}");
    let result = "---";
    if (type == 'text') {
        result = data[`${column}`] ?? "---";
    } else if (type == 'number') {
        result = commarNumber(data[`${column}`] ?? 0);
    } else if (type == 'minus_number') {
        result = commarNumber((data[`${column}`] ?? 0) * (-1));
    } else if (type == 'date') {
        result = dateFormat(data[`${column}`]);
    } else if (type == 'abs') {
        result = commarNumber(Math.abs(data[`${column}`]));
    } else if (type == 'link') {
        result = data[`${column}`];
    } else if (type == 'marketing_tier') {
        if (data['explain_obj']?.tier) {
            result = getTierByUserTier(data['explain_obj']?.tier);
        } else {
            result = "---";
        }
    } else if (type == 'login_type') {
        if (data[`${column}`] == 0) {
            result = "일반";
        } else if (data[`${column}`] == 1) {
            result = "카카오";
        } else if (data[`${column}`] == 2) {
            result = "네이버";
        } else if (data[`${column}`] == 3) {
            result = "애플";
        }
    } else if (type == 'level') {
        if (data[`${column}`] == 0) {
            result = "일반유저";
        } else if (data[`${column}`] == 40) {
            result = "관리자";
        } else if (data[`${column}`] == 50) {
            result = "개발자";
        }
    } else if (type == 'tier') {
        result = getTierByUserTier(data[`${column}`]);
    } else if (type == 'img') {
        result = data[`${column}`];
    } else if (type == 'top') {
        result = "맨위로";
    } else if (type == 'target') {
        if (data[`${column}`] == 0) {
            result = "현재창";
        } else if (data[`${column}`] == 1) {
            result = "새창";
        }
    } else if (type == 'status') {
        if (data[`${column}`] > 0) {
            result = "on";
        } else {
            result = "off";
        }
    } else if (type == 'type_note') {
        result = getTextByLogType(data, schema);
    } else if (type == 'alarm_type') {
        if (data[`${column}`] == 1) {
            result = "스케줄링";
        } else {
            result = "즉시실행";
        }
    } else if (type == 'category_type') {
        result = numberToCategory(data[`${column}`]?.name)
    } else if (type == '---') {
        result = "---";
    } else if (type == 'increase') {
        result = data[`${column}`] > 0 ? "+" : "-";
    } else if (type == 'edit') {
        result = "---";
    } else if (type == 'user_money_edit') {
        result = "---";
    } else if (type == 'user_marketing') {
        result = "---";
    } else if (type.includes('exchange')) {
        if (type.split('_')[1] == 'star') {
            if (data[`explain_obj`]?.star) {
                result = commarNumber(data[`explain_obj`]?.star);
            } else {
                result = "---";
            }
        } else if (type.split('_')[1] == 'money') {
            if (data[`explain_obj`]?.star) {
                result = commarNumber(data[`explain_obj`]?.star * 100);
            } else {
                result = "---";
            }
        } else if (type.split('_')[1] == 'moneycommission') {
            if (data[`explain_obj`]?.star) {
                result = commarNumber(data[`explain_obj`]?.star * data[`explain_obj`]?.withdraw_commission_percent / 100);
            } else {
                result = "---";
            }
        } else if (type.split('_')[1] == 'moneypayment') {
            if (data[`explain_obj`]?.star) {
                result = commarNumber(data[`explain_obj`]?.star * 100);
            } else {
                result = "---";
            }
        } else if (type.split('_')[1] == 'date') {
            if (data[`explain_obj`]?.date) {
                result = data['explain_obj']?.date;
            } else {
                result = "---";
            }
        } else if (type.split('_')[1] == 'edit') {
            result = "---";
        }
    } else if (type.includes('outlet_order')) {
        if (type.split('order_')[1] == 'name') {
            result = `${data['user_id']}(${data['user_name']})`;
        } else if (type.split('order_')[1] == 'point') {
            result = commarNumber(data['explain_obj']?.point ?? 0);
        } else if (type.split('order_')[1] == 'phone') {
            result = `${data['explain_obj']?.name ?? "---"}${data['explain_obj']?.phone ?? "---"}`;
        } else if (type.split('order_')[1] == 'address') {
            result = `${data['explain_obj']?.address ?? ""} ${data['explain_obj']?.address_detail ?? ""}(${data['explain_obj']?.refer ?? ""})`;
        } else if (type.split('order_')[1] == 'request') {
            result = data['explain_obj']?.request ?? ""
        } else if (type.split('order_')[1] == 'refer') {
            result = commarNumber(data[`${column}`] * (-1))
        } else if (type.split('order_')[1] == 'sell_user') {
            result = `${data['sell_user_id']}(${data['sell_user_name']})(${data['sell_user_phone']})`;
        } else if (type.split('order_')[1] == 'sell_user_price') {
            result = commarNumber(data['sell_revenue_percent'] / 100 * data['item_price']);
        } else if (type.split('order_')[1] == 'status') {
            if (data['explain_obj']?.status == -1) {
                result = "반품처리";
            } else if (data['explain_obj']?.status == 0) {
                result = "확인대기";
            } else if (data['explain_obj']?.status == 1) {
                result = "주문확인";
            } else if (data['explain_obj']?.status == 2) {
                result = "배달완료";
            }
        } else if (type.split('order_')[1] == 'date') {
            if (data[`explain_obj`]?.date) {
                result = data['explain_obj']?.date;
            } else {
                result = "---";
            }
        } else if (type.split('order_')[1] == 'invoice') {
            result = data['explain_obj']?.invoice ?? "---";
        } else if (type.split('order_')[1] == 'return_reason') {
            result = data['explain_obj']?.return_reason ?? "---";
        } else if (type.split('order_')[1] == 'edit') {
            result = "---";
        }
    }
    return result;
}