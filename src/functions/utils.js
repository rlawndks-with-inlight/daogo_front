import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { returnColumn } from '../common/manager/ColumnType';
import LoadingText from '../components/LoadingText';
import theme from '../styles/theme';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
// 웹뷰에서 RN으로 데이터를 보낼때 사용합니다.
export function sendToRN(num) {
    if (window.ReactNativeWebView) {
        // RN에서 데이터는 반드시 문자열로 받을 수 있기 때문에 
        // JSON.stringify를 사용합니다.
        window.ReactNativeWebView.postMessage(
            JSON.stringify({ data: num })
        );
    } else {
        // -- 
    }
};
export function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
export function range(start, end) {
    let array = [];
    for (let i = start; i <= end; ++i) {
        array.push(i);
    }
    return array;
}
export const addItem = async (type, obj) => {
    const { data: response } = await axios.post(`/api/add${type}`, obj)
    alert(response.message);
    if (response.result > 0) {
        window.history.back();
    }
}
export const updateItem = async (type, obj) => {
    const { data: response } = await axios.post(`/api/update${type}`, obj)
    alert(response.message);
    if (response.result > 0) {
        window.history.back();
    }
}
export const deleteItem = async (type, obj) => {

}
export const commarNumber = (num) => {
    if (!num && num != 0) {
        return undefined;
    }
    let str = "";
    if (typeof num == "string") {
        str = num;
    } else {
        str = num.toString();
    }
    let decimal = "";
    if (str.includes(".")) {
        decimal = "." + str.split(".")[1].substring(0, 2);
        str = str.split(".")[0];
    } else {
        decimal = "";
    }
    if (str?.length <= 3) {
        return str + decimal;
    }
    let result = "";
    let count = 0;
    for (var i = str?.length - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0 && !isNaN(parseInt(str[i]))) result = "," + result;
        result = str[i] + result;
        count++;
    }
    return result + decimal;
}
export const formatPhoneNumber = (input) => {
    const cleanInput = String(input).replaceAll(/[^0-9]/g, "");
    let result = "";
    const length = cleanInput.length;
    if (length === 8) {
        result = cleanInput.replace(/(\d{4})(\d{4})/, '$1-$2');
    } else if (cleanInput.startsWith("02") && (length === 9 || length === 10)) {
        result = cleanInput.replace(/(\d{2})(\d{3,4})(\d{4})/, '$1-$2-$3');
    } else if (!cleanInput.startsWith("02") && (length === 10 || length === 11)) {
        result = cleanInput.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
    } else {
        result = undefined;
    }
    return result;
}
export const returnMoment = (num, type) => {//num 0: 오늘, num -1: 어제 ,  type=date 날짜만, type=moment 시간까지 다 나오게
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month + '-' + day;
    var hours = ('0' + today.getHours()).slice(-2);
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);
    var timeString = hours + ':' + minutes + ':' + seconds;
    let moment = dateString + ' ' + timeString;
    return moment;
}
export const getIframeLinkByLink = (str) => {
    let ans = "";
    for (var i = 0; i < str.length; i++) {
        if (str[i] == 'v' && str[i + 1] == '=') {
            for (var j = i + 2; j < str.length; j++) {
                if (str[j] == '&') break;
                ans += str[j];
            }
        }
    }

    return ans;
}
export const categoryToNumber = (str) => {
    if (str == 'oneword') {
        return 0;
    } else if (str == 'oneevent') {
        return 1;
    } else if (str == 'theme') {
        return 2;
    } else if (str == 'strategy') {
        return 3;
    } else if (str == 'issue') {
        return 4;
    } else if (str == 'feature') {
        return 5;
    } else if (str == 'video') {
        return 6;
    } else if (str == 'notice') {
        return 7;
    } else {
        return -1;
    }
}
export const numberToCategory = (num) => {
    if (num == 0) {
        return { schema: 'oneword', name: '하루1단어' };
    } else if (num == 1) {
        return { schema: 'oneevent', name: '하루1종목' };
    } else if (num == 2) {
        return { schema: 'theme', name: '핵심테마' };
    } else if (num == 3) {
        return { schema: 'strategy', name: '전문가칼럼' };
    } else if (num == 4) {
        return { schema: 'issue', name: '핵심이슈' };
    } else if (num == 5) {
        return { schema: 'feature', name: '특징주' };
    } else if (num == 6) {
        return { schema: 'video', name: '핵심비디오' };
    } else if (num == 7) {
        return { schema: 'notice', name: '공지사항' };
    } else {
        return { schema: '---', name: '---' };
    }
}

export const regExp = (type, str) => {//id,pw,nickname,name
    let reg = undefined;
    if (type == 'id') {
        reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,12}$/;
    } else if (type == 'pw') {
        reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;
    } else if (type == 'name') {
        reg = /^[가-힣]{2,5}$/;
    } else if (type == 'nickname') {
        reg = /^[가-힣|a-z|A-Z|0-9|]{2,8}$/;
    } else {
        return false;
    }
    return reg.test(str)
}
export const getViewerMarginByNumber = (num) => {
    if (num == 0) {
        return " 0 auto ";
    } else if (num == 1) {
        return " 0 auto 0 0 ";

    } else if (num == 2) {
        return " 0 0 0 auto ";
    } else {
        return " 0 auto ";
    }
}
export const getSelectButtonColor = (bool) => {
    if (bool) {
        return {
            background: theme.color.background1,
            color: "#fff"
        }
    } else {
        return {
            background: "#fff",
            color: theme.color.background1
        }
    }
}
export const makeManagerNote = (key) => {
}
export const getTierByUserTier = (num, id) => {
    if (num == 0) {
        return "일반유저";

    } else if (num == 5) {
        return "화이트";

    } else if (num == 10) {
        return "그린";

    } else if (num == 15) {
        return "실버";

    } else if (num == 20) {
        return "골드";

    } else if (num == 25) {
        return "플레티넘";

    } else {
        return "잘못된 레벨";
    }
}
export const getScoreByUserTier = (num, id) => {
    if (num == 0) {
        return 0;

    } else if (num == 5) {
        return 36;

    } else if (num == 10) {
        return 120;

    } else if (num == 15) {
        return 360;

    } else if (num == 20) {
        return 600;

    } else if (num == 25) {
        return 1200;

    } else {
        return 0;
    }
}
export const dateFormat = (date, is_minus) => {//두날짜의 시간차
    if (!date) {
        return "---";
    }
    let f_d = new Date(returnMoment()).getTime();
    let s_d = new Date(date).getTime();
    let hour = (f_d - s_d) / (1000 * 3600);
    let minute = (f_d - s_d) / (1000 * 60);
    let day = (f_d - s_d) / (1000 * 3600 * 24);
    if (minute <= 1) {
        return "방금 전";
    } else if (hour < 1) {
        if (is_minus) {
            return `${parseInt(minute)}분`;
        } else {
            return `${parseInt(minute)}분 전`;
        }
    } else if (hour < 24) {
        if (is_minus) {
            return `${parseInt(hour)}시간`;
        } else {
            return `${parseInt(hour)}시간 전`;
        }
    } else if (day < 7) {
        if (is_minus) {
            return `${parseInt(day)} Days`;
        } else {
            return `${parseInt(day)}일 전`;
        }
    } else {
        if (is_minus) {
            return `${parseInt(day)} Days`;
        } else {
            return date.substring(0, 10);
        }
    }
}
export const getIntroducePercentByUserTier = (tier, is_use_point, point_percent) => {
    let introduce_percent_list = [0, 6, 7, 8, 9, 10];
    if (is_use_point == 0) {
        return 0;
    } else if (is_use_point == 1) {
        return point_percent;
    } else if (is_use_point == 2 || !is_use_point) {
        return introduce_percent_list[tier / 5];
    } else {
        return 0;
    }

}
export const makeMaxPage = (num, page_cut) => {
    if (num % page_cut == 0) {
        return num / page_cut;
    } else {
        return parseInt(num / page_cut) + 1;
    }
}
export const getDiscountPoint = (item_price, is_use_point, point_percent, tier) => {
    let introduce_percent_list = [0, 6, 7, 8, 9, 10];
    if (is_use_point == 0) {
        return 0;
    } else if (is_use_point == 1) {
        return point_percent;
    } else if (is_use_point == 2) {
        return item_price * (introduce_percent_list[tier / 5] / 100);
    } else {
        return 0;
    }
}
export const getRollUpBonusByUserTier = (num) => {
    let introduce_percent_list = [0, 0.5, 1, 1.5, 2, 2.5];
    if (!(num >= 0 && num <= 25)) {
        return "---";
    } else {
        return introduce_percent_list[num / 5];
    }
}
export const discountOutlet = (price, tier) => {
    let discount_percent_list = [5, 6, 7, 8, 9, 10];
    let result = parseFloat(price);
    result = result * (discount_percent_list[tier / 5] / 100);
    return result;
}
export const discountOutletList = (tier) => {
    let discount_percent_list = [5, 6, 7, 8, 9, 10];
    return discount_percent_list[tier / 5];
}
export const untilReady = () => {
    alert("준비중입니다.");
    window.history.back();
}

export const excelDownload = async (excelData, objManagerListContent, schema) => {
    const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const excelFileExtension = '.xlsx';
    const excelFileName = schema;
    let ignore_name_list = ['맨위로', '수정', '삭제', '관리'];
    let name_list = [];
    let column_list = [];
    for (var i = 0; i < objManagerListContent[schema].zColumn.length; i++) {
        if (!ignore_name_list.includes(objManagerListContent[schema].zColumn[i].name)) {
            name_list.push(objManagerListContent[schema].zColumn[i].name)
            column_list.push(objManagerListContent[schema].zColumn[i])
        }
    }
    const ws = XLSX.utils.aoa_to_sheet([
        ['daogo - 다오고']
        , []
        , name_list
    ]);

    let result = [...excelData];
    let excel_list = [];
    for (var i = 0; i < result.length; i++) {
        excel_list[i] = [];
        for (var j = 0; j < column_list.length; j++) {
            let data = await returnColumn(result[i], column_list[j]?.type, column_list[j]?.column, objManagerListContent[schema].schema);;
            await excel_list[i].push(data);
        }
    }
    await excel_list.map(async (data, idx) => {
        XLSX.utils.sheet_add_aoa(
            ws,
            [
                data
            ],
            { origin: -1 }
        );
        ws['!cols'] = [
            { wpx: 50 },
            { wpx: 50 }
        ]
        return false;
    });
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const excelFile = new Blob([excelButter], { type: excelFileType });
    FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
}