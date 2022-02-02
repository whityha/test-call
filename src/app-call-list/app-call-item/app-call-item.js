import { Component } from 'react';

class CallItem extends Component {
    constructor(props) {
      super();  
    }
    
    render() { 
        const {averageTime, onSumTime, duration, start, end, onDelete, i} = this.props;   
       
      return (
        <li>
            <span> {i+1}. Начало трансляции {start.toString()}</span> <span>Конец в {end.toString()}.</span> <span>Продолжительность {duration} секунд.</span> <button onClick={() => {onDelete(); averageTime(); onSumTime();}}>УДАЛИТЬ</button>
        </li>
      )
    };    
    
  }
  
  export default CallItem;