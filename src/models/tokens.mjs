export const CafeModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "Jeton", {
            Id_Jeton: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            FK_Utilisateur: {
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