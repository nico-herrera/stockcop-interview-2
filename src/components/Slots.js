import React, {useEffect, useState} from 'react';
import '../styles/Slots.css'

const Slots = ({balance, setBalance, form, onChange}) => {
    const [firstSlot, setFirstSlot] = useState();
    const [secondSlot, setSecondSlot] = useState();
    const [thirdSlot, setThirdSlot] = useState();
    const [bgNum, setBgNum] = useState("");
    const [luckyNumber, setLuckyNumber] = useState(0);
    const [rolling, setRolling] = useState(false)
    const [results, setResults] = useState("")
    const [betTotal, setBetTotal] = useState(0);
    const [payout, setPayout] = useState(0)

    useEffect(() => {
        setInterval(() => {
            let calcBgNum = Math.floor(Math.random() * 1000000).toString();

            setBgNum(calcBgNum)

            for (let i = 0; i < bgNum.length; i++) {
                if (bgNum[i] == 2) {
                    setLuckyNumber(luckyNumber + 1)
                } else {
                    // console.log("no 2 here")
                }
                
            }
        }, 5000)
    }, [])

    const rollSlots = () => {
        setBetTotal(0)
        setRolling(true)
        setResults("")
        let firstResult = Math.floor(Math.random() * 9 + 1)
        let secondResult = Math.floor(Math.random() * 9 + 1)
        let thirdResult = Math.floor(Math.random() * 9 + 1)

        setFirstSlot(firstResult);

        setTimeout(() => {
            setSecondSlot(secondResult);
        }, 600)

        setTimeout(() => {
            setThirdSlot(thirdResult);
            setRolling(false)
        }, 1000)

        // if (luckyNumber >= 2) {
        //     if (firstSlot + secondSlot + thirdSlot % 7 === 0) {
        //         setTimeout(() => {
        //             setResults("You win!!")
        //             setBalance(balance + payout)
        //         }, 1100)

        //     }
        if (firstSlot + secondSlot + thirdSlot > 5) {
                  setTimeout(() => {
                    setResults("You win!!")
                    setBalance(balance + payout)
                }, 1100)
        } else {
            setTimeout(() => {   
                setResults("You lose...")
            }, 1100)
        }
    }

    const betMoney = (amount) => {

        if (balance >= 0.01) {
            if (amount < 0.10) {
                alert("You must bet 0.10 or more")
            } else if (amount >= 0.10 && amount <= 1) {
                setPayout(payout + form.bet * 10);
            } else if (amount >= 1.01 && amount <= 2) {
                setPayout(payout + form.bet * 9);
            } else if (amount >= 2.01 && amount <= 3) {
                setPayout(payout + form.bet * 8);
            } else if (amount >= 3.01 && amount <= 4) {
                setPayout(payout + form.bet * 7);
            } else if (amount >= 4.01 && amount <= 5) {
                setPayout(payout + form.bet * 6);
            } else if (amount >= 5.01 && amount <= 6) {
                setPayout(payout + form.bet * 5);
            } else if (amount >= 6.01 && amount <= 7) {
                setPayout(payout + form.bet * 4);
            } else if (amount >= 7.01 && amount <= 8) {
                setPayout(payout + form.bet * 3);
            } else if (amount >= 8.01 && amount <= 9) {
                setPayout(payout + form.bet * 2.5);
            } else if (amount >= 9.01) {
                setPayout(payout + form.bet * 2);
            }
            setBalance(balance - parseInt(form.bet))
            setBetTotal(betTotal + parseInt(form.bet))
        } else {
            alert("You must have more than 0.01 to bet")
        }



        return payout;
    }

    const betSubmit = e => {
        e.preventDefault();
    }

    return ( 
        <article>
        <div className="slot-content-container">
            <div className="slot-machine">
                <div className="slot">{firstSlot}</div>
                <div className="slot">{secondSlot}</div>
                <div className="slot">{thirdSlot}</div>
            </div>
            <div>{rolling && <p>Rolling...</p>}</div>
            <div style={{fontWeight: "bolder"}}>Results: {results}</div>
            <div>Bet Amount: {betTotal}</div>
        </div>
        {rolling ? null : <button onClick={rollSlots}>Roll</button>}
        <div>
        <form onSubmit={betSubmit}>
            <label htmlFor="bet">Bet</label>
            <input type="number" name="bet" id="bet" value={form.bet} onChange={onChange} />
            <button onClick={() => betMoney(form.bet)}>Bet</button>
        </form>
        </div>
        </article>
    )
}

export default Slots;