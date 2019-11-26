export async function getMedia() {
    let stream = null;
    try {
        console.log('TEST1')
        const constrains = { audio: true };
        stream = await navigator.mediaDevices.getUserMedia(constrains);
    } catch(err) {
        console.log("Can't get access");
    }
    console.log(stream);
    return stream;
}

export function startRecord(mediaRecorder, callbackStart = null, callbackEnd = null, callbackExtract = null) {
	if (mediaRecorder) {
        

        if (callbackStart) { callbackStart(); }

        let chunks = [];
        mediaRecorder.addEventListener('stop', (event) => {
            const audio = document.createElement('audio');
            const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
            chunks = [];
            const audioURL = URL.createObjectURL(blob);
            audio.src = audioURL;

                // console.log(audioURL);
                // console.log(blob)
                // console.log(callbackExtract);
                
            if (callbackExtract) { callbackExtract(audio); }
        });

        mediaRecorder.start();

        mediaRecorder.addEventListener('dataavailable', (event) => {
            console.log('TYT SMOTRI')
            chunks.push(event.data);
        });

        
    } else if (callbackEnd) { callbackEnd(); }  
}

export function stopRecord(mediaRecorder, callbackStatus = null) {
	if (mediaRecorder) {
		mediaRecorder.stop();
    }
    
    if (callbackStatus) { callbackStatus(); }
}