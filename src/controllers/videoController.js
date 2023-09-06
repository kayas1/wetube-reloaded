const videos=[{title:"First video",rating:5,comments:3,createAt:"5mins ago",views:352,id:1},
    {title:"Second video",rating:4,comments:33,createAt:"51mins ago",views:1,id:2},
    {title:"Third video",rating:2,comments:223,createAt:"59mins ago",views:3522,id:3}]

export const trending = (req,res) => {
    res.render("home", {pageTitle: "Home", videos});}
export const watch = (req,res)=> {
    const {id}= req.params;
    const video=videos[id-1];
    return res.render("watch", {pageTitle:`Watching ${video.title}`, video});
}

export const getEdit=(req,res)=>{
    const {id}= req.params;
    const video=videos[id-1];
    res.render("edit", {pageTitle:`Editing: ${video.title}`, video}) ;
}
export const postEdit=(req,res)=>{
    const {id}= req.params;
    const {title}=req.body;
    videos[id-1].title=title;
    return res.redirect(`/videos/${id}`);
}
