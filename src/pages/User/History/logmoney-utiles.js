import { useEffect } from "react";
import { useState } from "react";
import { commarNumber } from "../../../functions/utils";
import theme from "../../../styles/theme";

export const ReturnNumberFormat = (is_sign, price_, default_color) => {
    let is_minus = false;
    let price = parseFloat(price_);
    if (price < 0) {
        is_minus = true;
    }
    price = Math.abs(price);
    let n_number = parseInt(price);
    n_number = commarNumber(n_number);
    let p_number = ((price * 100) % 100).toFixed(0);
    if (p_number == 0) {
        p_number = '00';
    } else if (p_number < 10) {
        p_number = `0${p_number}`;
    } else {
        p_number = `${p_number}`;
    }
    if (is_sign) {
        if (!is_minus) {
            return (
                <>
                    <div style={{ display: 'flex' }}>
                        <div style={{ color: '#fc427b',fontSize:theme.size.font3,fontWeight:'bold' }}>+{n_number}</div>
                        <div>.</div>
                        <div>{p_number}</div>
                    </div>
                </>
            )
        } else if (is_minus) {
            return (
                <>
                    <div style={{ display: 'flex' }}>
                        <div style={{ color: '#00d2d3',fontSize:theme.size.font3,fontWeight:'bold' }}>-{n_number}</div>
                        <div>.</div>
                        <div>{p_number}</div>
                    </div>
                </>
            )
        }
    } else {
        return (
            <>
                <div style={{ display: 'flex' }}>
                    <div style={{ color: `${default_color ? default_color : theme.color.font1}`,fontSize:theme.size.font3,fontWeight:'bold' }}>{n_number}</div>
                    <div>.</div>
                    <div style={{ color: theme.color.font3 }}>{p_number}</div>
                </div>
            </>
        )
    }
}
export const ItemComponent = (props) => {
    let { schema, data } = props;
    return (
        <>
            {schema == 'apply' ?
                <>
                    {ApplyFormat(data)}
                </>
                :
                <>
                </>}
            {schema == 'star' ?
                <>
                    {StarFormat(data)}
                </>
                :
                <>
                </>}
            {schema == 'point' ?
                <>
                    {PointFormat(data)}
                </>
                :
                <>
                </>}
            {schema == 'randombox' ?
                <>
                    {RandomboxFormat(data)}
                </>
                :
                <>
                </>}
            {schema == 'esgw' ?
                <>
                    {EsgwFormat(data)}
                </>
                :
                <>
                </>}
        </>
    )
}
export const ApplyFormat = (data) => {
    let { type } = data;
    let components = undefined;
    if (type == 0) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.s_t_price + data?.p_t_price), '#fc427b')}
                <div>=</div>
                {ReturnNumberFormat(false, (data?.s_t_price + data?.p_t_price))}
            </div>
        </>);
    } else if (type == 1) {

    } else if (type == 2) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.s_t_price), '#fc427b')}
                <div>=</div>
                {ReturnNumberFormat(false, (data?.r_t_price))}
                <div>(300%)</div>
            </div>
        </>);
    } else if (type == 3) {

    } else if (type == 4) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.s_t_price), '#fc427b')}
                <div>=</div>
                {data?.s_t_price < 0 ? ReturnNumberFormat(false, (data?.s_t_explain_obj?.star)) : ReturnNumberFormat(false, (data?.s_t_price))}
                <div>
                    {data?.s_t_price < 0 ?
                        <>
                            ({parseFloat(data?.s_t_explain_obj?.withdraw_commission_percent) + 100}%)
                        </>
                        :
                        <>
                            (반환)
                        </>
                    }
                </div>
            </div>
        </>);
    } else if (type == 5) {
        
    } else if (type == 6) {

    } else if (type == 7) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.r_t_price * (-1)))}
                <div>=</div>
                {ReturnNumberFormat(false, (data?.r_t_price * (-1)))}
                <div>(100%)</div>
            </div>
        </>);
    } else if (type == 8) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.r_t_price+data?.e_t_price+data?.s_t_price+data?.p_t_price), '#fc427b')}
                <div>=</div>
                {ReturnNumberFormat(false, (data?.r_t_price+data?.e_t_price+data?.s_t_price+data?.p_t_price))}
                <div>(100%)</div>
            </div>
        </>);
    } else if (type == 9) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.p_t_price), '#fc427b')}
                <div>=</div>
                {ReturnNumberFormat(false, (data?.e_t_price))}
                <div>(20%)</div>
            </div>
        </>);
    } else if (type == 10) {

    } else if (type == 11) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.r_t_price), '#fc427b')}
                <div>=</div>
                {ReturnNumberFormat(false, (100 / data?.r_t_explain_obj?.percent * data?.r_t_price))}
                <div>({data?.r_t_explain_obj?.percent}%)</div>
            </div>
        </>);
    } else if (type == 12) {

    } else if (type == 13) {

    } else if (type == 14) {

    } else if (type == 15) {

    }
    return (
        <>
            {components}
        </>
    )
}
export const StarFormat = (data) => {
    let { type } = data;
    let components = undefined;
    if (type == 0) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.s_t_sum - data?.s_t_price))}
                {ReturnNumberFormat(true, (data?.s_t_price))}
                <div>({(data?.s_t_price / (data?.s_t_price + data?.p_t_price) * 100).toFixed(0)}%)</div>
                <div>=</div>
                {ReturnNumberFormat(false, (data?.s_t_sum))}
            </div>
        </>);
    } else if (type == 1) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.s_t_sum - data?.s_t_price))}
                {ReturnNumberFormat(true, (data?.s_t_price))}
                <div>({(data?.s_t_price / (data?.s_t_price + data?.p_t_price) * 100).toFixed(0)}%)</div>
                <div>=</div>
                {ReturnNumberFormat(false, (data?.s_t_sum))}
            </div>
        </>);
    } else if (type == 2) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.s_t_sum - data?.s_t_price))}
                {ReturnNumberFormat(true, (data?.s_t_price))}
                <div>({(data?.s_t_price / (data?.s_t_price + data?.p_t_price) * 100).toFixed(0)}%)</div>
                <div>=</div>
                {ReturnNumberFormat(false, (data?.s_t_sum))}
            </div>
        </>);
    } else if (type == 3) {
        components = (<>
            {data?.s_t_price == 0 ?
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.s_t_sum))}
                    </div>
                </>
                :
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.s_t_sum - data?.s_t_price))}
                        {ReturnNumberFormat(true, (data?.s_t_price))}
                        <div>=</div>
                        {ReturnNumberFormat(false, (data?.s_t_sum))}
                    </div>
                </>}

        </>);
    } else if (type == 4) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.s_t_sum - data?.s_t_price))}
                {ReturnNumberFormat(true, (data?.s_t_price))}
                <div>
                    {data?.s_t_price < 0 ?
                        <>
                            ({parseFloat(data?.s_t_explain_obj?.withdraw_commission_percent) + 100}%)
                        </>
                        :
                        <>
                            (반환)
                        </>
                    }
                </div>
                <div>=</div>
                {ReturnNumberFormat(false, (data?.s_t_sum))}
            </div>
        </>);
    } else if (type == 5) {
        components = (<>
            {data?.s_t_price == 0 ?
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.s_t_sum))}
                    </div>
                </>
                :
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.s_t_sum - data?.s_t_price))}
                        {ReturnNumberFormat(true, (data?.s_t_price))}
                        <div>=</div>
                        {ReturnNumberFormat(false, (data?.s_t_sum))}
                    </div>
                </>}

        </>);
    } else if (type == 6) {
components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.s_t_sum))}
            </div>
        </>);
    } else if (type == 7) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.s_t_sum - data?.s_t_price))}
                {ReturnNumberFormat(true, (data?.s_t_price))}
                <div>({(data?.s_t_price / (data?.s_t_price + data?.p_t_price) * 100).toFixed(0)}%)</div>
                <div>=</div>
                {ReturnNumberFormat(false, (data?.s_t_sum))}
            </div>
        </>);
    } else if (type == 8) {
        components = (<>
            {data?.s_t_price == 0 ?
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.s_t_sum))}
                    </div>
                </>
                :
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.s_t_sum - data?.s_t_price))}
                        {ReturnNumberFormat(true, (data?.s_t_price))}
                        <div>=</div>
                        {ReturnNumberFormat(false, (data?.s_t_sum))}
                    </div>
                </>}

        </>);
    } else if (type == 9) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.s_t_sum))}
            </div>
        </>);
    } else if (type == 10) {
        components = (<>
            {data?.s_t_price == 0 ?
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.s_t_sum))}
                    </div>
                </>
                :
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.s_t_sum - data?.s_t_price))}
                        {ReturnNumberFormat(true, (data?.s_t_price))}
                        <div>=</div>
                        {ReturnNumberFormat(false, (data?.s_t_sum))}
                    </div>
                </>}

        </>);
    } else if (type == 11) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.s_t_sum))}
            </div>
        </>);
    } else if (type == 12) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.s_t_sum))}
            </div>
        </>);
    } else if (type == 13) {

    } else if (type == 14) {
        components = (<>
        <div style={{ display: 'flex' }}>
        {ReturnNumberFormat(false, (data?.s_t_sum - data?.s_t_price))}
        {ReturnNumberFormat(true, (data?.s_t_price))}
        <div>=</div>
        {ReturnNumberFormat(false, (data?.s_t_sum))}
        </div>
    </>);
    } else if (type == 15) {
        components = (<>
            <div style={{ display: 'flex' }}>
            {ReturnNumberFormat(false, (data?.s_t_sum - data?.s_t_price))}
            {ReturnNumberFormat(true, (data?.s_t_price))}
            <div>=</div>
            {ReturnNumberFormat(false, (data?.s_t_sum))}
            </div>
        </>);
    }
    return (
        <>
            {components}
        </>
    )
}
export const PointFormat = (data) => {
    let { type } = data;
    let components = undefined;
    if (type == 0) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.p_t_sum - data?.p_t_price))}
                {ReturnNumberFormat(true, (data?.p_t_price))}
                <div>({(data?.p_t_price / (data?.s_t_price + data?.p_t_price) * 100).toFixed(0)}%)</div>
                <div>=</div>
                {ReturnNumberFormat(false, (data?.p_t_sum))}
            </div>
        </>);
    } else if (type == 1) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.p_t_sum - data?.p_t_price))}
                {ReturnNumberFormat(true, (data?.p_t_price))}
                <div>({(data?.p_t_price / (data?.s_t_price + data?.p_t_price) * 100).toFixed(0)}%)</div>
                <div>=</div>
                {ReturnNumberFormat(false, (data?.p_t_sum))}
            </div>
        </>);
    } else if (type == 2) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.p_t_sum))}
            </div>
        </>);
    } else if (type == 3) {
        components = (<>
            {data?.p_t_price == 0 ?
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.p_t_sum))}
                    </div>
                </>
                :
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.p_t_sum - data?.p_t_price))}
                        {ReturnNumberFormat(true, (data?.p_t_price))}
                        <div>=</div>
                        {ReturnNumberFormat(false, (data?.p_t_sum))}
                    </div>
                </>}

        </>);
    } else if (type == 4) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.p_t_sum))}
            </div>
        </>);
    } else if (type == 5) {
        components = (<>
            {data?.p_t_price == 0 ?
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.p_t_sum))}
                    </div>
                </>
                :
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.p_t_sum - data?.p_t_price))}
                        {ReturnNumberFormat(true, (data?.p_t_price))}
                        <div>=</div>
                        {ReturnNumberFormat(false, (data?.p_t_sum))}
                    </div>
                </>}

        </>);
    } else if (type == 6) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.p_t_sum))}
            </div>
        </>);
    } else if (type == 7) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.p_t_sum - data?.p_t_price))}
                {ReturnNumberFormat(true, (data?.p_t_price))}
                <div>({(data?.p_t_price / (data?.s_t_price + data?.p_t_price) * 100).toFixed(0)}%)</div>
                <div>=</div>
                {ReturnNumberFormat(false, (data?.p_t_sum))}
            </div>
        </>);
    } else if (type == 8) {
        components = (<>
            {data?.p_t_price == 0 ?
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.p_t_sum))}
                    </div>
                </>
                :
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.p_t_sum - data?.p_t_price))}
                        {ReturnNumberFormat(true, (data?.p_t_price))}
                        <div>=</div>
                        {ReturnNumberFormat(false, (data?.p_t_sum))}
                    </div>
                </>}

        </>);
    } else if (type == 9) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.p_t_sum - data?.p_t_price))}
                {ReturnNumberFormat(true, (data?.p_t_price))}
                <div>({(data?.p_t_price / (data?.s_t_price + data?.p_t_price) * 100).toFixed(0)}%)</div>
                <div>=</div>
                {ReturnNumberFormat(false, (data?.p_t_sum))}
            </div>
        </>);
    } else if (type == 10) {
        components = (<>
            {data?.p_t_price == 0 ?
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.p_t_sum))}
                    </div>
                </>
                :
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.p_t_sum - data?.p_t_price))}
                        {ReturnNumberFormat(true, (data?.p_t_price))}
                        <div>=</div>
                        {ReturnNumberFormat(false, (data?.p_t_sum))}
                    </div>
                </>}

        </>);
    } else if (type == 11) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.p_t_sum))}
            </div>
        </>);
    } else if (type == 12) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.p_t_sum))}
            </div>
        </>);
    } else if (type == 13) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.p_t_sum))}
            </div>
        </>);
    } else if (type == 14) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.p_t_sum))}
            </div>
        </>);
    } else if (type == 15) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.p_t_sum))}
            </div>
        </>);
    }
    return (
        <>
            {components}
        </>
    )
}
export const RandomboxFormat = (data) => {
    let { type } = data;
    let components = undefined;
    if (type == 0) {
        components = (<>
            {data?.r_t_price == 0 ?
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.r_t_sum))}
                    </div>
                </>
                :
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.r_t_sum - data?.r_t_price))}
                        {ReturnNumberFormat(true, (data?.r_t_price))}
                        <div>=</div>
                        {ReturnNumberFormat(false, (data?.r_t_sum))}
                    </div>
                </>}

        </>);
    } else if (type == 1) {
        components = (<>
            {data?.r_t_price == 0 ?
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.r_t_sum))}
                    </div>
                </>
                :
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.r_t_sum - data?.r_t_price))}
                        {ReturnNumberFormat(true, (data?.r_t_price))}
                        <div>=</div>
                        {ReturnNumberFormat(false, (data?.r_t_sum))}
                    </div>
                </>}

        </>);
    } else if (type == 2) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.r_t_sum - data?.r_t_price))}
                {ReturnNumberFormat(true, (data?.r_t_price))}
                <div>(300%)</div>
                <div>=</div>
                {ReturnNumberFormat(false, (data?.r_t_sum))}
            </div>
        </>);
    } else if (type == 3) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.r_t_sum))}
            </div>
        </>);
    } else if (type == 4) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.r_t_sum))}
            </div>
        </>);
    } else if (type == 5) {
        components = (<>
            {data?.r_t_price == 0 ?
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.r_t_sum))}
                    </div>
                </>
                :
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.r_t_sum - data?.r_t_price))}
                        {ReturnNumberFormat(true, (data?.r_t_price))}
                        <div>=</div>
                        {ReturnNumberFormat(false, (data?.r_t_sum))}
                    </div>
                </>}

        </>);
    } else if (type == 6) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.r_t_sum - data?.r_t_price))}
                {ReturnNumberFormat(true, (data?.r_t_price))}
                <div>(100%)</div>
                <div>=</div>
                {ReturnNumberFormat(false, (data?.r_t_sum))}
            </div>
        </>);
    } else if (type == 7) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.r_t_sum - data?.r_t_price))}
                {ReturnNumberFormat(true, (data?.r_t_price))}
                <div>=</div>
                {ReturnNumberFormat(false, (data?.r_t_sum))}
            </div>
        </>);
    } else if (type == 8) {
        components = (<>
            {data?.r_t_price == 0 ?
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.r_t_sum))}
                    </div>
                </>
                :
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.r_t_sum - data?.r_t_price))}
                        {ReturnNumberFormat(true, (data?.r_t_price))}
                        <div>=</div>
                        {ReturnNumberFormat(false, (data?.r_t_sum))}
                    </div>
                </>}

        </>);
    } else if (type == 9) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.r_t_sum))}
            </div>
        </>);
    } else if (type == 10) {
        components = (<>
            {data?.r_t_price == 0 ?
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.r_t_sum))}
                    </div>
                </>
                :
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.r_t_sum - data?.r_t_price))}
                        {ReturnNumberFormat(true, (data?.r_t_price))}
                        <div>=</div>
                        {ReturnNumberFormat(false, (data?.r_t_sum))}
                    </div>
                </>}

        </>);
    } else if (type == 11) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.r_t_sum - data?.r_t_price))}
                {ReturnNumberFormat(true, (data?.r_t_price))}
                <div>(100%)</div>
                <div>=</div>
                {ReturnNumberFormat(false, (data?.r_t_sum))}
            </div>
        </>);
    } else if (type == 12) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.r_t_sum - data?.r_t_price))}
                {ReturnNumberFormat(true, (data?.r_t_price))}
                <div>=</div>
                {ReturnNumberFormat(false, (data?.r_t_sum))}
            </div>
        </>);
    } else if (type == 13) {

    } else if (type == 14) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.r_t_sum))}
            </div>
        </>);
    } else if (type == 15) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.r_t_sum))}
            </div>
        </>);
    }
    return (
        <>
            {components}
        </>
    )
}
export const EsgwFormat = (data) => {
    let { type } = data;
    let components = undefined;
    if (type == 0) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.e_t_sum))}
            </div>
        </>);
    } else if (type == 1) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.e_t_sum))}
            </div>
        </>);
    } else if (type == 2) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.e_t_sum))}
            </div>
        </>);
    } else if (type == 3) {
        components = (<>
            {data?.e_t_price == 0 ?
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.e_t_sum))}
                    </div>
                </>
                :
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.e_t_sum - data?.e_t_price))}
                        {ReturnNumberFormat(true, (data?.e_t_price))}
                        <div>=</div>
                        {ReturnNumberFormat(false, (data?.e_t_sum))}
                    </div>
                </>}

        </>);
    } else if (type == 4) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.e_t_sum))}
            </div>
        </>);
    } else if (type == 5) {
        components = (<>
            {data?.e_t_price == 0 ?
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.e_t_sum))}
                    </div>
                </>
                :
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.e_t_sum - data?.e_t_price))}
                        {ReturnNumberFormat(true, (data?.e_t_price))}
                        <div>=</div>
                        {ReturnNumberFormat(false, (data?.e_t_sum))}
                    </div>
                </>}

        </>);
    } else if (type == 6) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.e_t_sum))}
            </div>
        </>);
    } else if (type == 7) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.e_t_sum))}
            </div>
        </>);
    } else if (type == 8) {
        components = (<>
            {data?.e_t_price == 0 ?
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.e_t_sum))}
                    </div>
                </>
                :
                <>
                    <div style={{ display: 'flex' }}>
                        {ReturnNumberFormat(false, (data?.e_t_sum - data?.e_t_price))}
                        {ReturnNumberFormat(true, (data?.e_t_price))}
                        <div>=</div>
                        {ReturnNumberFormat(false, (data?.e_t_sum))}
                    </div>
                </>}

        </>);
    } else if (type == 9) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.e_t_sum - data?.e_t_price))}
                {ReturnNumberFormat(true, (data?.e_t_price))}
                <div>=</div>
                {ReturnNumberFormat(false, (data?.e_t_sum))}
            </div>
        </>);
    } else if (type == 10) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.e_t_sum))}
            </div>
        </>);
    } else if (type == 11) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.e_t_sum))}
            </div>
        </>);
    } else if (type == 12) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.e_t_sum))}
            </div>
        </>);
    } else if (type == 13) {

    } else if (type == 14) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.e_t_sum))}
            </div>
        </>);
    } else if (type == 15) {
        components = (<>
            <div style={{ display: 'flex' }}>
                {ReturnNumberFormat(false, (data?.e_t_sum))}
            </div>
        </>);
    }
    return (
        <>
            {components}
        </>
    )
}