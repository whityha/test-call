import { Component } from 'react';
import CallItem from './app-call-item/app-call-item.js';

class CallList extends Component {
    constructor(props) {
      super();  
    }
    
    render() {
        let {onSumTime, averageTime, list, onDelete} = this.props 
        list = list.map((item, i) => {
            return (
                <CallItem onSumTime = {onSumTime} averageTime = {averageTime} onDelete={() => onDelete(item.id)} duration={item.duration} end={item.endTime} key={i} i={i} id={item.id} start={item.startTime}/>
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