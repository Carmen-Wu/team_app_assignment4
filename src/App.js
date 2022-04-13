// src/App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '07/23/96',
      },
      debits: [],
    }
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  addDebit = (e) => {}


  async componentDidMount(){
    fetch('https://moj-api.herokuapp.com/debits') //fetch the api 
      .then((response) => response.json()) //if theres a response from api
      .then(debitList => { //api = debitList
        this.setState({ debits: debitList});//set debitList to currentstate
        this.state.debits.map(debit => 
        this.setState({accountBalance : (this.state.accountBalance  - parseFloat(debit.amount)).toFixed(2)}) //map debit to accountBalance by (-) debitAmount
      )
    })
}
  // Create Routes and React elements to be rendered using React components
  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)  // Pass props to "LogIn" component
    const DebitsComponent = () => (<Debits debits = {this.state.debits} //make debits class and sets debits array to this
                                           addDebit = {this.addDebit} //set the addDebit function to this
                                           accountBalance = {this.state.accountBalance} />); ///set the accountBalance to this
    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;