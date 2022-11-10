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
export const sidebarObjFormat = (breadcrumb, schema, zColumn, queries, is_edit, is_move) =>{
    return {
        breadcrumb:breadcrumb,
        schema:schema,
        zColumn:zColumn,
        queries:queries,
        is_edit:is_edit,
        is_move:is_move,
    }
}