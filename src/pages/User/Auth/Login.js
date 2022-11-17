import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import LoginCard from "../../../components/LoginCard";
import { logoSrc } from "../../../data/ContentData";

const Login = () =>{
    return (
        <>
        <Wrappers className="wrapper" marginTop={'0px'} marginBottom={'0px'}>
        <img src={logoSrc} style={{width:'150px',margin:'2rem auto 1rem auto'}} />
            <LoginCard/>
        </Wrappers>
        </>
    )
}
export default Login;