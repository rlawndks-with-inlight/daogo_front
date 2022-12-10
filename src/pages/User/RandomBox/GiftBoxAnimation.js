import React, { useEffect, useReducer } from "react";
import box from "../../../assets/images/randombox/box.png";
import boxLid from "../../../assets/images/randombox/box-lid.png";
import kuku from "../../../assets/images/randombox/jump-character.png";
// import ConfettiGenerator from "./CanvasConfetti";
import Confetti from "./confetti/Confetti.js";
import { useLocation, useNavigate } from "react-router-dom";
import pointImg from '../../../assets/images/icon/home/point.svg';
import { useState } from "react";
import { logoSrc } from "../../../data/ContentData";
import axios from "axios";
const init_state = {
    move: "move",
    jump: "",
    rotated: "",
    rotating: ""
};
const GiftBoxAnimation = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [post, setPost] = useState({});
    const [state, setState] = useReducer(
        (state, new_state) => ({
            ...state,
            ...new_state
        }),
        init_state
    );

    const { move, rotating, rotated, jump } = state;

    const animate = async () => {
        let isDone = rotated === "rotated" ? true : false;
        if (!isDone) {
            const { data: response } = await axios.post('/api/lotterydailypoint');
            
            if(response?.result<0){
                alert(response.message);
                navigate('/home')
            }else{
                setState({ rotating: "rotating" });
                setTimeout(() => {
                    setState({ jump: "jump" });
                }, 300);
                setTimeout(() => {
                    setState({ rotated: "rotated" });
                }, 1000);
                await new Promise((r) => setTimeout(r, 3000));
                if (pathname === '/randombox/lottery') {
                    if (window.confirm(response?.data?.percent + '% 당첨되었습니다. 홈으로 이동하시겠습니까?')) {
                        navigate('/home');
                        return;
                    }
                }
            }
            
        } else {

        }
        let moving = move === "move" ? "" : "move";
        setState({ move: moving });
    }
    return (
        <div className="App">
            <Confetti open={jump === "jump"} />
            <div className="img-container">
                <img className={`kuku ${jump}`} src={pointImg} alt="kuku" style={{ width: '72px' }} />
                <button className="box" onClick={animate}>
                    <img src={box} alt="box" />
                </button>
                <img
                    className={`lid ${move} ${rotating} ${rotated}`}
                    src={boxLid}
                    alt="box-lid"
                />
                <img src={logoSrc} style={{ width: '84px' }} onClick={() => { navigate('/home') }} />
            </div>

        </div>
    );
}
export default GiftBoxAnimation;