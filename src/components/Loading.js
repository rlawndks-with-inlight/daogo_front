import { Circles } from 'react-loader-spinner';
import styled from 'styled-components';
import theme from '../styles/theme';
import loadingGif from '../assets/images/test/loading.gif'

const LoadingContainer = styled.div`
margin: 15vw auto;
@media (max-width: 900px) {
    margin: 25vw auto;
}
@media (max-width: 650px) {
    margin: 40vh auto;
}
@media (max-width: 375px) {
    margin: 30vh auto;
}
`
const Loading = (props) => {
    const { text } = props;
    return (
        <>
            <LoadingContainer>
                <img src={loadingGif} style={{width:'100px'}}/>
                <div style={{ marginTop: '16px' }}>{text}</div>
            </LoadingContainer>
        </>
    )
}
export default Loading;