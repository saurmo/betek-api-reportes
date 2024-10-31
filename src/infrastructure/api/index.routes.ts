

import express, { Request, Response } from 'express'

const router = express.Router()

const apiVersion = '/api/v1'

router.get(`${apiVersion}/reportes/productos`, (req: Request, res: Response) => {
    res.send({
        ok: true,
        message: 'PENDIENTE HACER EL REPORTE'
    })
})

export { router }


