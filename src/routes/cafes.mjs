import express from "express";

import { success } from "./helper.mjs";

import { Cafe } from "../db/sequelize.mjs";

import { ValidationError, Op } from "sequelize";

import { auth } from "../auth/auth.mjs";

const cafesRouter = express();

/**
 * @swagger
 * /api/cafes/:
 *  get:
 *    tags: [Cafes]
 *    security :
 *      - bearerAuth: []
 *    summary: Retrieve all cafes.
 *    description: Retrieve all cafes. Can be used to populate a select HTML tag.
 *    responses:
 *      200:
 *        description: All cafes
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  propreties:
 *                    Id_Coffee:
 *                      type: integer
 *                      description: The cafe ID.
 *                      example: 1
 *                    Nom_Coffee:
 *                      type: string
 *                      description: The cafe's name.
 *                      example: Espresso
 *                    Prix_Coffee:
 *                      type: number
 *                      description: The cafe's price.
 *                      example: 5.99
 *                    Image_Coffee:
 *                      type: string
 *                      description: The cafe's image url.
 *                      example: http://localhost:3000
 */
cafesRouter.get("/", auth, (req, res) => {
    if(req.query.name) {
        if(req.query.limit < 2) {
            const message = `Le terme de la recherche doit contenir au moins 2 caractères`;
            return res.status(400).json({ message });
        }
        let limit = 3;
        if(req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        return Cafe.findAll({ where: { name: { [Op.like]: `%${req.query.name}%` } }, order: ["Nom_Coffee"], limit: limit,
        }).then((cafes) => {
            const message = `Il y a ${cafes.lenngth} cafés qui correspondent au terme de la recherche`;
            res.json(success(message, products));
        });
    }
    Cafe.findAll({  order: ["Nom_Coffee"] }).then((cafes) => {
        const message = "La liste des cafés a bien été récupérée.";
        res.json(success(message, cafes));
    }).catch((error) => {
        const message = "La liste des cafés n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
    });
});

/**
 * @swagger
 * /api/cafes/1:
 *  get:
 *    tags: [Cafes]
 *    security :
 *      - bearerAuth: []
 *    summary: Retrieve one cafe via a id pass in the browser.
 *    description: Retrieve one cafe via a id pass in the browser. Can be used to populate a select HTML tag.
 *    responses:
 *      200:
 *        description: One Cafe
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  propreties:
 *                    Id_Coffee:
 *                      type: integer
 *                      description: The cafe ID.
 *                      example: 1
 *                    Nom_Coffee:
 *                      type: string
 *                      description: The cafe's name.
 *                      example: Espresso
 *                    Prix_Coffee:
 *                      type: number
 *                      description: The cafe's price.
 *                      example: 5.99
 *                    Image_Coffee:
 *                      type: string
 *                      description: The cafe's image url.
 *                      example: http://localhost:3000
 */
cafesRouter.get("/:id", auth, (req, res) => {
    Cafe.findByPk(req.params.id).then((cafe) => {
        if(cafe == null) {
            const message = "Le café demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
            return res.status(404).json({ message });
        }
        const message = `Le café dont l'id vaut ${cafe.Id_Coffee} a bien été récupéré.`;
        res.json(success(message, cafe));
    }).catch((error) => {
        const message = "Le café n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
    });
});

cafesRouter.post("/", auth, (req, res) => {
    Cafe.create(req.body).then((createdCafe) => {
        const message = `Le café ${createdCafe.Nom_Coffee} a bien été créé !`;
        res.json(success(message, createdCafe));
    }).catch((error) => {
        if(error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error });
        }
        const message = "Le café n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
    });
});

cafesRouter.delete("/:id", auth, (req, res) => {
    Cafe.findByPk(req.params.id).then((deletedCafe) => {
        if(deletedCafe === null) {
            const message = "Le café demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
            return res.status(404).json({ message });
        }
        return Cafe.destroy({ where: { Id_Coffee: deletedCafe.Id_Coffee }, }).then((_) => {
            const message = `Le café ${deletedCafe.Nom_Coffee} a bien été supprimé !`;
            res.json(success(message, deletedCafe));
        });
    }).catch((error) => {
        const message = "Le café n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
    });
});

cafesRouter.put("/:id", auth, (req, res) => {
    const cafeId = req.params.id;
    Cafe.update(req.body, { where: { Id_Coffee: cafeId } }).then((_) => {
        return Cafe.findByPk(cafeId).then((updatedCafe) => {
            if(updatedCafe === null) {
                const message = "Le café demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
                return res.status(404).json({ message });
            }
            const message = `Le cafe ${updatedCafe.Nom_Coffee} dont l'id vaut ${cafeId} a été mis à jour avec succès !`;
            res.json(success(message, updatedCafe));
        });
    }).catch((error) => {
        const message = "Le café n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
    });
});

export { cafesRouter };