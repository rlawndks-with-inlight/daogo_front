import { AiTwotoneSetting } from 'react-icons/ai'

export const columnObjFormat = (name, width, type, column) => {
    return {
        name: name,
        width: width,
        type: type,
        column: column,
    }
}

export const sidebarContentFormat = (main_title, list) => {
    return {
        main_title: main_title,
        main_icon: <AiTwotoneSetting />,
        list: list
    }
}
export const sidebarObjListFormat = (name, link, level, allow_list) => {
    return {
        name: name,
        link: link,
        level: level,
        allow_list: allow_list,
    }
}
export const sidebarObjFormat = (breadcrumb, schema, zColumn, queries, is_edit, is_move) => {
    return {
        breadcrumb: breadcrumb,
        schema: schema,
        zColumn: zColumn,
        queries: queries,
        is_edit: is_edit,
        is_move: is_move,
    }
}
export const editContentFormat = (columns) =>{
    return {
        columns:columns
    }
}
export const editColumnObjFormat = (title, type, name, column, is_essential, explain, input_option, select_option) => {
    return {
        title: title,//제목
        type: type,//타입 -> input, select, editor, img
        name: name,//클래스네임
        column: column,//컬럼이름
        is_essential: is_essential,// 필수인지
        explain: explain,// 설명여부

        input_option:input_option,
        select_option: select_option, //type이 option일때
    }
}
export const inputOption = () =>{
    return {
        
    }
}
