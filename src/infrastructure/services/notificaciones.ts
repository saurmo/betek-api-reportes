
import amqp from "amqplib";
import { EmailOptions } from "../../domain/EmailOptions";

export class NotificationService {

    async conectarMq() {
        try {
            const url: string = "amqp://localhost";
            const conexion = await amqp.connect(url);
            console.log("Conectado a MQ");

            const channel = await conexion.createChannel();
            console.log("Creación del canal - Habilitado para crear colas.");

            const nombraCola = "notificaciones";
            channel.assertQueue(nombraCola, { durable: true });

            const nombraColas = "pedidos";
            channel.assertQueue(nombraColas, { durable: true });
            return channel;
        } catch (error) {
            console.log(error);
        }
    };

    async sendReportByEmail(payload: EmailOptions) {
        const channel = await this.conectarMq();
        if (channel) {
            channel.sendToQueue("notificaciones", Buffer.from(JSON.stringify(payload)));
            console.log('Mensaje enviado');
        }
    }

}



