import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req,res)=> res.render("join", {pageTitle:"Join"});
export const postJoin=async(req,res)=>{
    const {name,username,email,password,password2,location} = req.body;
    if(password!==password2){
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"Password confirmation does not match."});
    }
    const usernameExists = await User.exists({username});
    const pageTitle="Join";
    if(usernameExists){
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"This username is already taken."});
    }
    const emailExists = await User.exists({email});
    if(emailExists){
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"This email is already taken."});
    }
    try{
        await User.create({
        name,username,email,password,location,});
    }
    catch(error){
        return res.status(400).render("join",{pageTitle: "Upload Video", errorMessage: error._message,});
    }
    return res.redirect("login");
};
export const getLogin=(req,res)=> res.render("login", {pageTitle:"Login"});
export const postLogin=async(req,res)=>{
    const {username, password}=req.body;
    const user=await User.findOne({username});
    const pageTitle="Login";
    if(!user){
        return res.status(400).render("login", {pageTitle, errorMessage:"An account with this username does not exists."});
    }
    console.log(user.username);
    console.log(user.password);
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login", {pageTitle, errorMessage:"Wrong password."});
    }
    req.session.loggedIn=true;
    req.session.user= user;
    return res.redirect("/");
};

export const startGithubLogin=(req,res)=>{
    const baseUrl="https://github.com/login/oauth/authorize";
    const config = {
        client_id:process.env.GH_CLIENT,
        allow_signup:false,
        scope:"read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl=`${baseUrl}?${params}`;
    return res.redirect(finalUrl);
}

export const finishGithubLogin = async(req,res)=>{
    const baseUrl="https://github.com/login/oauth/access_token";
    const config={
        client_id:process.env.GH_CLIENT,
        client_secret:process.env.GH_SECERT,
        code:req.query.code,
    };
    const paramas = new URLSearchParams(config).toString;
    const finalUrl= `${baseUrl}?${config}`;
    const data= await fetch(finalUrl,{
        method:"POST",
        headers:{
            Accept: "application/json",
        },
    })
    const json = await data.json();
}

export const edit =(req,res) => res.send("Edit User");
export const remove =(req,res) => res.send("Remove  User");
export const logout=(req,res)=>res.send("Log out");
export const see=(req,res)=>res.send("See User");