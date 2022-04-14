// src/components/UserProfile.js
// The UserProfile component is used to demonstrate the use of Route and Link.

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UserProfile extends Component {
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
          <h1>User Profile</h1>
          <div>Username: {this.props.userName}</div>
          <div>Member Since: {this.props.memberSince}</div>
          
          <Link to="/">Return to Home</Link>
        </div>
    );
  }
}

export default UserProfile;