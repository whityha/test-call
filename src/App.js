
import { Component } from 'react';
import './App.css';
import AppVideoPc1 from './app-video-pc1/app-video-pc1.js';
import AppVideoPc2 from './app-video-pc2/app-video-pc2.js';
import BtnStart from './app-buttons/btnStart/btnStart.js';
import BtnClose from './app-buttons/btnClose/btnClose.js';
import BtnCall from './app-buttons/btnCall/btnCall.js';
import CallList from './app-call-list/app-call-list.js';

let localStream;
let pc1;
let pc2;
let startTime;
let arrayWithTimeCalls = [
  {
    startTime: new Date(),
    duration: '10',
    endTime: new Date(+3),
    id: 1
  },
  {
    startTime: new Date(),
    duration: '10',
    endTime: new Date(+3),
    id: 2
  },
  {
    startTime: new Date(),
    duration: '10',
    endTime: new Date(+3),
    id: 3
  }
];
console.log(arrayWithTimeCalls);
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
class App extends Component {
  constructor(props) {
    super();  
  }
  
  render() {    
    return (
      <div className="App">
        <div className="App-container">
          <AppVideoPc1 />
          <AppVideoPc2 />
        </div>
        <div className="buttons">
          <BtnStart start={start}/>
          <BtnCall call={call}/>
          <BtnClose close = {hangup}/>
        </div>
        <div className='callsList'>
          <CallList list = {arrayWithTimeCalls}/>
        </div>
    </div>
    )
  };    
  
}

export default App;
