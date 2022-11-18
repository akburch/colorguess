import { useEffect, useLayoutEffect, useState } from "react";
import { Simulate } from "react-dom/test-utils";
import "./App.css";

function App() {
    const [color, setColor] = useState("");
    const [ans, setAns] = useState<string[]>([]);
    const [wrong, setWrong] = useState<boolean | undefined>(undefined);
    const [choice, setChoice] = useState("");
    var points = sessionStorage.getItem('savedPoints') || String(0);

    function getRandomColor() {
        const base = 16;
        const length = 6;
        const max = Math.pow(base, length);
        const decimal = Math.floor(Math.random() * max)
        const hexString = decimal.toString(base).padStart(length, '0')
        return `#${hexString}`;
    }

    function pick() {
        const actual = getRandomColor();
        setColor(actual);
        setAns([actual, getRandomColor(), getRandomColor()].sort(() => 0.5 - Math.random()));
    }

    useEffect(() => {
        pick();
    }, []);

    function ansClicked(ans: string) {
        if (ans === color) {
            var numpoints = parseInt(points);
            setWrong(false);
            sessionStorage.setItem('savedPoints', String(numpoints + 1));
            document.getElementById('pts').innerHTML = points;
            pick();
        } else {
            setWrong(true);
            setChoice(ans);
        }
    }

    return (
        <div className="App">
            <div></div>
                <div className="guess-me" style={{background: color}}></div> 
                {ans.map((ans) => (
                    <button 
                    onClick={() => ansClicked(ans)}
                    key={ans}>{ans}</button>
                ))}
                {wrong && <div className="wrong">Wrong Answer, You chose:</div>}  
                {wrong === false && <div className="right">Correct! Keep going!</div>}
                {wrong && <div className="chosen" style={{background: choice}}></div>}
                <div className="text">
                    <h1>Color Guessing Game</h1>
                    <h2>Points: </h2>
                        <p id="pts"></p>
            </div>
        </div>
    );
}

export default App;