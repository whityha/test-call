
import { Component } from 'react';

class AppVideoPc1 extends Component {
  constructor(props) {
    super();    
  }
  render() {    
    return (
        <video id="localVideo" playsInline autoPlay muted></video>       
    )
  };    
  
}

export default AppVideoPc1;