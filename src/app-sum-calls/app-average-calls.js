import { Component } from 'react';
class AverageCallsTime extends Component {
    constructor(props) {
      super();  
    }
    
    render() {
      const {averageTime} = this.props
        return (
            <div className='average'>
                <p>Среднее время всех звонков: {averageTime} секунд</p>
            </div>
        )
    };    
    
};
  
  export default AverageCallsTime;