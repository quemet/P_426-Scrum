import express from "express";

import { cafes } from "../db/mock-cafes.mjs";

import { success } from "./helper.mjs";

const cafesRouter = express();

cafesRouter.get("/", (req, res) => {
    const message = "La liste des cafés a bien été récupérée.";
    res.json(success(message, cafes));
});

cafesRouter.get("/:id", (req, res) => {
    const cafeId = req.params.id;
    const cafe = cafes.find(cafe => cafe.id == cafeId);
    const message = `Le café dont l'id vaut ${cafeId} a bien été récupéré.`;
    res.json(success(message, cafe));
});

cafesRouter.post("/", (req, res) => {
    const id = getUniqueId();
    const createdCafe = { ...req.body, ...{ id: id, created: new Date() } };
    cafes.push(createdCafe);
    const message = `Le café ${createdCafe.name} a bien été créé !`;
    res.json(success(message, createdCafe));
});

export { cafesRouter };