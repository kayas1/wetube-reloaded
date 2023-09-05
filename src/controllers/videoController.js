export const trending = (req,res) => {
    const videos=[{title:"First video",rating:5,comments:3,createAt:"5mins ago",views:352,id:1},
    {title:"Second video",rating:4,comments:33,createAt:"51mins ago",views:352,id:2},
    {title:"Third video",rating:2,comments:223,createAt:"59mins ago",views:3522,id:3}]
    res.render("home", {pageTitle: "Home", videos});}
export const see = (req,res)=> res.render("watch", {pageTitle: "Watch"});
export const edit=(req,res)=>res.render("edit", {pageTitle:"Edit"});
export const search=(req,res)=>res.send("Search");
export const upload =(req,res)=>res.send("Upload");
export const deleteVideo=(req,res)=>res.send("Delete Video");
