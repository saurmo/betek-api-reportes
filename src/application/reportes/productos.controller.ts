import { readFileSync, unlink } from "fs";
import { Filters } from "../../domain";
import { Products } from "../../domain/Products";
import { ReportOptions } from "../../domain/ReportOptions";
import { ReportesRepository } from "../../infrastructure/repositories/reportes.repository";
import { createPdf } from "../../infrastructure/services/create-pdf";
import { NotificationService } from "../../infrastructure/services/notificaciones";


export class ReporteProductosController {

    private repository: ReportesRepository;

    constructor() {
        this.repository = new ReportesRepository()
    }

    async generarReporte(options: ReportOptions) {

        let filters: Filters = {
            limit: 10,
            offset: 0,
            search: options.search?.toString()
        }
        if (options.limit) { // filterParams.limit != null && filterParams.limit!=undefined
            filters.limit = parseInt(options.limit.toString())
        }
        if (options.offset) {
            filters.offset = parseInt(options.offset.toString())
        }
        const totalProductos = await this.repository.totalProductos(filters)
        const total = totalProductos[0].total
        const paginas = Math.round(total / filters.limit)
        const resultado = await this.repository.obtenerReporteProductos(filters)
        const products = resultado as Products[]
        const pathPdf = await createPdf(products)

        if (options.enviarCorreo && options.to) {
            const mailService = new NotificationService()

            const bufferPdf = readFileSync(pathPdf)
            const html = readFileSync('./templates/reporte-productos.html')

            await mailService.sendReportByEmail({
                to: options.to,
                subject: 'Reporte de productos',
                body: html.toString(),
                pdf: bufferPdf.toString('base64')
            })
            unlink(pathPdf, (err) => {
                if (err) {
                    console.log('Error al eliminar el archivo ');
                    console.log(err);
                } else {
                    console.log('Archivo eliminado');
                }
            })
        }
        return {
            pagination: {
                total, paginas, items_por_pagina: filters.limit, offset: filters.offset
            },
            pdf: pathPdf,
            resultado
        }
    }


}