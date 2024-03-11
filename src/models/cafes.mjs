export const CafeModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "Cafe", {
            Id_Coffee: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Nom_Coffee: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: "Ce nom est déjà pris"
                },
                validate: {
                    is: {
                        args: /^[A-Za-z\s]*$/,
                        msg: "Seules les lettres et les espaces sont autorisées",
                    },
                    notEmpty: {
                        msg: "Le nom ne peut pas être vide.",
                    },
                    notNull: {
                        msg: "Le nom est une propriété obligatoire.",
                    },
                },
            },
            Prix_Coffee: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    isFloat: {
                        msg: "Utiliser uniquement des nombres pour le prix",
                    },
                    notEmpty: {
                        msg: "Le prix ne peut pas être vide",
                    },
                    notNull: {
                        msg: "Le prix est une propriété obligatoire",
                    },
                }, 
            },
            Image_Coffee: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "L'url de l'image ne peut pas être vide",
                    },
                    notNull: {
                        msg: "L'url de l'image est une propriété obligatoire",
                    },
                },
            },
        },
        {
            timestamps: true,
            createdAt: "created",
            updatedAt: false,
        }
    );
};
