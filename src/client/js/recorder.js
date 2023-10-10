

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = ()=>{
    const a= document.createElement("a");
    a.href=videoFile;
    a.download = "My recording.webm";
    document.body.appendChild(a);
    a.click();
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
    track.stop();
    });
    stream = null;
};

const handleStop=()=>{
    startBtn.innerText="Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);

    recorder.stop();
};

const handleStart=()=>{
    startBtn.innerText="Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);

    recorder = new window.MediaRecorder(stream,{mimeType:"video/webm"});
    recorder.ondataavailable=(event)=>{
        videoFile=URL.createObjectURL(event.data);
        video.srcObject = null;
        video.src = videoFile;
        video.play();
    };
    recorder.start();
    setTimeout(() => {
        recorder.stop();
    }, 10000);
};

const init=async(e)=>{
    stream =await navigator.mediaDevices.getUserMedia({audio:false, video:{width:200, height:100}});
    video.srcObject = stream;
    video.play();
};

init();

startBtn.addEventListener("click", handleStart);
