import React from 'react';
import styles from '../styles/SendButton.module.css';


const audioType = 'audio/webm';

const send = {
	height: '100%',
	width: '30px',
	margin: '0 15px',
	cursor: 'pointer',
	opacity: '0.85',
	transitionDuration: '0.15s',
	width: '50px',
	zIndex: 1,
	background: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nLrdWTWhP1h2cPfOyG-PLg9zT4scHHlkdkBCFJpfXbFps7Ji&s) no-repeat center center',
	backgroundSize: '90%',
}

const cancel = {
	height: '100%',
	width: '30px',
	margin: '0 15px',
	cursor: 'pointer',
	opacity: '0.85',
	transitionDuration: '0.15s',
	width: '50px',
	zIndex: 1,
	background: 'red',
}

const mic = {
	height: '100%',
	width: '30px',
	margin: '0 15px',
	cursor: 'pointer',
	opacity: '0.85',
	transitionDuration: '0.15s',
	width: '50px',
	zIndex: 1,
  background: 'url(http://s1.iconbird.com/ico/2013/9/450/w256h2561380453883Audio2256x25632.png) noRepeat center center',
  backgroundSize: '50%',
}

export class SendButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      audios: [],
    };
  }

  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    this.audio = document.createElement('audio');
    // show it to user
    this.audio.srcObject = stream;
    // this.audio.play();
    // init recording
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: audioType,
    });
    // init data storage for audio chunks
    this.chunks = [];
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = event => {
      if (event.data && event.data.size > 0) {
        this.chunks.push(event.data);
      }
    };
  }

  startRecording(event) {
    event.preventDefault();
    // wipe old data chunks
    this.chunks = [];
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);
    // say that we're recording
    this.setState({recording: true});
  }

  stopRecording(event) {
    event.preventDefault();
    // stop the recorder
    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({recording: false});
    // save the audio to memory
    this.saveAudio();
  }

  saveAudio() {
    const { audios } = this.state;
      debugger;
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, {type: audioType});
    // generate audio url from blob
    const audioURL = window.URL.createObjectURL(blob);
    // append audioURL to list of saved audios for rendering
    const new_audio = this.state.audios.concat([audioURL]);
    audios.push(new_audio);
    this.setState({audios: audios});
    console.log(this.state.audios);
  }

//   deleteaudio(audioURL) {
//     // filter out current audioURL from the list of saved audios
//     const audios = this.state.audios.filter(v => v !== audioURL);
//     this.setState({audios});
//   }

  render() {
    const { recording } = this.state;

    return (
        <div>
          {!recording && <button className={styles.mic} onClick={event => this.startRecording(event)} />}
          {recording && <button className={styles.cancel} onClick={event => this.stopRecording(event)} />}
        </div>
    );
  }
}