import { Component } from 'react';

class CallItem extends Component {
    constructor(props) {
      super();  
    }
    
    render() { 
        const {text} = this.props;   
      return (
        <li>
            НУ СМОТРИ ЖЕ {text}
        </li>
      )
    };    
    
  }
  
  export default CallItem;