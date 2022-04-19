// src/App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';

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
      credits: [],
    }
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  addCredit = (e) => {
    e.preventDefault(); // prevent the form from submitting
    const newCredit = (prevState)=> ({ //create newCredit entry 
      credits: [...prevState.credits, //adding previous credit state + new entry to the array that contains id, amount,description, date
        {id:Math.random().toString(16).slice(2), //generate a random string
        amount: e.target.amount.valueAsNumber, //set amount equal to the user amount value
        description: e.target.description.value, //set description equal to the user description value
        date: new Date().toISOString()}], //set date to the current date
        })
    this.setState(newCredit) //set the new entry state
        //create a new variable called newBal which takes the current balance added by the user amount and previous amount
    const newBal = (+this.state.accountBalance + e.target.amount.valueAsNumber).toFixed(2)
    this.setState({accountBalance: newBal}) //set newBal state
  }


  addDebit = (e) => {
    e.preventDefault(); // prevent the form from submitting
    const newDebit = (prevState)=> ({ //create newDebit entry 
      debits: [...prevState.debits, //adding previous debit state + new entry to the array that contains id, amount,description, date
        {id:Math.random().toString(16).slice(2), //generate a random string
        amount: e.target.amount.valueAsNumber, //set amount equal to the user amount value
        description: e.target.description.value, //set description equal to the user description value
        date: new Date().toISOString()}], //set date to the current date
        })
    this.setState(newDebit) //set the new entry state
        //create a new variable called newBal which takes the current balance subtracted by the user amount
    const newBal = (this.state.accountBalance - e.target.amount.valueAsNumber).toFixed(2)
    this.setState({accountBalance: newBal}) //set newBal state
  }

  async componentDidMount(){
    fetch('https://moj-api.herokuapp.com/debits') //fetch the api 
      .then((response) => response.json()) //if theres a response from api
      .then(debitList => { //api = debitList
        this.setState({ debits: debitList});//set debitList to currentstate
        this.state.debits.map(debit => 
        this.setState({accountBalance : (this.state.accountBalance  - parseFloat(debit.amount)).toFixed(2)}) //map debit to accountBalance by (-) debitAmount
      )
    })
    fetch('https://moj-api.herokuapp.com/credits') //fetch the api 
      .then((response) => response.json()) //if theres a response from api
      .then(creditList => { //api = creditList
        this.setState({ credits: creditList});//set creditList to currentstate
        this.state.credits.map(credit => 
        this.setState({accountBalance : (+this.state.accountBalance  + parseFloat(credit.amount)).toFixed(2)}) //map credit to accountBalance by (-)  creditAmount
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
    const CreditsComponent = () => (<Credits credits = {this.state.credits} //make credits class and sets credits array to this
                                            addCredit = {this.addCredit} //set the addCredit function to this
                                            accountBalance = {this.state.accountBalance} />); ///set the accountBalance to this
    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;