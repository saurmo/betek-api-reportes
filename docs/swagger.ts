import { productosDoc, productosDocId } from "./productos.doc";

export const swaggerOptions = {
    openapi: "3.0.3",
    info: {
        title: "Api Reportes de tienda virtual",
        description: "Microservicio de reportes de la tienda virtual",
        version: "1.0.0",
        contact: {
            name: "Saurmo - Betek",
            email: "back@betek.la",
            url: "betek.la"
        }
    },
    servers: [
        {
            url: "http://localhost:3001",
            description: "Servidor local"
        },
        {
            url: "http://betek.la:3001",
            description: "Servidor producción"
        }
    ],
    paths: {
        "/api/v1/reportes/productos": productosDoc,
        "/api/v1/reportes/productos/{id}": productosDocId
    },
    components: {
        schemas: {
            Reporte: {
                type: "object",
                properties: {
                    limit: {
                        type: "number",
                        description: "Limite de datos"
                    },
                    search: {
                        type: "string",
                        description: "Busqueda de un producto por nombre"
                    }
                }
            }
        }
    }
}