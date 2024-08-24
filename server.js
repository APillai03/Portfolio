import express from "express";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Middleware to log requests
function logger(req, res, next) {
    console.log("Request Method: ", req.method);
    console.log("Request URL: ", req.url);
    next();
}

app.use(logger);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan("combined"));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Endpoint to download the resume
app.get("/download", (req, res) => {
    const filePath = path.join(__dirname, 'public', 'Resume.pdf');
    res.download(filePath, (err) => {
        if (err) {
            console.error("Error downloading file:", err);
            res.status(500).send("Error downloading file.");
        }
    });
});

// Serve the index.ejs file on the root path
app.get("/", (req, res) => {
    res.render("index"); 
});

app.get("/contact", (req, res) => {
    res.render("contact"); 
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
