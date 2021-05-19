import React, {useState} from 'react';
import Slots from './Slots'
import '../styles/Home.css'

const Home = () => {
    const [form, setForm] = useState({
        addCash: "",
        bet: ""
    })
    const [balance, setBalance] = useState(0)

    const onChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }



    const transferSubmit = e => {
        e.preventDefault();

        setBalance(balance + parseInt(form.addCash));
    }
    
    return (
        <article>
            <article className="transer-and-balance-container">
                <div className="transfer-content-container">
                    <form onSubmit={transferSubmit} className="transfer-form">
                    <label htmlFor="addCash">Transfer to Balance</label>
                    <input type="number" name="addCash" id="addCash" value={form.addCash} onChange={onChange} />
                    <button>Transfer</button>
                    </form>
                </div>
                <div className="balance-content-container">
                    <div className="balance">Balance: {balance}</div>
                </div>
            </article>

        <Slots balance={balance} setBalance={setBalance} form={form} onChange={onChange}/>
        </article>
    )
}

export default Home;