import { Component } from 'react';

class BtnClose extends Component {
    constructor(props) {
      super();
    }
    render() {
      const {onSumTime, close, endCall, averageTime} = this.props
      return (
          <button onClick={() => {close(); endCall(); averageTime(); onSumTime();}} className='btnClose' type='button'></button>
      )
    
    }  
  }
  
  export default BtnClose;