
import axios from 'axios'
export class NotificationService {

    async sendReportByEmail(payload: {
        to: string,
        subject: string
        body: string
    }) {
        // let url = config.get<string>('REPORT_SERVICE.URL')
        let url = 'http://localhost:3002/api/v1/notificaciones/correo';
        const response = await axios.post(url, payload)
        const data = response.data
        return data
    }

}