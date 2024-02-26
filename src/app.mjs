import express from "express";

import { cafesRouter } from "./routes/cafes.mjs";

const app = express();

app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
    res.send("API REST pour gérer son café");
});

app.get("/api/", (req, res) => {
    res.redirect(`http://localhost:${port}/`);
});

app.use("/api/cafes", cafesRouter);
    
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
    