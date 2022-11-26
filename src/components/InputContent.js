import theme from "../styles/theme";
import { Input } from "./elements/ManagerTemplete";
import LoadingText from "./LoadingText";
const InputContent = (props) => {
    let { top_contents, top_contents_margin, bottom_contents, input_type, placeholder, title, class_name, bottom_contents_margin } = props;
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
                <div style={{ fontSize: theme.size.font4, fontWeight: 'bold' }}>{title??<LoadingText width={12} />}</div>
                <Input style={{ margin: '0' }} placeholder={placeholder} type={input_type ?? "text"} className={class_name} />
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