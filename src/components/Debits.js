// src/components/Debits.js
import React from 'react';
import {Link} from 'react-router-dom';

const Debits = (props) => {
	let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    }) 
  }
  return (
    <div>
      <nav className='navBar'> 
          <ul>
            <li><Link to="/userProfile">User Profile</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/debits">Debits</Link></li>
            <li><Link to="/credits">Credits</Link></li>
          </ul>
        </nav>
      <h1>Debits</h1>
      <h2>Balance: {props.accountBalance}</h2> 
      {debitsView()}
      <form onSubmit={props.addDebit}>
        <input type="text" name="description" />
        <input type="number" name="amount" />
        <button type="submit">Add Debit</button>
      </form>
    </div>
  )
}

export default Debits;