import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API gérer le café",
            version: "1.0.0",
            description: "API REST permettant de gérer une machine à café",
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
                    propreties: {
                        Id_Coffee: {
                            type: "integer",
                            description: "L'identifiant unique du cafe",
                        },
                        Nom_Coffee: {
                            type: "string",
                            description: "Le nom du café"
                        },
                        Prix_Coffee: {
                            type: "float",
                            description: "Le prix du café",
                        },
                        Image_Coffee: {
                            type: "string",
                            description: "L'url de l'image du café"
                        },
                        created: {
                            type: "string",
                            format: "date-time",
                            description: "La date et l'heure de l'ajout du café",
                        }
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            }
        ],
    },
    apis: ["./src/routes/*.mjs"],
};

export const swaggerSpec = swaggerJSDoc(options);