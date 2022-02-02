import { Component } from 'react';

class BtnCall extends Component {
    constructor(props) {
      super();
    }
    render() {
      const {call} = this.props
      return (
          <button onClick={call} className='btnCall' type='button'>Call</button>
      )
    
    }  
  }
  
  export default BtnCall;