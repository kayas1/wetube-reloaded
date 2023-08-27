import express from "express";

const app = express();
const PORT = 4000;


const handleHome = (req, res)=> {
    return res.send("I still love you.");
}
const handleLogin =(req, res)=>{
    return res.send("Login here");
}


app.get("/", handleHome);
app.get("/login", handleLogin);
const handleListening = (req, res) =>console.log(`server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
