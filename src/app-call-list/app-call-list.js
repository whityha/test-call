import { Component } from 'react';
import CallItem from './app-call-item/app-call-item.js';

class CallList extends Component {
    constructor(props) {
      super();  
    }
    
    render() {
        let {list} = this.props 
        list = list.map(item => {
            return (
                <CallItem key={item.id} text={item.duration}/>
            )
        })
      return (
        <ul>            
            {list}
        </ul>
      )
    };    
    
  }
  
  export default CallList;