

export const productosDoc = {

    get: {
        tags: ['Reportes'],
        parameters: [
            {
                in: 'query',
                name: 'limit',
                schema: {
                    type: 'integer'
                },
                description: 'Limite de datos'
            }
        ],
        description: "Reporte sobre productos",
        responses: {
            default: {
                description: "Respuesta por defecto"
            }
        }
    },
    post: {
        tags: ['Reportes'],
        description: "Reporte sobre productos",
        requestBody: {
            required: true,
            description: "Body del reporte de productos",
            content: {
                "application/json": {
                    schema: {
                        "$ref": "#/components/schemas/Reporte"
                    },
                    example: {
                        limit: 10,
                        search: "lima"
                    }
                }
            }
        }
    }
}

export const productosDocId = {

    get: {
        tags: ['Reportes'],
        parameters: [
            {
                in: 'path',
                name: 'id',
                schema: {
                    type: 'integer'
                },
                description: 'Id de reporte'
            },
            {
                in: 'query',
                name: 'limite',
                schema: {
                    type: 'integer'
                },
                description: 'Limite de datos'
            }
        ],
        description: "Reporte sobre productos",
        responses: {
            default: {
                description: "Respuesta por defecto"
            }
        }
    },

}