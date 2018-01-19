import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api.js';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      items: '',
      subscription : ['2~Bitfinex~BTC~USD'],
      newSubscription: [],
      sock : api(),
    }
  }

  //subscribe to update messages
  _subscribe = () => {
    this.state.sock.emit('SubAdd', { subs: this.state.subscription });
    this.state.sock.on("m", (message) => {
      
     this.setState({
       items : message
     })
    });
  }

  //unSubscribe from messages
  _unSubscribe = () => {
    this.state.sock.emit('SubRemove', { subs: this.state.subscription });
  }

  //unSubscribe from messages
  _onSubmitForm = () => {
   this._unSubscribe();
   this.setState({
    subscription: this.state.newSubscription,
   });
   this._subscribe();

  }

  //update state with newSubscription
  _onTextChange = (item) => {
    const newSubArray = [];
    newSubArray.push(item.target.value);
    // console.log(newSubArray);
    this.setState({
      newSubscription: newSubArray, 
    });
   }

  componentDidMount(){
    
    //const subscription = ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD'];
    this.state.sock.emit('SubAdd', { subs: this.state.subscription });
    this.state.sock.on("m", (message) => {
      
     this.setState({
       items : message
     })
    });


    // this.setState({
    //   items: res,
    // })
  }
  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          
        </header>
        <div>
          <ol>
            <li>{this.state.items}</li>
          </ol>
          <input type='button' onClick={this._unSubscribe} value='Subscribe' />
          <input type='button' onClick={this._unsubscribe} value='Unsubscribe' />
          
            <form onSubmit={this._onSubmitForm}>
              <input type='text' onChange={this._onTextChange} />
              <input type='button' value='updateSubType' />
            </form>
          
        </div>
      </div>
    );
  }
}

export default App;
