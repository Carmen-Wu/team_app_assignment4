// src/components/Home.js
// The Home component is used to demonstrate the use of Link.

import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import './Home.css'; 

class Home extends Component {
  render() {
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
        <img src="https://picsum.photos/200/200" alt="bank"/>
        <h1>Bank of React</h1>
        <AccountBalance accountBalance={this.props.accountBalance}/>
      </div>
    );
  }
}

export default Home;