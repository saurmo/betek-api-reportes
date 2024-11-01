import { RowDataPacket } from "mysql2";
import { getPoolConnection } from "./data-source";
import { Filters } from "../../domain";

export class ReportesRepository {
    constructor() {

    }

    async totalProductos(filters: Filters) {
        const connection = getPoolConnection();
        let where= filters.search?` where nombre like '%${filters.search}%' `: ''
        const querySql = `SELECT count(*) total FROM Productos ${where}`;
        const result = await connection.query<RowDataPacket[]>(querySql);
        return result[0];
    }

    async obtenerReporteProductos(filters: Filters) {
        const connection = getPoolConnection();
        let where= filters.search?` where nombre like '%${filters.search}%' `: ''
        const querySql = `SELECT * FROM Productos ${where} LIMIT ${filters.limit} OFFSET ${filters.offset}`;
        const result = await connection.query<RowDataPacket[]>(querySql);
        return result[0];
    }

}