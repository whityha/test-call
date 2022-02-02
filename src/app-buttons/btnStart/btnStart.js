import { Component } from 'react';

class BtnStart extends Component {
    constructor(props) {
      super();
    }
    render() {
      const {start} = this.props;
      return (
          <button onClick={start} className='btnStart' type='button'>START</button>
      )
    
    }  
  }
  
  export default BtnStart;