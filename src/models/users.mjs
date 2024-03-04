export const UserModel = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        Id_Utilisateur: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Pseudo_Utilisateur: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { 
                msg: "Ce username est déjà pris." 
            },
        },
        MotDePasse_Utilisateur: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Nom_Utilisateur: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Prenom_Utilisateur: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        EstAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
};