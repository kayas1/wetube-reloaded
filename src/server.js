import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const app = express();
const PORT = 4000;
const logger = morgan("dev");
app.use(logger);




app.use("/", globalRouter);
app.use("/users",userRouter);
app.use("/videos", videoRouter);


const handleListening = (req, res) =>console.log(`server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);