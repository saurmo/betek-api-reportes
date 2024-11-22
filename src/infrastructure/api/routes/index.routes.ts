

import express, { Request, Response } from 'express'
import { ReporteProductosController } from '../../../application/reportes/productos.controller'
import { Filters } from '../../../domain'
import swaggerUi from 'swagger-ui-express'
import { swaggerOptions } from '../../../../docs/swagger'
import { AuthMiddleware } from '../middlewares/authorization'
import { NotificationService } from '../../services/notificaciones'
import { ReportOptions } from '../../../domain/ReportOptions'

const router = express.Router()


const controller = new ReporteProductosController()

const apiVersion = '/api/v1'

// Creando el servidor ui (User interface) de la documentación
router.use(`${apiVersion}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerOptions))


router.use(AuthMiddleware)
// Todas las rutas hacia abajo, necesitan el auth
router.get(`${apiVersion}/reportes/productos`, async (req: Request, res: Response) => {
    try {
        const options: ReportOptions = {
            limit: req.query?.limit?.toString(),
            offset: req.query?.offset?.toString(),
            search: req.query?.search?.toString(),
            enviarCorreo: false
        }
        const resultado = await controller.generarReporte(options)
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
        const options: ReportOptions = {
            limit: req.body.limit?.toString(),
            offset: req.body.offset?.toString(),
            search: req.body.search?.toString(),
            enviarCorreo: true,
            to: req.body.to?.toString(),
        }
        const resultado = await controller.generarReporte(options)

        res.send({
            ok: true,
            info: {
                productos: resultado
            },
            message: "Reporte generado "
        })
    } catch (error: any) {
        console.log(error);

        res.status(500).send({
            ok: false,
            message: "Ha ocurrido un error ",
            error: error?.toString()
        })
    }
})

export { router }


