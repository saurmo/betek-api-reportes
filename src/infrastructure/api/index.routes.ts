

import express, { Request, Response } from 'express'
import { ReporteProductosController } from '../../application/reportes/productos.controller'
import { Filters } from '../../domain'
import swaggerUi from 'swagger-ui-express'
import { swaggerOptions } from '../../../docs/swagger'

const router = express.Router()


const controller = new ReporteProductosController()

const apiVersion = '/api/v1'

// Creando el servidor ui (User interface) de la documentación
router.use(`${apiVersion}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerOptions))

router.get(`${apiVersion}/reportes/productos`, async (req: Request, res: Response) => {
    try {
        const params = {
            limit: req.query?.limit?.toString(),
            offset: req.query?.offset?.toString(),
            search: req.query?.search?.toString(),
        }
        const resultado = await controller.generarReporte(params)
        res.send({
            ok: true,
            info: resultado,
            message: "Reporte generado "
        })
    } catch (error: any) {
        res.status(500).send({
            ok: false,
            message: "Ha ocurrido un error ",
            error: error?.toString()
        })
    }
})

router.post(`${apiVersion}/reportes/productos`, async (req: Request, res: Response) => {
    try {
        const resultado = await controller.generarReporte(req.body)
        res.send({
            ok: true,
            info: resultado,
            message: "Reporte generado "
        })
    } catch (error: any) {
        res.status(500).send({
            ok: false,
            message: "Ha ocurrido un error ",
            error: error?.toString()
        })
    }
})

export { router }


