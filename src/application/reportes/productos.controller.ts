import { Filters } from "../../domain";
import { ReportesRepository } from "../../infrastructure/repositories/reportes.repository";


export class ReporteProductosController {

    private repository: ReportesRepository;

    constructor() {
        this.repository = new ReportesRepository()
    }

    async generarReporte(filterParams: { limit?: string, search?: string, offset?: string }) {
        let filters: Filters = {
            limit: 10,
            offset: 0,
            search: filterParams.search?.toString()
        }
        if (filterParams.limit) { // filterParams.limit != null && filterParams.limit!=undefined
            filters.limit = parseInt(filterParams.limit.toString())
        }
        if (filterParams.offset) {
            filters.offset = parseInt(filterParams.offset.toString())
        }
        const totalProductos = await this.repository.totalProductos(filters)
        const total = totalProductos[0].total
        const paginas = Math.round(total / filters.limit)
        const resultado = await this.repository.obtenerReporteProductos(filters)
        return { pagination: { total, paginas, items_por_pagina: filters.limit, offset: filters.offset }, resultado }
    }


}