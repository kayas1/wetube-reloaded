
const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon =playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon =muteBtn.querySelector("i");
const volumeRange =document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn= document.getElementById("fullScreen");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout=null;
let controlsMovementTimeout=null;
let volumeValue=0.5;
video.volume=volumeValue;

const handlePlayClick =(e)=>{
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
    playBtnIcon.className= video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute=(e)=>{
    if(video.muted){
        video.muted=false;
    }
    else{
        video.muted=true;
    }
    muteBtnIcon.className= video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
    volumeRange.value= video.muted ? 0 : volumeValue;
};

const handleVolumeChange =(e)=>{
    const {target : {value}} = e;
    if(value!=="0"){
        volumeValue=value;
        video.muted=false;
    }
    else{
        video.muted=true;
    }
    video.volume=value;
    if(video.muted){
        video.muted=true;
    }
    else{
        video.muted=false;
    }
    muteBtnIcon.className= video.muted ? "fas fa-volume-up" : "fas fa-volume-mute";
};

const formatTime=(seconds)=>{
    if(seconds>=3600){
        return new Date(seconds*1000).toISOString().substring(11,11+8);
    }
    else{
        return new Date(seconds*1000).toISOString().substring(14,11+8);
    }
};

const handleLoadedMetadata =()=>{
    totalTime.innerText=formatTime(Math.floor(video.duration));
    timeline.max=Math.floor(video.duration);
};

const handleTimeUpdate =(e)=>{
    currentTime.innerText=formatTime(Math.floor(video.currentTime));
    timeline.value=Math.floor(video.currentTime);
};

const handleTimelineChange =(event)=>{
    const {target:{value}}=event;
    video.currentTime=value;
};

const handleFullScreen =(e)=>{
    const fullscreen = document.fullscreenElement;
    if(fullscreen){
        document.exitFullscreen();
        fullScreenBtnIcon.className="fas fa-expand";
    }else{
        videoContainer.requestFullscreen();
        fullScreenBtnIcon.className="fas fa-compress";
    }
};

const hideControls = ()=>videoControls.classList.remove("showing");

const handleMouseMove=(e)=>{
    if(controlsTimeout){
        clearTimeout(controlsTimeout);
        controlsTimeout=null;
    }
    if(controlsMovementTimeout){
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout=null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave=(e)=>{
    controlsTimeout= setTimeout(hideControls, 3000);
};

const handleShowingVideoControls =(e)=>{
    if(controlsTimeout){
        clearTimeout(controlsTimeout);
        controlsTimeout=null;
    }
    if(controlsMovementTimeout){
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout=null;
    }
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click",handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("click", handlePlayClick);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
videoControls.addEventListener("mouseenter",handleShowingVideoControls);
document.addEventListener("keyup",(event)=>{
    if(event.key===" "){
        handlePlayClick();
        event.preventDefault();
    }
})