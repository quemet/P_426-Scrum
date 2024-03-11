export const CafeModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "Utiliser", {
            FK_Jeton: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            FK_Cafes: {
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