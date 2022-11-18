import { useNavigate } from "react-router-dom";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import SignUpCard from "../../../components/SignUpCard";
import { logoSrc } from "../../../data/ContentData";
const SignUp = () => {
    const navigate = useNavigate();

    return (
        <>
            <Wrappers className="wrapper" marginTop={'0px'} marginBottom={'32px'}>
                <img src={logoSrc} style={{ width: '150px', margin: '2rem auto 1rem auto' }} onClick={()=>navigate('/')}/>
                <SignUpCard />
            </Wrappers>
        </>
    )
}
export default SignUp;