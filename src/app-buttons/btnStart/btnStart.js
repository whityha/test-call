import { Component } from 'react';

class BtnStart extends Component {
    constructor(props) {
      super();
      this.enableBtns = this.enableBtns.bind(this)
    }
    enableBtns() {
      document.querySelector('.btnCall').disabled = false;
      document.querySelector('.btnClose').disabled = true; 
      document.querySelector('.btnStart').disabled = true; 
    }
    render() {
      const {start} = this.props;
      return (
          <button onClick={() => {
              start(); 
              this.enableBtns()
              }
        } className='btnStart' type='button'>START</button>
      )
    
    }  
  }
  
  export default BtnStart;