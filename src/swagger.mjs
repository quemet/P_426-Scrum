import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API self-service-machine",
      version: "1.0.0",
      description:
        "API REST permettant de gérer l'application self-service-machine",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Cafe: {
          type: "object",
          required: ["Nom_Coffee", "Prix_Coffee", "Image_Coffee", "created"],
          properties: {
            Id_Coffee: {
              type: "integer",
              description: "L'identifiant unique du café.",
            },
            Nom_Coffee: {
              type: "string",
              description: "Le nom du café.",
            },
            Prix_Coffee: {
                type: "number",
                description: "Le prix du café",
            },
            Image_Coffee: {
                type: "string",
                description: "Le url de l'image du café"
            },
            created: {
              type: "string",
              format: "date-time",
              description: "La date et l'heure de l'ajout d'un produit.",
            },
          },
        },
        // Ajoutez d'autres schémas ici si nécessaire
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.mjs"], // Chemins vers vos fichiers de route
};
const swaggerSpec = swaggerJSDoc(options);
export { swaggerSpec };