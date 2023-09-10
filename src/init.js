import "./db";
import "./models/Video";
import app from "./server";

const PORT = 4001;

const handleListening = (req, res) =>console.log(`server listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);
