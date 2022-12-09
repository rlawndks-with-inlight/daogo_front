import styled from "styled-components";
import theme from "../styles/theme";
import LoadingText from "./LoadingText";

const Input = styled.input`
margin:12px auto 6px 24px;
width:200px;
padding:8px;
border:1px solid #dadde6;
border-radius:4px;
outline:none;
::placeholder {
    color: #cccccc;
}
@media screen and (max-width:500px) { 
    width:40vw;
    margin-right:25px !important;
}
`
const InputCategory = styled.div`
width:50px;
position:absolute;
right:-54px;
font-size:${props=>props.theme.size.font4};
@media screen and (max-width:500px) { 
    right:-27px;
    font-size:${props=>props.theme.size.font5};
}
`
const InputTitle = styled.div`
font-size: ${props=>props.theme.size.font4};
font-weight: bold;
@media screen and (max-width:500px) { 
    font-size:${props=>props.theme.size.font5};
}
`
const InputContent = (props) => {
    let { top_contents, top_contents_margin, bottom_contents, input_type, input_category, input_disabled, placeholder, title, class_name, bottom_contents_margin ,onChange  } = props;
    return (
        <>
            {top_contents ?
                <>
                    <div style={{ margin: `${top_contents_margin ?? '0 auto'}`, fontSize: theme.size.font6, color: theme.color.background1, width: '95%', maxWidth: '350px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
                            {top_contents.map((item, idx) => (
                                <>
                                    {item}
                                </>
                            ))}
                        </div>
                    </div>
                </>
                :
                <>
                </>
            }
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%', maxWidth: '350px', margin: `${top_contents ? '4px' : 'auto'} auto ${bottom_contents ? '4px' : 'auto'} auto` }}>
                <InputTitle>{title??<LoadingText width={12} />}</InputTitle>
                <div style={{display:'flex',alignItems:'center',position:'relative'}}>
                <Input style={{ margin: '0' }} placeholder={placeholder} type={input_type ?? "text"} className={class_name} disabled={input_disabled} onChange={onChange} autoComplete="new-password" />
                {input_category?
                <>
                <InputCategory>{input_category}</InputCategory>
                </>
                :
                <>
                </>}
                </div>
            </div>
            {bottom_contents ?
                <>
                    <div style={{ margin: `${bottom_contents_margin??"0 auto"}`, fontSize: theme.size.font6, color: theme.color.background1, width: '95%', maxWidth: '350px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
                            {bottom_contents.map((item, idx) => (
                                <>
                                    {item}
                                </>
                            ))}
                        </div>
                    </div>
                </>
                :
                <>
                </>
            }

        </>
    )
}
export default InputContent;