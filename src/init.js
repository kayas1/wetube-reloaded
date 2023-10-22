import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT || 4000;

const handleListening = (req, res) =>console.log(`server is listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);
