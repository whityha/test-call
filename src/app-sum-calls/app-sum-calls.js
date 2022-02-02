import { Component } from 'react';
class SumCallsTime extends Component {
    constructor(props) {
      super();  
    }
    
    render() {
      const {sumTime} = this.props
        return (
            <div className='sum'>
              <p>Сумма всего времени разговора: {sumTime} секунд</p>
            </div>
        )
    };    
    
};
  
  export default SumCallsTime;