
import { Component } from 'react';
import './App.css';
import AppVideoPc1 from './app-video-pc1/app-video-pc1.js';
import AppVideoPc2 from './app-video-pc2/app-video-pc2.js';
import BtnStart from './app-buttons/btnStart/btnStart.js';
import BtnClose from './app-buttons/btnClose/btnClose.js';
import BtnCall from './app-buttons/btnCall/btnCall.js';
import CallList from './app-call-list/app-call-list.js';
import AverageCallsTime from './app-sum-calls/app-average-calls.js'
import SumCallsTime from './app-sum-calls/app-sum-calls.js'


//Весь код ниже до компонента App для осуществления вызова
let localStream;
let pc1;
let pc2;
let startTime;

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};


let localVideo; 
let remoteVideo ;

async function start() {    
  console.log('Requesting local stream');  
  try {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    console.log('Received local stream');
    localVideo = document.querySelector('#localVideo');
    localVideo.srcObject = stream;
    localStream = stream;
  } catch (e) {
    console.log(e);
    alert(`getUserMedia() error: ${e.name}`);
  } 
}

async function call() {
  
  console.log('Starting call');
  startTime = window.performance.now();
  console.log(startTime)
  const configuration = {};
  console.log('RTCPeerConnection configuration:', configuration);

  pc1 = new RTCPeerConnection(configuration);
  pc1.addEventListener('icecandidate', e => onIceCandidate(pc1, e));

  pc2 = new RTCPeerConnection(configuration);
  pc2.addEventListener('icecandidate', e => onIceCandidate(pc2, e)); 

  pc2.addEventListener('track', gotRemoteStream);

  localStream.getTracks().forEach(track => pc1.addTrack(track, localStream));
  console.log('Added local stream to pc1');  
  console.log('pc1 createOffer start');
  const offer = await pc1.createOffer(offerOptions);
  await onCreateOfferSuccess(offer);
  
}

async function onCreateOfferSuccess(desc) {
  await pc1.setLocalDescription(desc);
  await pc2.setRemoteDescription(desc);  
  const answer = await pc2.createAnswer();
  await onCreateAnswerSuccess(answer); 
}

async function onCreateAnswerSuccess(desc) {    
    await pc2.setLocalDescription(desc);  
    await pc1.setRemoteDescription(desc);
}

function gotRemoteStream(e) {
  remoteVideo = document.querySelector('#remoteVideo')
  if (remoteVideo.srcObject !== e.streams[0]) {
    remoteVideo.srcObject = e.streams[0];
    console.log('pc2 received remote stream');
  }
}

function getOtherPc(pc) {
  return (pc === pc1) ? pc2 : pc1;
}

async function onIceCandidate(pc, event) { 
  await (getOtherPc(pc).addIceCandidate(event.candidate));
}

function hangup() {
  pc1.close();
  pc2.close();
  pc1 = null;
  pc2 = null;  
  remoteVideo.srcObject = null
}

setTimeout(() => {
  document.querySelector('.btnCall').disabled = true;
  document.querySelector('.btnClose').disabled = true;      
}, 50);
  


let newObj = {}; // Объект для содержания в себе начала трансляции, конца трансляции и продолжительности.
export default class App extends Component { //основной компонент приложения
  constructor(props) {
    super();  
    this.deleteItem = this.deleteItem.bind(this)
    this.addEndCallTime = this.addEndCallTime.bind(this)
    this.addStartCallTime = this.addStartCallTime.bind(this)
    this.toCountAverageTime = this.toCountAverageTime.bind(this)
    this.toCountSumTime = this.toCountSumTime.bind(this)
    this.state = {
      arrayWithTimeCalls : [],
      averageTime: 0,
      sumTime: 0
    }
  }
  
  addStartCallTime() {    //метод для добавления в объект информации о начале трансляции
    const startTime = new Date();
    newObj.startTime = startTime;
  }

  addEndCallTime() { //метод для добавления в объект инфы об окончании трансляции и ее продолжительности, а так же для добавления/переназначения id каждому объекту.
                    // а так же этот метод заменяет массив с объектами вызовов на новый, с только что законченым звонком, тем самым обновляя его.
    this.setState(({arrayWithTimeCalls}) => {
      newObj.endTime = new Date();
      const duration = newObj.endTime - newObj.startTime;
      newObj.duration = duration/1000;
      let newArr = [...arrayWithTimeCalls];
      newArr.push(newObj);
      newArr = newArr.map((item, i) => {
        item.id = i+1
        return item
    });
      newObj = {};
      return {
        arrayWithTimeCalls: newArr
      }
    })
  }
  
  deleteItem(id) { //метод для удаления строки списка истории вызовов.
    this.setState(({arrayWithTimeCalls}) => {
      const index = arrayWithTimeCalls.findIndex(elem => elem.id === id)

      const before = arrayWithTimeCalls.slice(0, index);
      const after = arrayWithTimeCalls.slice(index+1);

      let newArr = [...before, ...after];
      newArr = newArr.map((item, i) => {
          item.id = i+1
          return item
      });
      return {
        arrayWithTimeCalls: newArr
      }
    })
  }

  toCountAverageTime() {  //метод для подсчета среднего времени продолжительности звонка
    this.setState(({averageTime, arrayWithTimeCalls}) => {
      const arrayWithTimeDuration = arrayWithTimeCalls.map(item => item.duration);
      let sumTime = 0;
      let counter = 0;
      arrayWithTimeDuration.forEach(item => {
        sumTime = sumTime + item;  
        counter++;      
      })
      let average = sumTime/counter;
      average = Math.round(average);
      if(average) {
        return {
          averageTime: average
        }
      } else {
        return {
          averageTime: 0
        }
      }
      
    })
  }

  toCountSumTime() { //метод для подсчета суммы всех вызовов
    this.setState(({arrayWithTimeCalls}) => {
      const arrayWithTimeDuration = arrayWithTimeCalls.map(item => item.duration);
      let sumTime = 0;
      arrayWithTimeDuration.forEach(item => {
        sumTime = sumTime + item;      
      })      
      sumTime = Math.round(sumTime);
      if(sumTime) {
        return {
          sumTime: sumTime
        }
      } else {
        return {
          sumTime: 0
        }
      }      
    })
  }

  render() {    
    
    return (
      <div className="App">
        <div className='sumCalls'>
          <SumCallsTime sumTime = {this.state.sumTime}/> {/* передаем в компонент сумму времени разговора всех вызовов */}
          <AverageCallsTime averageTime = {this.state.averageTime} /> {/* передаем в компонент среднее время разговора всех вызовов */}
        </div>
        <div className="App-container">
          <AppVideoPc1 /> {/* получилось немного бесполезно, но это так, на будущее))) */}
          <div className='animCall'>
            <ul className='rounds-s'>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <AppVideoPc2 /> {/* такая же фигня */}
        </div>
        <div className="buttons">
          <BtnStart start={start}/> {/* запускаем функцию старта трансляции */}
          <BtnCall 
          startCall= {this.addStartCallTime} 
          call={call}
          /> {/* начианем считать время + соединяемся с PC2 */}
          <BtnClose 
          averageTime = {this.toCountAverageTime} 
          endCall={this.addEndCallTime} 
          close = {hangup} 
          onSumTime = {this.toCountSumTime}
          />
          {/* после завершения вызова записываем в список, считаем среднее время, сумму,  */}
        </div>
        <div className='callsList'>
          <CallList 
          list = {this.state.arrayWithTimeCalls} 
          onDelete={this.deleteItem} 
          averageTime={this.toCountAverageTime} 
          onSumTime = {this.toCountSumTime}
          />
          {/* После удаления из списка и из массива - пересчитываем среднюю продолжительнось, общую сумму, */}
        </div>   
    </div>
    
    )
  };    
  
}
