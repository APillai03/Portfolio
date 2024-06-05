import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Serve static files from the 'assets' directory
app.use(express.static(__dirname + '/assets'));

// Serve the index.html file on the root path
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Endpoint to download the resume
app.get("/download", (req, res) => {
    res.download(__dirname + "/assets/Resume.pdf");
});

app.listen(port, () => {
    console.log(`${port} Active`);
});
