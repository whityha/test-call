import { Component } from 'react';

class BtnClose extends Component {
    constructor(props) {
      super();  
    this.enableBtns = this.enableBtns.bind(this)    
    }
    enableBtns() {
      document.querySelector('.btnCall').disabled = false;
      document.querySelector('.btnClose').disabled = true;      
      document.querySelector('.rounds-s').classList.remove('flex-block');    

    }
    render() {
      const {onSumTime, close, endCall, averageTime} = this.props
      return (
          <button onClick={() => {close(); endCall(); averageTime(); onSumTime(); this.enableBtns()}} className='btnClose' type='button'></button>
      )
    
    }  
  }
  
  export default BtnClose;