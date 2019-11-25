export async function getMedia() {
    let stream = null;
    try {
        const constrains = { audio: true };
        stream = await navigator.mediaDevices.getUserMedia(constrains);
    } catch(err) {
        console.log("Can't get access");
    }
    return stream;
}

export async function startRecord(mediaRecorder, callbackExtract) {
	if (mediaRecorder) {
		mediaRecorder.start();

		let chunks = [];
		mediaRecorder.addEventListener('stop', (event) => {
            // const audio = document.createElement('audio');
            const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
            chunks = [];
            const audioURL = URL.createObjectURL(blob);
            // audio.src = audioURL;

            console.log(audioURL);
            console.log(blob)
            console.log(callbackExtract);
            
            if (callbackExtract) { callbackExtract(audioURL, blob); }
		});

		mediaRecorder.addEventListener('dataavailable', (event) => {
			chunks.push(event.data);
        });
    }
    
}

export function stopRecord(mediaRecorder) {
	if (mediaRecorder) {
		mediaRecorder.stop();
	}
}