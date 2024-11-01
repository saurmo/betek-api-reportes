

import express, { Request, Response } from 'express'
import { ReporteProductosController } from '../../application/reportes/productos.controller'
import { Filters } from '../../domain'

const router = express.Router()

const apiVersion = '/api/v1'

const controller = new ReporteProductosController()

router.get(`${apiVersion}/reportes/productos`, async (req: Request, res: Response) => {
    try {
        const queryParams = req.query
        let filter: Filters = {
            limit: 10,
            offset: 0,
            search: queryParams.search?.toString()
        }
        if (queryParams.limit) {
            filter.limit = parseInt(queryParams.limit.toString())
        }
        if (queryParams.offset) {
            filter.offset = parseInt(queryParams.offset.toString())
        }
        const resultado = await controller.generarReporte(filter)
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


