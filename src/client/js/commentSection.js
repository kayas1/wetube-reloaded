
const videoContainer = document.getElementById("videoContainer");
const form= document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll(".video__comment-deleteBtn");

const handleDelete=async(e)=>{
    const {id, videoid} = e.target.dataset;
    console.log(e.target.dataset);
    console.log(id+" "+videoid);
    const response = await fetch(`/api/videos/${videoid}/comments/${id}/delete`,{method:"DELETE",headers:{"Content-Type":"application/json",},body:JSON.stringify({id,videoid})});
    if(response.status===200){
        e.target.parentNode.remove();
    }
    console.log("working?"+response.status);
};

const addComment=(text, id)=>{
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id=id;
    newComment.className="video__comment";
    const icon = document.createElement("i");
    icon.className="fas fa-comment";
    const span = document.createElement("span");
    span.innerText= ` ${text}`
    const span2 = document.createElement("span");
    span2.innerText = "X";
    span2.classList.add("video__comment-deleteBtn");
    span2.addEventListener("click", handleDelete);
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    videoComments.prepend(newComment);
};

const handleSubmit=async(event)=>{
    event.preventDefault();
    const textarea= form.querySelector("textarea");
    const text= textarea.value;
    const videoId= videoContainer.dataset.id;
    if(text===""){
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`,{
        method:"POST",headers:{
            "Content-Type":"application/json"
        },body:JSON.stringify({text}),
    });
    
    if(response.status===201){
        textarea.value="";
        const {newCommentId} = await response.json();
        addComment(text, newCommentId);
    }
};

if(form){
    form.addEventListener("submit",handleSubmit);
}
if(deleteBtn){
    deleteBtn.forEach((btn) => btn.addEventListener("click", handleDelete));
}
