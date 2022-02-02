import { Component } from 'react';
class SumCallsTime extends Component {
    constructor(props) {
      super();  
    }
    
    render() {
      const {sumTime} = this.props
        return (
            <div className='sum'>
              <p>Сумма продолжительностей всех звонков: {sumTime} секунд</p>
            </div>
        )
    };    
    
};
  
  export default SumCallsTime;