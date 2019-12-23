import React from 'react';
import styles from '../../styles/SendButton.module.css';


const audioType = 'audio/webm';

export class SendButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      audios: [],
    };
  }

  async startRecording(event) {
    event.preventDefault();

    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: audioType,
    });

    this.chunks = [];
    this.mediaRecorder.ondataavailable = event => {
      if (event.data && event.data.size > 0) {
        this.chunks.push(event.data);
      }
    };
    this.mediaRecorder.start(10);
    this.setState({recording: true});
  }

  stopRecording(event) {
    event.preventDefault();

    this.mediaRecorder.stop();
    this.setState({recording: false});
    this.saveAudio();
  }

  saveAudio() {
    const { audios } = this.state;

    const blob = new Blob(this.chunks, {type: audioType});
    const audioURL = window.URL.createObjectURL(blob);
 
    audios.push([audioURL]);
    this.props.handlerAudio(audios[audios.length - 1], blob);

    this.setState({audios: audios});
  }

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