import { Oval } from 'react-loader-spinner';
import theme from '../styles/theme';

const LoadingText = (props) => {
    let obj = props;
    return (
        <>
            <Oval 
                color={obj?.color??theme.color.background1}
                height={obj?.width??28}
                width={obj?.width??28}
                />
        </>
    )
}
export default LoadingText;