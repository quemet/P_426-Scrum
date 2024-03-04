import { Sequelize, DataTypes } from "sequelize";

import bcrypt from "bcrypt";

import { cafes } from "./mock-cafes.mjs";

import { users } from "./mock-users.mjs";

import { CafeModel } from "../models/cafes.mjs";

import { UserModel } from "../models/users.mjs";

export const sequelize = new Sequelize("db_cafes", "root", "root", {
    host: "localhost",
    port: "6033",
    dialect: "mysql",
    logging: false,
});

export const Cafe = CafeModel(sequelize, DataTypes);

export const User = UserModel(sequelize, DataTypes);

export let initDb = () => {
    return sequelize.sync({ force: true }).then((_) => {
        importCafes();
        importUsers();
        console.log("La base de données db_cafes a bien été synchronisée");
    });
};

const importCafes = () => {
    cafes.map((cafe) => {
        Cafe.create({
            Nom_Coffee: cafe.name,
            Prix_Coffee: cafe.price,
            Image_Coffee: cafe.image,
        }).then((cafe) => console.log(cafe.toJSON()));
    });
};

const importUsers = () => {
    users.map((user) => {
        bcrypt.hash(user.password, 10).then((hash) => {
            User.create({
                Pseudo_Utilisateur: user.username,
                MotDePasse_Utilisateur: user.password,
                Nom_Utilisateur: user.lastname,
                Prenom_Utilisateur: user.firstname,
                EstAdmin: user.estAdmin,
            }).then((user) => console.log(user.toJSON()));
        });
    });
};