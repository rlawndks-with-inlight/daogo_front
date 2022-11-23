import React, { useReducer } from "react";
import box from "../../../assets/images/randombox/box.png";
import boxLid from "../../../assets/images/randombox/box-lid.png";
import kuku from "../../../assets/images/randombox/jump-character.png";
// import ConfettiGenerator from "./CanvasConfetti";
import Confetti from "./confetti/Confetti.js";
import { useNavigate } from "react-router-dom";
import pointImg from '../../../assets/images/icon/home/point.svg';
import { useState } from "react";
import { logoSrc } from "../../../data/ContentData";
const init_state = {
    move: "move",
    jump: "",
    rotated: "",
    rotating: ""
};
const GiftBoxAnimation = () => {
    const navigate = useNavigate();
    const [clickDouble, setClickDouble] = useState(false)
    const [state, setState] = useReducer(
        (state, new_state) => ({
            ...state,
            ...new_state
        }),
        init_state
    );

    const { move, rotating, rotated, jump } = state;

    const animate = async () =>{
        let isDone = rotated === "rotated" ? true : false;
        let click = false;
        if (!isDone) {
            setState({ rotating: "rotating" });
            setTimeout(() => {
                setState({ jump: "jump" });
            }, 300);
            setTimeout(() => {
                setState({ rotated: "rotated" });
            }, 1000);
            await new Promise((r) => setTimeout(r, 3000));
            if(!clickDouble){
                if (window.confirm('당첨되었습니다. 홈으로 이동하시겠습니까?2')) {
                    navigate('/home');
                    return;
                }
            }
        } else {
            if (window.confirm('당첨되었습니다. 홈으로 이동하시겠습니까?1')) {
                setClickDouble(true);
                navigate('/home');
                return;
            }
        }
        let moving = move === "move" ? "" : "move";
        setState({ move: moving });
    }

    return (
        <div className="App">
            <Confetti open={jump === "jump"} />
            <div className="img-container">
                <img className={`kuku ${jump}`} src={pointImg} alt="kuku" style={{width:'72px'}} />
                <button className="box" onClick={animate}>
                <img src={box} alt="box" />
                </button>
                <img
                    className={`lid ${move} ${rotating} ${rotated}`}
                    src={boxLid}
                    alt="box-lid"
                />
                <img src={logoSrc} style={{width:'84px'}} onClick={()=>navigate('/home')} />
            </div>
            
        </div>
    );
}
export default GiftBoxAnimation;