import { Component } from 'react';

class BtnClose extends Component {
    constructor(props) {
      super();
    }
    render() {
      const {close} = this.props
      return (
          <button onClick={close} className='btnClose' type='button'>HandsUp</button>
      )
    
    }  
  }
  
  export default BtnClose;