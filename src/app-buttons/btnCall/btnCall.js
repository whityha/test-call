import { Component } from 'react';

class BtnCall extends Component {
    constructor(props) {
      super();
    }
    render() {
      const {call, startCall} = this.props
      return (
          <button onClick={() => {call(); startCall()}} className='btnCall' type='button'></button>
      )
    
    }  
  }
  
  export default BtnCall;