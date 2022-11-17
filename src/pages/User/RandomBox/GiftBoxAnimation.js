import React, { useReducer } from "react";
import box from "../../../assets/images/randombox/box.png";
import boxLid from "../../../assets/images/randombox/box-lid.png";
import kuku from "../../../assets/images/randombox/jump-character.png";
// import ConfettiGenerator from "./CanvasConfetti";
import Confetti from "./confetti/Confetti.js";
import { useNavigate } from "react-router-dom";

const init_state = {
    move: "move",
    jump: "",
    rotated: "",
    rotating: ""
};
const GiftBoxAnimation = () => {
    const navigate = useNavigate();
    const [state, setState] = useReducer(
        (state, new_state) => ({
            ...state,
            ...new_state
        }),
        init_state
    );

    const { move, rotating, rotated, jump } = state;

    async function animate() {
        let isDone = rotated === "rotated" ? true : false;

        if (!isDone) {
            setState({ rotating: "rotating" });
            setTimeout(() => {
                setState({ jump: "jump" });
            }, 300);
            setTimeout(() => {
                setState({ rotated: "rotated" });
            }, 1000);
        } else {
            if (window.confirm('당첨되었습니다. 홈으로 이동하시겠습니까?')) {
                navigate('/home');
            }
        }
        let moving = move === "move" ? "" : "move";
        setState({ move: moving });
        if (!isDone) {
            await new Promise((r) => setTimeout(r, 3000));
            if (window.confirm('당첨되었습니다. 홈으로 이동하시겠습니까?')) {
                navigate('/home');
            }
        }

    }

    return (
        <div className="App">
            <Confetti open={jump === "jump"} />
            <div className="img-container">
                <img className={`kuku ${jump}`} src={kuku} alt="kuku" />
                <button className="box" onClick={() => animate()}>
                    <img src={box} alt="box" />
                </button>
                <img
                    className={`lid ${move} ${rotating} ${rotated}`}
                    src={boxLid}
                    alt="box-lid"
                />
            </div>
        </div>
    );
}
export default GiftBoxAnimation;