// src/components/Credits.js
import React from 'react';
import {Link} from 'react-router-dom';

const Credits = (props) => {
	let creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
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
      <h1>Credits</h1>
      <h2>Balance: {props.accountBalance}</h2> 
      {creditsView()}
      <form onSubmit={props.addCredit}>
        <input type="text" name="description" />
        <input type="number" name="amount" />
        <button type="submit">Add Credit</button>
      </form>
    </div>
  )
}

export default Credits;