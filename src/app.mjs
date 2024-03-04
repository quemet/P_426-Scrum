import express from "express";

import swaggerUi from "swagger-ui-express";

import { cafesRouter } from "./routes/cafes.mjs";

import { sequelize, initDb } from "./db/sequelize.mjs";

import { loginRouter } from "./routes/login.mjs";

import { swaggerSpec } from "./swagger.mjs";

sequelize
    .authenticate()
    .then((_) => console.log("La connexion à la base de données a bien été établie"))
    .catch((error) => console.error("Impossible de se connecter à la DB"));

initDb();

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

app.use("/api/login", loginRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
    
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});

app.use(({ res }) => {
    const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
    res.status(404).json(message);
});
    