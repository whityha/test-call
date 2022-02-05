import { Component } from 'react';

class BtnCall extends Component {
    constructor(props) {
      super();
      this.enableBtns = this.enableBtns.bind(this)
    }
    enableBtns() {
      document.querySelector('.btnCall').disabled = true;
      document.querySelector('.btnClose').disabled = false;    
      document.querySelector('.rounds-s').classList.add('flex-block');    
    }

    render() {
      const {call, startCall} = this.props
      return (
          <button onClick={() => {call(); startCall(); this.enableBtns()}} className='btnCall' type='button'></button>
      )
    
    }  
  }
  
  export default BtnCall;