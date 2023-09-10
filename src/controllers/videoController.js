import Video from "../models/Video";

export const home = (req,res) => {
    Video.find().then( (videos)=> {
        console.log("videos",videos);
        res.render("home", {pageTitle: "Home", videos:[]});
      })
      .catch( (error)=> {
        console.log("error",error);
      });
    }
export const watch = (req,res)=> {
    const {id}= req.params;
    return res.render("watch", {pageTitle:`Watching`});
}

export const getEdit=(req,res)=>{
    const {id}= req.params;
    res.render("edit", {pageTitle:`Editing:`}) ;
}
export const postEdit=(req,res)=>{
    const {id}= req.params;
    const {title}=req.body;
    return res.redirect(`/videos/${id}`);
}

export const getUpload=(req,res)=>{
    return res.render("upload", {pageTitle: "Upload Video"});
}

export const postUpload=(req,res)=>{
    const {id} =req.params;
    const {title}=req.body;
    return res.redirect("/");
}