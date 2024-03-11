export const CafeModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "Acheter", {
            FK_Jeton: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            FK_Utilisateur: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            createdAt: "created",
            updatedAt: false,
        }
    );
};